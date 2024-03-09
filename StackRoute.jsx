import { View } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TransitionSpecs } from "@react-navigation/stack";
import TabRoute from "./screens/TabRoute";
const Stack = createStackNavigator();
import { Color } from "./assets/colors";
import SearchScreen from "./screens/SearchScreen";
import SubHeader from "./components/SubHeader";
import React from "react";
import Review from "./screens/Seller/Review";
import AllServiceList from "./screens/Seller/AllServiceList";
import Login from "./screens/Login";
import { useSelector, useDispatch } from "react-redux";
import AllService from "./screens/Vendor/AllService";
import VendorAddress from "./screens/Vendor/VendorAddress";
import Support from "./screens/Support";
import VendorProfile from "./screens/VendorProfile";
import AddPackage, { AddScreen } from "./screens/services/AddPackage";
import AppointmentHeader from "./components/Appointment/AppointmentHeader";
import AppointmentList from "./screens/Seller/Appointment/AppointmentList";
import CreateAppointment from "./screens/Seller/Appointment/CreateAppointment";
import AppointmentDetails from "./screens/Seller/Appointment/AppointmentDetails";
import CreateVendorAppointment from "./screens/Vendor/Appointment/CreateVendorAppointment";
import AppointmentForm from "./screens/Vendor/Appointment/AppointmentForm";
import RequestAppointmentList from "./screens/Vendor/Appointment/RequestAppointmentList";
import VendorAppointmentListDetails from "./screens/Vendor/Appointment/VendorAppointmentListDetails";
import UserRequestAppointment from "./screens/Seller/UserAppointment/UserRequestAppointment";
import UserAppointmentDetails from "./screens/Seller/UserAppointment/UserAppointmentDetails";
import { SubscriptionDates } from "./screens/Seller/SubscriptionDates";
import AccountHeader from "./screens/Vendor/account/AccountHeader";
import WithdrawFirst from "./screens/Vendor/account/WithdrawFirst";
import WithdrawSecond from "./screens/Vendor/account/WithdrawSecond";
import WithdrawFinal from "./screens/Vendor/account/WithdrawFinal";
import ChatImage from "./screens/message/ChatImage";
import SignUp_1 from "./screens/signup/SignUp_1";
import SignUp_2 from "./screens/signup/SignUp_2";
import SignUp_3 from "./screens/signup/SignUp_3";
import Recovery from "./screens/signup/Recovery";
import Reset from "./screens/signup/Reset";
import UserProfile from "./screens/UserProfile";
import WebViews from "./screens/WebViews";
import * as Linking from "expo-linking";
import customStyle from "./assets/stylesheet";
import ActivityLoader from "./components/ActivityLoader";
import useLang from "./Hooks/UseLang";

export default function StackRoute() {
  const user = useSelector((state) => state.user);
  const vendor = useSelector((state) => state.vendor);
  const vendorInfo = useSelector((state) => state.vendorInfo);
  const [load, setLoad] = React.useState(false);
  const [Vendor, setVendor] = React.useState(false);
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const textColor = colors.getTextColor();
  const assentColor = colors.getAssentColor();
  const backgroundColor = colors.getBackgroundColor();
  const secondaryColor = colors.getSecondaryColor();
  const [userId, setUserId] = React.useState();
  const { language } = useLang();
  const isBn = language == "Bn";
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: secondaryColor,
    },
  };
  const pr = Linking.createURL("/duty.com.bd");
  console.log(pr);
  const linking = {
    prefixes: [pr],
    config: {
      screens: {
        Dashboard: {
          initialRouteName: "Home",
          screens: {
            Home: {
              initialRouteName: user && vendor ? "VendorOrder" : "Feed",
              screens: {
                OtherProfile: {
                  path: "feed/service/:slug",
                  parse: {
                    slug: (id) => id,
                  },
                },
              },
            },
          },
        },
      },
    },
  };

  return (
    <NavigationContainer
      linking={linking}
      fallback={
        <View style={customStyle.fullBox}>
          <ActivityLoader />
        </View>
      }
      theme={MyTheme}
    >
      <Stack.Navigator
        screenOptions={({ route, navigation }) => ({
          gestureEnabled: true,
          transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
          },
        })}
      >
        <Stack.Screen
          options={{
            presentation: "modal",
            animationTypeForReplace: "push",
            animation: "slide_from_right",
            headerShown: false,
          }}
          name="Dashboard"
          component={TabRoute}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="ChatImage"
          component={ChatImage}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SearchScreen_1"
          component={SearchScreen}
        />

        {/* 
          <Stack.Screen
            options={{ headerShown: false }}
            name="FixedService"
            component={FixedService}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="PackageService"
            component={PackageService}
          /> */}
        <Stack.Screen
          options={{
            header: (props) => (
              <SubHeader title={isBn ? "লগইন করুন" : "Login"} {...props} />
            ),
          }}
          name="LogIn"
          component={Login}
        />
        <Stack.Screen
          options={{
            header: (props) => (
              <SubHeader
                title={
                  isBn ? "ফোন নম্বর যাচাইকরণ" : "Phone number verification"
                }
                {...props}
              />
            ),
          }}
          name="Recovery"
          component={Recovery}
        />
        <Stack.Screen
          options={{
            header: (props) => (
              <SubHeader
                title={isBn ? "পাসওয়ার্ড রিসেট করুন" : "Password reset"}
                {...props}
              />
            ),
          }}
          name="Reset"
          component={Reset}
        />
        <Stack.Screen
          options={{
            header: (props) => (
              <SubHeader
                title={
                  isBn ? "ফোন নম্বর যাচাইকরণ" : "Phone number verification"
                }
                {...props}
              />
            ),
          }}
          name="SignUp_1"
          component={SignUp_1}
        />
        <Stack.Screen
          options={{
            header: (props) => (
              <SubHeader
                title={
                  isBn ? "ফোন নম্বর যাচাইকরণ" : "Phone number verification"
                }
                {...props}
              />
            ),
          }}
          name="SignUp_2"
          component={SignUp_2}
        />
        <Stack.Screen
          options={{
            header: (props) => (
              <SubHeader
                title={isBn ? "ব্যবহারকারীর তথ্য" : "User information"}
                {...props}
              />
            ),
          }}
          name="SignUp_3"
          component={SignUp_3}
        />
        {/* <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="ChatScreen"
            component={ChatScreen}
          /> */}

        <Stack.Screen
          name="Review"
          options={{
            header: (props) => (
              <SubHeader title={isBn ? "রিভিও" : "Review"} {...props} />
            ),
          }}
          component={Review}
        />
        <Stack.Screen
          name="VendorProfile_1"
          options={{
            headerShown: false,
          }}
          component={VendorProfile}
        />
        <Stack.Screen
          name="Service List"
          options={{
            header: (props) => (
              <SubHeader
                title={isBn ? "সার্ভিস এর লিস্ট" : "Service List"}
                {...props}
              />
            ),
          }}
          component={AllServiceList}
        />
        <Stack.Screen
          name="Service List_1"
          options={{
            header: (props) => (
              <SubHeader
                title={isBn ? "আপনার সার্ভিস এর লিস্ট" : "Your Service List"}
                {...props}
              />
            ),
          }}
          component={AllService}
        />

        <Stack.Screen
          name="Vendor Address"
          options={{
            header: (props) => (
              <SubHeader title={isBn ? "ঠিকানা" : "Address"} {...props} />
            ),
          }}
          component={VendorAddress}
        />
        <Stack.Screen
          name="Support_1"
          options={{
            header: (props) => (
              <SubHeader title={isBn ? "রিপোর্ট" : "Report"} {...props} />
            ),
          }}
          component={Support}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="AddPackage"
          component={AddPackage}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="AddPackageScreen"
          component={AddScreen}
        />
        <Stack.Screen
          options={{
            header: (props) => (
              <AppointmentHeader
                title={isBn ? "অ্যাপয়েন্টমেন্ট" : "Appointment"}
                {...props}
              />
            ),
          }}
          name="AppointmentList"
          component={AppointmentList}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="CreateAppointment"
          component={CreateAppointment}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="AppointmentDetails"
          component={AppointmentDetails}
        />
        {/* <Stack.Screen
            options={{
              header: (props) => (
                <AppointmentHeader title={"Appointment"} {...props} />
              ),
            }}
            name="VendorAppointmentList"
            component={VendorAppointmentList}
          /> */}
        <Stack.Screen
          options={{ headerShown: false }}
          name="CreateVendorAppointment"
          component={CreateVendorAppointment}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="AppointmentForm"
          component={AppointmentForm}
        />
        <Stack.Screen
          options={{
            header: (props) => (
              <AppointmentHeader
                title={isBn ? "অ্যাপয়েন্টমেন্ট" : "Appointment"}
                {...props}
              />
            ),
          }}
          name="RequestAppointmentList"
          component={RequestAppointmentList}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="VendorAppointmentListDetails"
          component={VendorAppointmentListDetails}
        />

        <Stack.Screen
          options={{
            header: (props) => (
              <AppointmentHeader
                title={isBn ? "অ্যাপয়েন্টমেন্ট" : "Appointment"}
                {...props}
              />
            ),
          }}
          name="UserRequestAppointment"
          component={UserRequestAppointment}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="UserAppointmentDetails"
          component={UserAppointmentDetails}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="SubscriptionDates"
          component={SubscriptionDates}
        />
        <Stack.Screen
          options={{
            header: (props) => (
              <AccountHeader title={isBn ? "উত্তোলন" : "Withdraw"} {...props} />
            ),
          }}
          name="WithdrawFirst"
          component={WithdrawFirst}
        />
        <Stack.Screen
          options={{
            header: (props) => (
              <AccountHeader title={isBn ? "উত্তোলন" : "Withdraw"} {...props} />
            ),
          }}
          name="WithdrawSecond"
          component={WithdrawSecond}
        />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="WithdrawFinal"
          component={WithdrawFinal}
        />
        {/* <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="ServiceScreen"
          component={ServiceScreen}
        /> */}
        {
          //new service account screens
        }
        <Stack.Screen
          options={{ headerShown: false }}
          name="UserProfile"
          component={UserProfile}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="WebViewsGlobal"
          component={WebViews}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
