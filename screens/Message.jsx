import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ChatCart from "../Cart/ChatCart";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ChatList from "./message/ChatList";
import ContactList from "./message/ContactList";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
const Tab = createMaterialTopTabNavigator();
import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "./ChatScreen";
import { StatusBar } from "expo-status-bar";
import { SvgXml } from "react-native-svg";
import { setChatSearchRef } from "../Reducers/chatSearchRef";
import { useDispatch, useSelector } from "react-redux";
import ChatImage from "./message/ChatImage";
import ChatHeader from "./message/ChatHeader";
import SellerList from "./message/SellerList";
import Member, { AddOnlineUser } from "./Vendor/Member";
import UserProfile from "./UserProfile";
import { setChatBottomRef } from "../Reducers/chatBottomRef";
import { useIsFocused } from "@react-navigation/native";
import { setHideBottomBar } from "../Reducers/hideBottomBar";
import SupportForm from "./support/SupportForm";
import OtherProfile from "./OtherProfile";
import SignUp_3 from "./signup/SignUp_3";
import SignUp_2 from "./signup/SignUp_2";
import SignUp_1 from "./signup/SignUp_1";
import Reset from "./signup/Reset";
import Recovery from "./signup/Recovery";
import Login from "./Login";
const Stack = createStackNavigator();

const Message = (props) => {
  const dispatch = useDispatch();
  const chatSearchRef = useSelector((state) => state.chatSearchRef);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    if (isFocused) {
      //console.log("hidden")
      dispatch(setHideBottomBar(false));
      setTimeout(() => {
        dispatch(setHideBottomBar(false));
      }, 50);
    } else {
      //console.log("seen")
      //dispatch(setHideBottomBar(true));
    }
  }, [isFocused]);
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="MessageScreen"
          component={ChatList}
        />
        <Stack.Screen
          name="ChatScreen"
          options={{
            headerShown: false,
          }}
          component={ChatScreen}
        />

        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: "green",
            },
            headerShown: false,
          }}
          name="OtherProfile"
          component={OtherProfile}
        />
        <Stack.Screen
          name="Member"
          options={{
            headerShown: false,
          }}
          component={Member}
        />
        <Stack.Screen
          name="AddOnlineUser"
          options={{
            headerShown: false,
          }}
          component={AddOnlineUser}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="UserProfile"
          component={UserProfile}
        />
        <Stack.Screen
          name="SupportForm"
          options={{
            headerShown: false,
          }}
          component={SupportForm}
        />
        
        <Stack.Screen
          options={{ header:(props)=><SubHeader title={"User information"} {...props}/> }}
          name="SignUp_3"
          component={SignUp_3}
        />
      </Stack.Navigator>
    </View>
  );
};

export default Message;
