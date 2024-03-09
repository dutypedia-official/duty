import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  DevSettings,
  Modal,
  Alert,
  TextInput,
} from "react-native";
import * as Linking from "expo-linking";
import {
  NavigationContainer,
  DefaultTheme,
  Link,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
import { secondaryColor } from "./assets/colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-gesture-handler";
import { Provider, useDispatch } from "react-redux";
import store from "./store";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState, useRef } from "react";
import {
  MD3LightTheme as Default,
  Provider as PaperProvider,
} from "react-native-paper";
import { checkUser, updateDeviceToken } from "./Class/auth";
import StackRoute from "./StackRoute";
import { useSelector } from "react-redux";
import { Color } from "./assets/colors";
import { RootSiblingParent } from "react-native-root-siblings";
import * as Network from "expo-network";
//import { getStream } from "./Utils";
import { getSocket, socket } from "./Class/socket";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import * as Updates from "expo-updates";
import { setDeviceToken } from "./Reducers/deviceToken";
import { localData } from "./Class/dataConverter";
import axios from "axios";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//   }),
// });
Notifications.setNotificationHandler(null);
export default function App() {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: secondaryColor,
    },
  };
  useEffect(() => {
    onFetchUpdateAsync();
  }, []);
  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      console.error(`Error fetching latest Expo update: ${error}`);
    }
  }

  const [fontsLoaded] = useFonts({
    "Poppins-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Poppins-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Poppins-Medium": require("./assets/fonts/Roboto-Regular.ttf"),
    "Poppins-Thin": require("./assets/fonts/Roboto-Thin.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Roboto-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  const theme = {
    ...Default,
    roundness: 2,
    version: 3,
    colors: {
      ...Default.colors,
      primary: "#DA1E37",
      secondary: "#f1c40f",
      tertiary: "#e5e5e5",
      background: "#ffffff",
      outline: "#e5e5e5",
    },
    typescale: {
      ...Default.typescale,
      fontFamily: "Poppins-Medium",
    },
  };

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <RootSiblingParent>
            <Views />
            {/* <WebRTC/> */}
          </RootSiblingParent>
        </PaperProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
const Views = () => {
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const textColor = colors.getTextColor();
  const statusBar = useSelector((state) => state.statusBar);
  const [ModalVisible, setModalVisible] = React.useState(false);
  const [expoPushToken, setExpoPushToken] = React.useState("");
  const [notification, setNotification] = React.useState(false);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();
  const user = useSelector((state) => state.user);
  const [isOffline, setIsOffline] = useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    regNotification();
    getNetworkStatus();
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [user]);
  React.useEffect(() => {
    if (!Array.isArray(user) && user?.user?.id) {
      socket.on("connect", () => {
        getSocket(user?.user?.id);
      });
      updateDeviceToken(user.token, expoPushToken)
        .then((res) => {
          console.log("Success");
        })
        .catch((e) => {
          console.log(e.response.data.msg);
        });
    }
  }, [isOffline, user, expoPushToken]);

  const regNotification = async () => {
    const token = await registerForPushNotificationsAsync();
    console.log("ptttttt", token);
    setExpoPushToken(token);
    dispatch(setDeviceToken(token));
    //console.log(token)
    // if (!Array.isArray(user) && user?.token && token) {
    //   await updateDeviceToken(user.token, token);
    // }
  };
  const getNetworkStatus = async () => {
    const res = await Network.getNetworkStateAsync();
    if (!res.isConnected) {
      setIsOffline(true);
      Alert.alert("Ops!", "You are offline");
    } else {
      setIsOffline(false);
    }
  };
  const handleDeepLink = (event) => {
    const data = Linking.parse(event?.url);
    console.log(data);
  };
  useEffect(() => {
    Linking.addEventListener("url", handleDeepLink);
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* <CustomAppStatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={statusBar?.backgroundColor}
      /> */}
      <StackRoute />

      <Modal
        visible={ModalVisible}
        onRequestClose={() => {
          setModalVisible(!ModalVisible);
        }}
      ></Modal>
    </GestureHandlerRootView>
  );
};

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "81b891e3-f2d8-4658-961f-3fa315ee1ba4",
      })
    ).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
