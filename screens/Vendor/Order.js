import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Animated as A,
  Image,
  TextInput,
  Dimensions,
  Pressable,
  Platform,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { Color } from "../../assets/colors";
import { FontAwesome } from "@expo/vector-icons";
import { getOrders } from "../../Class/service";
import Button from "../../components/Button";
import DropDown from "../../components/DropDown";
import { SvgXml } from "react-native-svg";
import ActivityLoader from "./../../components/ActivityLoader";
import { createStackNavigator } from "@react-navigation/stack";
import OrderDetails from "./OrderDetails";
import AddServiceList from "./../AddServiceList";
import AcceptOrder from "./AcceptOrder";
import UserProfile from "../UserProfile";
import { socket } from "../../Class/socket";
import IconButton from "../../components/IconButton";
const { width, height } = Dimensions.get("window");
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import {
  waitionIcon,
  processingIcon,
  cancelIcon,
  deliveryIcon,
  refundIcon,
  dueIcon,
  paidIcon,
  completeIcon,
} from "../../assets/icon";
import Animated, { StretchInY } from "react-native-reanimated";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TopTabBar from "../Seller/components/TopTabBar";
import OrderTabBar from "./components/OrderTabBar";
import MemberList from "./MemberList";
import NewTab from "./components/NewTab";
import VendorServiceList from "./VendorServiceList";
import SelectDate from "./SelectDate";
import OfflineProfile from "../OfflineProfile";
import Notice from "../UserNotice";
import Note, { AddNote, ViewNote } from "./Note";
import { ActivityIndicator } from "react-native-paper";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useIsFocused } from "@react-navigation/native";
import { addUserOrder, updateUserOrder } from "../../Reducers/userOrders";
import { addVendorOrder, updateVendorOrder } from "../../Reducers/vendorOrders";
import PackageList from "./PackageList";
import SubscriptionScript from "../services/SubscriptionScript";
import { setOrderListFilter } from "../../Reducers/orderListFilter";
import InstallmentScript from "../services/InstallmentScript";
import { getOfflineMembers } from "../../Class/member";
import VendorOfflineOrderDetails from "./VendorOfflineOrderDetails";
import SubscriptionOfflineScript from "../services/SubscriptionOfflineScript";
import InstallmentOfflineScript from "../services/InstallmentOfflineScript";
import { DataTable } from "react-native-paper";
import UserOrderHeader from "../../Hooks/UserOrderHeader";
import { setOrderRef } from "../../Reducers/orderRef";
import customStyle from "../../assets/stylesheet";
import VendorSearchOrder from "./VendorSearchOrder";
import Member from "./Member";
import SubHeader from "../../components/SubHeader";
import ImportantNotice from "../Seller/OrderScript/ImportantNotice";
import CancelOrderConfirmation from "../Seller/OrderScript/CancelOrderConfirmation";
import OrderDelivery from "../Seller/OrderScript/OrderDelivery";
import ServiceAgreement from "../Seller/OrderScript/ServiceAgreement";
import OrderDeliveryRequirements from "../Seller/OrderScript/OrderDeliveryRequirements";
import NeedExtraTime from "../Seller/OrderScript/NeedExtraTime";
import OtherProfile from "../OtherProfile";
import FixedService from "../FixedService";
import PackageService from "../PackageService";
import CompanyCalendar from "../Seller/CompanyCalendar";
import UserNotice from "../UserNotice";
import useLang from "../../Hooks/UseLang";
const Tab = createMaterialTopTabNavigator();

const Stack = createStackNavigator();

const Order = () => {
  const { language } = useLang();
  const isBn = language == "Bn";
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="VendorOrder"
        component={VendorOrder}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Feed"
        component={VendorOrder}
      />
      <Stack.Screen
        name="Company Calender"
        options={{
          header: (props) => <SubHeader {...props} title={"Working Time"} />,
        }}
        component={CompanyCalendar}
      />
      <Stack.Screen
        name="UserNotice"
        options={{
          headerShown: false,
        }}
        component={UserNotice}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="VendorOrderDetails"
        component={OrderDetails}
      />
      <Stack.Screen
        options={{
          header: (props) => (
            <SubHeader
              {...props}
              title={isBn ? "গুরুত্বপূর্ণ নোট" : "Important Note"}
            />
          ),
        }}
        name="ImportantNotice"
        component={ImportantNotice}
      />
      <Stack.Screen
        options={{
          header: (props) => (
            <SubHeader
              fontStyle={{ fontSize: 20 }}
              {...props}
              title={"Proof Requirements"}
            />
          ),
        }}
        name="OrderDeliveryRequirement"
        component={OrderDeliveryRequirements}
      />
      <Stack.Screen
        options={{
          header: (props) => (
            <SubHeader
              fontStyle={{ fontSize: 20 }}
              {...props}
              title={isBn ? "অতিরিক্ত সময় নির্বাচন করুন" : "Chose Extra Time"}
            />
          ),
        }}
        name="NeedExtraTIme"
        component={NeedExtraTime}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="VendorOfflineOrderDetails"
        component={VendorOfflineOrderDetails}
      />
      <Stack.Screen
        options={{
          header: (props) => (
            <SubHeader
              title={isBn ? "সার্ভিস বাছাই করুন" : "Choose Service"}
              {...props}
            />
          ),
        }}
        name="AddServiceList"
        component={AddServiceList}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AcceptOrder"
        component={AcceptOrder}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="UserProfile"
        component={UserProfile}
      />
      <Stack.Screen
        options={{
          header: (props) => (
            <SubHeader
              title={isBn ? "সদস্য নির্বাচন করুন" : "Choose Member"}
              {...props}
            />
          ),
        }}
        name="MemberList"
        component={MemberList}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="OfflineProfile"
        component={OfflineProfile}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Note"
        component={Note}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AddNote"
        component={AddNote}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ViewNote"
        component={ViewNote}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="VendorServiceList"
        component={VendorServiceList}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SelectDate"
        component={SelectDate}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="PackageList"
        component={PackageList}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="AddServiceList_1"
        component={AddServiceList}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SubscriptionScript"
        component={SubscriptionScript}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SubscriptionOfflineScript"
        component={SubscriptionOfflineScript}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="InstallmentScript"
        component={InstallmentScript}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="InstallmentOfflineScript"
        component={InstallmentOfflineScript}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="VendorSearchOrder"
        component={VendorSearchOrder}
      />
      <Stack.Screen
        options={{
          header: (props) => (
            <SubHeader
              {...props}
              title={isBn ? "বাতিল নিশ্চিতকরন" : "Cancel confirmation"}
            />
          ),
        }}
        name="CancelOrderConfirmation"
        component={CancelOrderConfirmation}
      />
      <Stack.Screen
        options={{
          header: (props) => (
            <SubHeader
              {...props}
              title={isBn ? "ডেলিভারির প্রমাণ পাঠান" : "Send Proof"}
            />
          ),
        }}
        name="OrderDelivery"
        component={OrderDelivery}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ServiceAgreement"
        component={ServiceAgreement}
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
        options={{ headerShown: false }}
        name="FixedService"
        component={FixedService}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="PackageService"
        component={PackageService}
      />
    </Stack.Navigator>
  );
};

const VendorOrder = ({ navigation }) => {
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const backgroundColor = colors.getBackgroundColor();
  const { language } = useLang();
  const isBn = language == "Bn";
  const [initialState, setInitialState] = React.useState([
    {
      title: isBn ? "দরদাম" : "Bargaining",
      value: true,
      type: "STARTING",
    },
    {
      title: isBn ? "একদাম" : "Fixed",
      value: false,
      type: "ONETIME",
    },
    // {
    //   title: "Package",
    //   value: false,
    //   type: "PACKAGE",
    // },
    // {
    //   title: "Subscription",
    //   value: false,
    //   type: "SUBS",
    // },
    // {
    //   title: "Installment",
    //   value: false,
    //   type: "INSTALLMENT",
    // },
  ]);
  const [initialStateOffline, setInitialStateOffline] = React.useState([
    {
      title: "Fixed",
      value: false,
      type: "ONETIME",
    },
    // {
    //   title: "Package",
    //   value: false,
    //   type: "PACKAGE",
    // },
    // {
    //   title: "Subscription",
    //   value: false,
    //   type: "SUBS",
    // },
    // {
    //   title: "Installment",
    //   value: false,
    //   type: "INSTALLMENT",
    // },
  ]);
  const [AllStatus, setAllStatus] = React.useState([
    {
      title: isBn ? "এখনো গ্রহণ করা হয়নি" : "Waiting For Accept",
      icon: waitionIcon,
      value: "Waiting For Accept",
    },
    {
      title: isBn ? "বাকি" : "Due",
      icon: dueIcon,
      value: "Due",
    },
    {
      title: isBn ? "পরিশোধ হয়েছে" : "Paid",
      icon: paidIcon,
      value: "Paid",
    },
    {
      title: isBn ? "অর্ডারটি প্রক্রিয়াকরণ হচ্ছে" : "Processing",
      icon: processingIcon,
      value: "Processing",
    },
    {
      title: isBn ? "ডেলিভারি সম্পন্ন হয়েছে" : "Delivered",
      icon: deliveryIcon,
      value: "Delivered",
    },
    {
      title: isBn ? "অর্ডারটি সফল ভাবে সম্পন্ন হয়েছে" : "Order Completed",
      icon: completeIcon,
      value: "Completed",
    },
    {
      title: isBn ? "অর্ডারটি বাতিল করা হয়েছে" : "Order Canceled",
      icon: cancelIcon,
      value: "Canceled",
    },
    {
      title: isBn ? "সার্ভিসটি সম্পন্ন করতে ব্যর্থ হয়েছে" : "Failed",
      icon: refundIcon,
      value: "Refunded",
    },
  ]);
  const [Refresh, setRefresh] = React.useState(false);
  const [Loader, setLoader] = React.useState(false);
  const [Orders, setOrders] = React.useState(null);
  const [Active, setActive] = React.useState("STARTING");
  const bottomSheetRef = React.useRef(null);
  const [Change, setChange] = React.useState(false);
  const dispatch = useDispatch();
  const [Index, setIndex] = React.useState(-1);
  const snapPoints = React.useMemo(() => ["25%", "60%"], []);
  const orderListFilter = useSelector((state) => state.orderListFilter);
  const [offlineOrder, setOfflineOrder] = useState(false);
  const offlineOrders = useSelector((state) => state.offlineOrders);
  const [allOrders, setAllOrders] = useState([0, 0, 0, 0, 0]);

  // callbacks
  const handleSheetChanges = React.useCallback((index) => {
    //console.log("handleSheetChanges", index);
    setIndex(index);
  }, []);
  const inset = useSafeAreaInsets();
  //console.log(vendorOrders)
  // if (Loader) {
  //   return (
  //     <View
  //       style={{
  //         flex: 1,
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}>
  //       <ActivityLoader />
  //     </View>
  //   );
  // }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          height: inset?.top,
        }}
      />
      <StatusBar style="dark" backgroundColor="#ffffff" />

      <UserOrderHeader
        onSearch={() => {
          navigation.navigate("VendorSearchOrder");
        }}
        onCreate={() => {
          navigation.navigate("MemberList", { offline: offlineOrder });
        }}
        onFilter={() => {
          setIndex(1);
        }}
        allOrders={allOrders}
        navigation={navigation}
      />
      {offlineOrder == false && (
        <Tab.Navigator
          screenOptions={{
            tabBarIndicatorStyle: {
              backgroundColor: "#767676",
              height: 3,
            },

            tabBarStyle: {
              backgroundColor: "#ffffff",
            },
            tabBarScrollEnabled: false,
          }}
        >
          {initialState.map((doc, i) => (
            <Tab.Screen
              options={{
                tabBarLabel: ({ focused }) => (
                  <Text
                    style={{
                      fontWeight: "500",
                      fontSize: 16,

                      color: focused ? "#000000" : "#A3A3A3",
                    }}
                  >
                    {`${initialState[i].title}`}
                    <Text
                      style={{
                        fontSize: 12,
                      }}
                    >
                      ({allOrders[i]})
                    </Text>
                  </Text>
                ),
              }}
              key={i}
              name={doc.type}
              component={Screens}
              initialParams={{
                setAllOrders: setAllOrders,
                key: i,
              }}
            />
          ))}
        </Tab.Navigator>
      )}
      {offlineOrder && (
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: { fontSize: 12 },
            tabBarItemStyle: {
              margin: 0,
              padding: 0,
              width: 120,
              paddingTop: 0,
              paddingBottom: 10,
            },
            tabBarIndicatorStyle: {
              backgroundColor: backgroundColor,
            },
            tabBarScrollEnabled: false,
            tabBarPressColor: "white",
          }}
        >
          {initialStateOffline.map((doc, i) => (
            <Tab.Screen
              options={{
                title: `${initialStateOffline[i].title}(${
                  offlineOrders
                    ? offlineOrders.filter(
                        (d) => d.type == initialStateOffline[i].type
                      ).length
                    : "0"
                })`,
              }}
              key={i}
              name={doc.type}
              component={OfflineScreens}
            />
          ))}
        </Tab.Navigator>
      )}
      {offlineOrder == null && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityLoader />
        </View>
      )}

      {Index != -1 && (
        <View
          style={{
            backgroundColor: "#00000010",
            position: "absolute",
            width: width,
            height: height,
            top: 0,
          }}
        />
      )}
      <BottomSheet
        enablePanDownToClose={true}
        ref={bottomSheetRef}
        index={parseInt(Index)}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <BottomSheetScrollView>
          {AllStatus.map((doc, i) => (
            <IconButton
              onPress={() => {
                if (orderListFilter == doc.value) {
                  dispatch(setOrderListFilter(null));
                  return;
                }
                bottomSheetRef.current.close();
                dispatch(setOrderListFilter(doc.value));
              }}
              style={{
                justifyContent: "flex-start",
                borderWidth: 0,
                marginHorizontal: 10,
                backgroundColor:
                  orderListFilter == doc.value ? "#F2F2F6" : primaryColor,
              }}
              key={i}
              LeftIcon={() => <SvgXml xml={doc.icon} height="24" />}
              title={doc.title}
            />
          ))}
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
};

export default Order;

export const OrderCart = ({ data, onPress, user, open }) => {
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const assentColor = colors.getAssentColor();
  const dispatch = useDispatch();
  const [Open, setOpen] = React.useState(false);
  const type = data.type;
  const { language } = useLang();
  const isBn = language == "Bn";
  //console.warn(data.installmentData)
  //console.log(data.service?.serviceCenterName)
  //console.log(data.service)
  // React.useEffect(() => {
  //   //console.log(orderState)
  //   if (orderState && data && orderState != data.id) {
  //     setOpen(false);
  //   }
  // }, [orderState]);

  if (!data) return null;

  return (
    <TouchableOpacity
      onPress={() => {
        if (onPress) {
          onPress();
          dispatch({ type: "SET_LIST_SELECTION", playload: [] });
        }
      }}
    >
      <View
        style={{
          backgroundColor: open ? "#F2F2F6" : primaryColor,
          paddingHorizontal: 20,
          paddingVertical: 0,
          paddingTop: 0,
          marginVertical: 8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 4,
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", flex: 1.3 }}
          >
            <View
              style={{
                borderWidth: 1,
                width: 56,
                height: 56,
                borderRadius: 28,
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                borderColor: "#e5e5e5",
              }}
            >
              {data && !user && data.user && data.user.profilePhoto ? (
                <Image
                  style={{
                    height: 56,
                    width: 56,
                  }}
                  source={{ uri: data.user.profilePhoto }}
                />
              ) : data && user && data.service && data.service.profilePhoto ? (
                <Image
                  style={{
                    height: 56,
                    width: 56,
                  }}
                  source={{ uri: data.service.profilePhoto }}
                />
              ) : (
                <FontAwesome name="user" size={40} color={assentColor} />
              )}
            </View>
            <View
              style={{
                marginLeft: 12,
                flex: 1,
              }}
            >
              {user ? (
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                  }}
                >
                  {data?.service?.serviceCenterName}
                </Text>
              ) : (
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                  }}
                >
                  {data
                    ? user
                      ? `${data.service.providerInfo.title}`
                      : data.user.name
                    : "Um"}{" "}
                  {data
                    ? user
                      ? `${data.service.providerInfo.name}`
                      : ""
                    : "Um"}
                </Text>
              )}

              <Text
                style={{
                  color: "#767676",
                  fontSize: 12,
                  fontWeight: "400",
                  marginTop: 4,
                }}
              >
                {data && data.status
                  ? data.paid && data.status == "CANCELLED"
                    ? isBn
                      ? "অর্ডারটি সম্পন্ন করতে ব্যর্থ হয়েছে"
                      : "Failed"
                    : exporters(data.status)
                  : "Unknown"}{" "}
                <Text
                  numberOfLines={1}
                  style={{
                    color:
                      data.paid && data.status != "CANCELLED"
                        ? null
                        : data.paid && data.status == "CANCELLED"
                        ? "#EC2700"
                        : "#7566FF",
                    fontSize: 12,
                    fontWeight: "400",
                  }}
                >
                  (
                  {data && data.paid && data.status != "CANCELLED"
                    ? isBn
                      ? "পরিশোধ"
                      : "Paid"
                    : data && data.paid && data.status == "CANCELLED"
                    ? isBn
                      ? "টাকা ফেরত দেয়া হয়েছে"
                      : "Refunded"
                    : isBn
                    ? "বাকি"
                    : "Due"}
                  )
                </Text>
              </Text>
            </View>
          </View>

          <View
            style={{
              alignItems: "center",
              paddingVertical: 4,
              justifyContent: "center",
              paddingHorizontal: 8,
              borderRadius: 30,
              backgroundColor:
                data?.paid && data?.status == "CANCELLED"
                  ? "#EC2700"
                  : "#4ADE80",
              marginLeft: 30,
            }}
          >
            {type == "SUBS" ? (
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 12,
                  color: "white",
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                {data.subsData.subscriptionType}{" "}
                {data ? data.subsData.amount : "0"}
                <Text style={{ fontWeight: "700" }}>৳</Text>
              </Text>
            ) : type == "INSTALLMENT" ? (
              <Text
                numberOfLines={2}
                style={{
                  fontSize: 12,
                  color: "white",
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                {data.installmentData?.installmentType}{" "}
                {data
                  ? (
                      data.installmentData?.totalAmount /
                      data.installmentData.installmentCount
                    ).toFixed(2)
                  : "0"}
                <Text style={{ fontWeight: "700" }}>৳</Text>
              </Text>
            ) : type == "ONETIME" || type == "PACKAGE" ? (
              <Text
                style={{
                  fontSize: 12,
                  color: "white",
                  fontWeight: "500",
                }}
              >
                {data ? data.amount : "0"}
                <Text style={{ fontWeight: "700" }}>৳</Text>
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: 12,
                  color: "white",
                  fontWeight: "500",
                }}
              >
                {data ? data.offerPrice : "0"}
                <Text style={{ fontWeight: "700" }}>৳</Text>
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const exporters = (key) => {
  const { language } = useLang();
  const isBn = language == "Bn";
  switch (key) {
    case "WAITING_FOR_ACCEPT":
      return isBn ? "এখনো গ্রহণ করা হয়নি" : "Waiting for accept";
    case "ACCEPTED":
      return isBn ? "গ্রহণ করা হয়েছে" : "Accepted";
    case "WAITING_FOR_PAYMENT":
      return isBn ? "টাকা পরিশোধ করা বাকি আছে" : "Waiting for payment";
    case "PROCESSING":
      return isBn ? "প্রক্রিয়াকরণ হচ্ছে" : "Processing";
    case "DELIVERED":
      return isBn ? "ডেলিভারি সম্পন্ন হয়েছে" : "Delivered";
    case "REFUNDED":
      return isBn ? "সার্ভিসটি সম্পন্ন করতে ব্যর্থ হয়েছে" : "Refunded";
    case "CANCELLED":
      return isBn ? "অর্ডারটি বাতিল করা হয়েছে" : "Cancelled";
    case "COMPLETED":
      return isBn ? "অর্ডারটি সফলভাবে সম্পন্ন হয়েছে" : "Completed";
    default:
      return isBn ? "অজানা" : "Unknown";
  }
};
export const Screens = ({ navigation, route }) => {
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const backgroundColor = colors.getBackgroundColor();
  //const setRefresh=route.params.setRefresh;
  const [NewOrders, setNewOrders] = React.useState();
  const [Index, setIndex] = React.useState(-1);

  const [refreshing, setRefreshing] = React.useState(false);
  const scrollY = new A.Value(0);
  const [Search, setSearch] = React.useState();
  const [Filter, setFilter] = React.useState();
  const [Refresh, setRefresh] = React.useState(false);
  const [Loader, setLoader] = React.useState(false);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const [AllOrders, setAllOrders] = React.useState();
  const user = useSelector((state) => state.user);
  const vendor = useSelector((state) => state.vendor);
  const [Open, setOpen] = React.useState();
  const isFocused = useIsFocused();
  const orderListFilter = useSelector((state) => state.orderListFilter);
  const setOrder = route.params.setAllOrders;
  const key = route.params.key;
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const { language } = useLang();
  const isBn = language == "Bn";
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefresh((val) => !val);
    //dispatch({ type: "SET_INTEREST_CATEGORY", playload: "Home" });
    wait(1000).then(() => setRefreshing(false));
  }, []);

  // callbacks
  const renderItem = useCallback(
    ({ item }) => (
      <OrderCart
        onSelect={(e) => {
          //dispatch({ type: "ORDER_STATE", playload: e });
          //dispatch({ type: "ORDER_STATE", playload: e });
          setOpen((val) => {
            if (val != e) {
              return e;
            } else {
              return null;
            }
          });
        }}
        onPress={() => {
          if (item.type == "SUBS" && item.status != "WAITING_FOR_ACCEPT") {
            navigation.navigate("SubscriptionScript", { data: item });
            return;
          }
          if (
            item.type == "INSTALLMENT" &&
            item.status != "WAITING_FOR_ACCEPT"
          ) {
            navigation.navigate("InstallmentScript", { data: item });
            return;
          }
          navigation.navigate("VendorOrderDetails", {
            data: item,
            orderId: item?.id,
            type: item?.type,
          });
        }}
        key={item.id}
        data={item}
        open={Open == item.id ? true : false}
      />
    ),
    []
  );
  const loadData = async () => {
    try {
      // setLoader(true);
      const { data } = await getOrders(
        user.token,
        "vendor",
        vendor.service.id,
        route.name,
        AllOrders?.length
      );
      setLoader(false);
      if (AllOrders && NewOrders && data.orders.length > 0) {
        setAllOrders((d) => [...d, ...data.orders]);
        setNewOrders((d) => [...d, ...data.orders]);
      }
    } catch (error) {
    } finally {
      setLoader(false);
    }
  };

  React.useEffect(() => {
    if (user && vendor) {
      setLoader(true);
      getOrders(user.token, "vendor", vendor.service.id, route.name, 0)
        .then((res) => {
          setAllOrders(res.data.orders);
          setNewOrders(res.data.orders);
          //console.log(res.data.orders)
          setOrder((val) => {
            return val.map((doc, i) => {
              if (i == key) {
                return res.data.total;
              } else {
                return doc;
              }
            });
          });
          if (isFocused) {
            setTotal(res.data.total);
          }
          setLoader(false);
        })
        .catch((err) => {
          setLoader(false);
          console.error(err.response.data.msg);
        });
    }
  }, [user, vendor, refreshing]);
  React.useEffect(() => {
    socket.on("updateOrder", () => {
      setRefresh((val) => !val);
    });
    socket.on("getOrder", () => {
      setRefresh((val) => !val);
    });
    return () => {
      socket?.off("updateOrder");
      socket?.off("getOrder");
    };
  }, []);

  React.useEffect(() => {
    if (AllOrders) {
      switch (orderListFilter) {
        case "Waiting For Accept":
          let text = orderListFilter;
          text = text.split(" ").join("_");
          let arr = AllOrders.filter((d) =>
            d.status.toUpperCase().match(text.toUpperCase())
          );
          setNewOrders(arr);
          break;

        case "Due":
          let dues = AllOrders.filter((d) => d.paid == false);
          setNewOrders(dues);
          break;
        case "Paid":
          let paid = AllOrders.filter((d) => d.paid == true);
          setNewOrders(paid);
          break;
        case "Processing":
          let processing = AllOrders.filter((d) =>
            d.status.toUpperCase().match("PROCESSING")
          );
          setNewOrders(processing);
          break;
        case "Delivered":
          let delivered = AllOrders.filter(
            (d) => d.delivered == true && d.status != "COMPLETED"
          );
          setNewOrders(delivered);
          break;

        case "Completed":
          let completed = AllOrders.filter((d) => d.status == "COMPLETED");
          setNewOrders(completed);
          break;
        case "Canceled":
          let cancel = AllOrders.filter(
            (d) => d.status == "CANCELLED" && d.paid == false
          );
          setNewOrders(cancel);
          break;
        case "Refunded":
          let refund = AllOrders.filter(
            (d) => d.status == "CANCELLED" && d.paid == true
          );
          setNewOrders(refund);
          break;
        default:
          setNewOrders(AllOrders);
      }
    }
  }, [orderListFilter]);
  React.useEffect(() => {
    if (AllOrders) {
      if (!Search) {
        setNewOrders(AllOrders);
      } else {
        let text = Search;
        text = text.split(" ").join("_");
        let arr = AllOrders.filter((d) =>
          d.status.toUpperCase().match(text.toUpperCase())
        );
        setNewOrders(arr);
      }
    }
  }, [Search]);
  if (!AllOrders || refreshing || Loader) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="small" color={backgroundColor} />
      </View>
    );
  }
  return (
    <View style={{ flex: 1, paddingVertical: 8 }}>
      {NewOrders && NewOrders.length > 0 && (
        <FlatList
          onRefresh={onRefresh}
          refreshing={refreshing}
          showsVerticalScrollIndicator={false}
          data={NewOrders}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          onEndReached={() => {
            //setPage((d) => d + 1);
            loadData();
            //console.log("ds");
          }}
        />
      )}
      {/* {Loader && <ActivityLoader />} */}
      {NewOrders && NewOrders.length == 0 && !Loader && (
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <SvgXml xml={noOrder} />
          <Text
            style={{
              fontSize: 24,
              marginTop: 24,
            }}
          >
            {isBn ? "কোনও অর্ডার নেই" : "No Order Found"}
          </Text>
        </ScrollView>
      )}
      {Loader && (
        <View style={[customStyle.fullBox, { marginBottom: 20 }]}>
          <ActivityIndicator size="small" color={backgroundColor} />
        </View>
      )}
    </View>
  );
};
const notify = `<svg xmlns="http://www.w3.org/2000/svg" width="10.924" height="11.104" viewBox="0 0 10.924 11.104">
<g id="_8023573" data-name="8023573" transform="translate(-16.046 -16.182)">
  <g id="_011839ff" data-name="#011839ff" transform="translate(16.046 16.182)">
    <path id="Path_28021" data-name="Path 28021" d="M19.963,16.211a1.273,1.273,0,0,1,1.19.366.6.6,0,0,1,.194.326.364.364,0,0,1-.666.237.543.543,0,0,0-.945.526,2.035,2.035,0,0,1,.658-.028.366.366,0,0,1-.046.724,2.468,2.468,0,0,0-1.617.543,2.352,2.352,0,0,0-.862,1.732c-.006.38,0,.759,0,1.139a5.818,5.818,0,0,1-.777,2.777h6.3a5.52,5.52,0,0,1-.475-1.055.366.366,0,0,1,.218-.444.37.37,0,0,1,.481.241,5.069,5.069,0,0,0,.738,1.4.367.367,0,0,1-.021.466.372.372,0,0,1-.29.12h-1.8a2,2,0,0,1-4.007,0h-1.8a.366.366,0,0,1-.3-.6,5.072,5.072,0,0,0,.956-2.312,11.87,11.87,0,0,0,.052-1.595,3.084,3.084,0,0,1,1.9-2.9,1.272,1.272,0,0,1,.928-1.667m-.986,9.072a1.279,1.279,0,0,0,2.531,0Z" transform="translate(-16.046 -16.182)" fill="#011839"/>
  </g>
  <g id="_7738c8ff" data-name="#7738c8ff" transform="translate(21.144 16.542)">
    <path id="Path_28022" data-name="Path 28022" d="M242.612,32.025a2.916,2.916,0,1,1-.986.286,2.914,2.914,0,0,1,.986-.286m.059,1.511c-.125.051-.252.1-.376.152a.367.367,0,0,0-.179.465.374.374,0,0,0,.437.214q0,.642,0,1.283a.536.536,0,0,0-.242.033.364.364,0,0,0,.15.7h.887a.365.365,0,0,0,.174-.7.541.541,0,0,0-.241-.033q0-.854,0-1.708a.646.646,0,0,0-.026-.245.364.364,0,0,0-.338-.232A.652.652,0,0,0,242.671,33.536Z" transform="translate(-240.004 -32.009)" fill="#333"/>
  </g>
</g>
</svg>
`;
export const OfflineScreens = ({ navigation, route }) => {
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const secondaryColor = colors.getSecondaryColor();
  const textColor = colors.getTextColor();
  const backgroundColor = colors.getBackgroundColor();
  const assentColor = colors.getAssentColor();
  //const setRefresh=route.params.setRefresh;
  const [NewOrders, setNewOrders] = React.useState();
  const [Index, setIndex] = React.useState(-1);

  const [refreshing, setRefreshing] = React.useState(false);
  const scrollY = new A.Value(0);
  const diffClamp = A.diffClamp(scrollY, 0, 300);
  const [Search, setSearch] = React.useState();
  const [Filter, setFilter] = React.useState();
  const translateY = diffClamp.interpolate({
    inputRange: [0, 300],
    outputRange: [0, -300],
  });
  const [Refresh, setRefresh] = React.useState(false);
  const [Loader, setLoader] = React.useState(false);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const [AllOrders, setAllOrders] = React.useState();
  const vendorOrders = useSelector((state) => state.offlineOrders);
  const [Open, setOpen] = React.useState();
  const isFocused = useIsFocused();
  const orderListFilter = useSelector((state) => state.orderListFilter);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefresh((val) => !val);
    //dispatch({ type: "SET_INTEREST_CATEGORY", playload: "Home" });
    wait(1000).then(() => setRefreshing(false));
  }, []);

  // callbacks

  React.useEffect(() => {
    if (vendorOrders) {
      let arr = vendorOrders.filter((d) => d.type == route.name);
      setAllOrders(arr);
      setNewOrders(arr);
    }
  }, [route.name, isFocused, vendorOrders, Refresh]);

  React.useEffect(() => {
    if (AllOrders) {
      switch (orderListFilter) {
        case "Waiting For Accept":
          let text = orderListFilter;
          text = text.split(" ").join("_");
          let arr = AllOrders.filter((d) =>
            d.status.toUpperCase().match(text.toUpperCase())
          );
          setNewOrders(arr);
          break;

        case "Due":
          let dues = AllOrders.filter((d) => d.paid == false);
          setNewOrders(dues);
          break;
        case "Paid":
          let paid = AllOrders.filter((d) => d.paid == true);
          setNewOrders(paid);
          break;
        case "Processing":
          let processing = AllOrders.filter((d) =>
            d.status.toUpperCase().match("PROCESSING")
          );
          setNewOrders(processing);
          break;
        case "Delivered":
          let delivered = AllOrders.filter((d) => d.delivered == true);
          setNewOrders(delivered);
          break;

        case "Completed":
          let completed = AllOrders.filter((d) => d.status == "COMPLETED");
          setNewOrders(completed);
          break;
        case "Canceled":
          let cancel = AllOrders.filter((d) => d.status == "CANCELLED");
          setNewOrders(cancel);
          break;
        case "Refund":
          let refund = AllOrders.filter((d) => d.status == "REFUNDED");
          setNewOrders(refund);
          break;
        default:
          setNewOrders(AllOrders);
      }
    }
  }, [orderListFilter]);
  React.useEffect(() => {
    if (AllOrders) {
      if (!Search) {
        setNewOrders(AllOrders);
      } else {
        let text = Search;
        text = text.split(" ").join("_");
        let arr = AllOrders.filter((d) =>
          d.status.toUpperCase().match(text.toUpperCase())
        );
        setNewOrders(arr);
      }
    }
  }, [Search]);

  if (!vendorOrders) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="small" color={backgroundColor} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ flexGrow: 1 }}
        stickyHeaderIndices={[0]}
        scrollEventThrottle={16}
        stickyHeaderHiddenOnScroll={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              //setPageChange(true);
              onRefresh();
            }}
          />
        }
        showsVerticalScrollIndicator={false}
        onScroll={(e) => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
          //scroll;
        }}
      >
        <A.View
          style={[
            {
              transform: [{ translateY: translateY }],
              top: 0,
              left: 0,
              right: 0,
              backgroundColor: secondaryColor,
              zIndex: 500,
            },
          ]}
        >
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 10,
              marginVertical: 0,
              justifyContent: "space-between",
              marginBottom: 15,
              marginTop: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
                paddingHorizontal: 15,
                paddingVertical: 8,
                flex: 2,
                borderRadius: 20,
                justifyContent: "flex-start",
              }}
            >
              <AntDesign
                style={{ marginRight: 10 }}
                name="search1"
                size={24}
                color={assentColor}
              />
              <TextInput
                value={Search}
                onChangeText={(e) => {
                  setSearch(e);
                }}
                placeholderTextColor={assentColor}
                placeholder="Search Now"
                returnKeyType="search"
              />
            </View>
            {/* <DropDown
            value={Filter}
            onChange={(e) => {
              setFilter(e);
            }}
            style={{
              marginLeft: 15,
            }}
            DATA={[
              "Waiting for accept",
              "Accepted",
              "Canceled",
              "Refounded",
              "Processing",
              "Delivered",
              "Completed",
              "Waiting for payment",
            ]}
            placeholder={"Select"}
          /> */}
          </View>
        </A.View>
        {NewOrders &&
          NewOrders.map((doc, i) => (
            <OrderCartOffline
              onSelect={(e) => {
                //console.log(e)
                //dispatch({ type: "ORDER_STATE", playload: e });
                //dispatch({ type: "ORDER_STATE", playload: e });
                setOpen((val) => {
                  if (val != e) {
                    return e;
                  } else {
                    return null;
                  }
                });
              }}
              onPress={(userInfo) => {
                if (doc.type == "SUBS" && doc.status != "WAITING_FOR_ACCEPT") {
                  navigation.navigate("SubscriptionOfflineScript", {
                    data: doc,
                    userInfo: userInfo,
                  });
                  return;
                }
                if (
                  doc.type == "INSTALLMENT" &&
                  doc.status != "WAITING_FOR_ACCEPT"
                ) {
                  navigation.navigate("InstallmentOfflineScript", {
                    data: doc,
                    userInfo: userInfo,
                  });
                  return;
                }
                navigation.navigate("VendorOfflineOrderDetails", {
                  data: doc,
                  userInfo: userInfo,
                });
              }}
              key={i}
              data={doc}
              open={Open == doc.id ? true : false}
              user={true}
            />
          ))}

        {NewOrders && NewOrders.length == 0 && !Loader && (
          <Text style={{ color: textColor, textAlign: "center" }}>
            No data available
          </Text>
        )}
        <View style={{ height: 70 }} />
      </ScrollView>
    </View>
  );
};
export const OrderCartOffline = ({ data, onPress, onSelect, open }) => {
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const textColor = colors.getTextColor();
  const backgroundColor = colors.getBackgroundColor();
  const assentColor = colors.getAssentColor();
  const dispatch = useDispatch();
  const [Open, setOpen] = React.useState(false);
  const type = data.type;
  const [userInfo, setUserInfo] = useState();
  const newUser = useSelector((state) => state.user);
  const vendor = useSelector((state) => state.vendor);
  //console.warn(data.installmentData)

  //console.log(data.service)
  // React.useEffect(() => {
  //   //console.log(orderState)
  //   if (orderState && data && orderState != data.id) {
  //     setOpen(false);
  //   }
  // }, [orderState]);
  useEffect(() => {
    (async () => {
      const res = await getOfflineMembers(newUser.token, vendor.service.id);
      setUserInfo(
        res ? res.members.filter((d) => d.id == data.offlineMemberId)[0] : null
      );
    })();
  }, [data.offlineMemberId]);

  return (
    <Pressable
      onPress={() => {
        if (onPress) {
          onPress(userInfo);
          dispatch({ type: "SET_LIST_SELECTION", playload: [] });
        }
        return;
        setOpen((val) => !val);
        if (onSelect) {
          onSelect(data.id);
        }
      }}
    >
      <View
        style={{
          backgroundColor: open ? "#F2F2F6" : primaryColor,
          paddingHorizontal: 10,
          paddingVertical: 0,
          paddingTop: 0,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 5,
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", flex: 1.3 }}
          >
            <View
              style={{
                borderWidth: 1,
                width: 50,
                height: 50,
                borderRadius: 25,
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                borderColor: "#e5e5e5",
              }}
            >
              {data && data.profilePhoto ? (
                <Image
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  source={{ uri: data.profilePhoto }}
                />
              ) : (
                <FontAwesome name="user" size={35} color={assentColor} />
              )}
            </View>
            <View
              style={{
                marginLeft: 10,
                flex: 1,
                marginRight: 20,
              }}
            >
              <Text
                numberOfLines={1}
                style={{
                  color: textColor,
                  fontSize: 16,
                  fontFamily: "Poppins-Medium",
                }}
              >
                {userInfo ? userInfo.name : "...."}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 14,
                  color: textColor,
                  fontFamily: "Poppins-Medium",
                }}
              >
                {userInfo ? userInfo.gender : "...."}
              </Text>
            </View>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              paddingHorizontal: 10,
            }}
          >
            <Text>Status</Text>
            <Text style={{ color: "#4ADE80", textAlign: "center" }}>
              {data && data.status ? exporters(data.status) : "Unknown"}
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: "flex-end" }}>
            <View
              style={{
                alignItems: "center",
                paddingVertical: 10,
                width: "100%",
                justifyContent: "center",
              }}
            >
              {type == "SUBS" ? (
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 14,
                    color: textColor,
                    fontFamily: "Poppins-Medium",
                    textAlign: "center",
                  }}
                >
                  {data.subsData.subscriptionType}{" "}
                  {data ? data.subsData.amount : "0"}৳
                </Text>
              ) : type == "INSTALLMENT" ? (
                <Text
                  numberOfLines={2}
                  style={{
                    fontSize: 14,
                    color: textColor,
                    fontFamily: "Poppins-Medium",
                    textAlign: "center",
                  }}
                >
                  {data.installmentData?.installmentType}{" "}
                  {data
                    ? (
                        data.installmentData?.totalAmount /
                        data.installmentData.installmentCount
                      ).toFixed(2)
                    : "0"}
                  ৳
                </Text>
              ) : (
                <Text
                  style={{
                    fontSize: 14,
                    color: textColor,
                    fontFamily: "Poppins-Medium",
                    textAlign: "center",
                  }}
                >
                  Price {data ? data.amount : "0"}৳
                </Text>
              )}

              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    color: data.paid ? backgroundColor : "red",
                    fontSize: 15,
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  {data && data.paid && data.status != "REFUNDED"
                    ? "Paid"
                    : data && data.paid && data.status == "REFUNDED"
                    ? "Refunded"
                    : "Due"}
                </Text>
                <View style={{ width: 10 }} />
                {type == "SUBS" ||
                  (type == "INSTALLMENT" && (
                    <SvgXml xml={notify} height="15" width={"15"} />
                  ))}
              </View>
              {/* {type=="SUBS"&&(
                <Text numberOfLines={1} style={{
                  color:"#E01A1A",
                  fontSize:14,
                  marginTop:2
                }}>(1 delivery incomplete)</Text>
              )} */}
            </View>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: "#F1EFEF",
            marginLeft: 60,
            marginTop: 10,
          }}
        />
        {open && (
          <Animated.View entering={StretchInY}>
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                    color: textColor,
                    textAlign: "center",
                  }}
                >
                  Service Name
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Poppins-Medium",
                    color: textColor,
                    marginLeft: 15,
                    textAlign: "center",
                  }}
                >
                  Status
                </Text>
              </View>
              <View style={{ flex: 1 }}></View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                justifyContent: "center",
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  paddingHorizontal: 10,
                }}
              >
                <Text
                  numberOfLines={2}
                  style={{
                    color: textColor,
                    fontSize: 14,
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  {data
                    ? data.service.gigs[0].title
                    : "I will give you a best service"}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  paddingHorizontal: 10,
                }}
              >
                <Text style={{ color: "#4ADE80" }}>
                  {data && data.status ? exporters(data.status) : "Unknown"}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <IconButton
                  onPress={() => {
                    if (onPress) {
                      onPress();
                      dispatch({ type: "SET_LIST_SELECTION", playload: [] });
                    }
                  }}
                  Icon={() => (
                    <AntDesign name="right" size={20} color={assentColor} />
                  )}
                  style={{
                    borderWidth: 0,
                    color: "#6366F1",
                    marginTop: -25,
                    backgroundColor: "transparent",
                  }}
                  title={"See More"}
                />
              </View>
            </View>
          </Animated.View>
        )}
      </View>
    </Pressable>
  );
};
const noOrder = `<svg width="101" height="100" viewBox="0 0 101 100" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_4162_49687)">
<path d="M44.6175 0H56.4674C61.0151 0.119415 65.548 0.565964 70.0302 1.33611C73.7198 1.95708 77.3324 2.96341 80.8074 4.33819C84.1538 5.76836 87.2346 7.74238 89.9223 10.1785C91.6823 11.7115 93.2206 13.4769 94.4938 15.425C96.0841 17.943 97.3267 20.6601 98.1884 23.5042C99.0962 26.0716 99.7418 28.7226 100.115 31.4174C100.647 35.1479 100.832 38.9125 100.998 42.6722V57.1625C100.893 61.4674 100.514 65.7616 99.8641 70.0194C99.3545 72.6221 98.6429 75.1819 97.7356 77.6764C96.4499 81.6615 94.2772 85.3107 91.3776 88.3556C88.6931 91.0814 85.5596 93.3357 82.1111 95.0222C78.874 96.4989 75.466 97.5773 71.9635 98.2333C67.2201 99.2069 62.3994 99.7665 57.5569 99.9056C54.4681 100.062 51.3687 99.9486 48.2743 99.9972C43.0612 100.036 37.853 99.6735 32.6967 98.9132C26.9704 97.9208 21.141 96.6021 16.1574 93.5021C12.09 90.9396 8.36513 87.6479 5.94882 83.4715C4.06322 80.2819 2.9358 76.7354 1.90876 73.2028C1.31748 70.9093 0.90906 68.5734 0.687266 66.2167C0.138296 60.9028 0.0161462 55.5472 0 50.2083C0.00561606 45.5049 0.0968771 40.7972 0.471749 36.1069C0.675641 32.6886 1.24032 29.3008 2.15657 25.9986C2.89359 23.3123 3.86604 20.6948 5.06288 18.1757C6.36626 15.5222 8.12782 13.114 10.2683 11.0597C12.9187 8.48611 15.9803 6.3629 19.3298 4.77569C22.643 3.31873 26.1218 2.26226 29.6907 1.62917C34.6092 0.659254 39.6036 0.114146 44.6175 0ZM47.8615 21.1236C44.7997 21.6852 41.9972 23.1938 39.8576 25.4319C37.7181 27.6701 36.352 30.5224 35.9561 33.5778C35.8367 34.8816 35.7971 36.1914 35.8375 37.5C32.9368 37.5139 30.034 37.4806 27.1326 37.5174C26.0825 37.5898 25.098 38.0495 24.3741 38.8055C23.6501 39.5615 23.2394 40.5588 23.2231 41.6C23.2194 51.0444 23.2213 60.4903 23.2287 69.9375C23.324 72.3308 24.3278 74.6006 26.0398 76.2942C27.7519 77.9878 30.0464 78.9808 32.4658 79.075C44.5188 79.0866 56.5725 79.0866 68.6269 79.075C70.5436 79.0345 72.4031 78.4212 73.9609 77.3158C75.5187 76.2103 76.7019 74.6644 77.355 72.8813C78.0261 71.1215 77.8562 69.2167 77.8766 67.3764C77.8728 58.7778 77.8709 50.1785 77.8709 41.5785C77.8381 40.5087 77.3941 39.4917 76.6294 38.7345C75.8648 37.9773 74.8371 37.5371 73.7558 37.5035C70.9239 37.4917 68.0927 37.5035 65.2615 37.4979C65.3268 35.9392 65.2473 34.3777 65.0242 32.8333C64.6796 30.9474 63.9615 29.1474 62.9113 27.5369C61.8611 25.9264 60.4994 24.5371 58.9046 23.4489C57.3098 22.3607 55.5133 21.5951 53.6184 21.1961C51.7235 20.797 49.7675 20.7724 47.8629 21.1236H47.8615Z" fill="#4ADE80"/>
<path d="M45.7344 26.2021C47.1339 25.4871 48.6782 25.0929 50.2528 25.0488C51.8273 25.0047 53.3917 25.3118 54.8299 25.9473C56.2681 26.5827 57.5433 27.5303 58.5609 28.7197C59.5785 29.9091 60.3124 31.3098 60.7082 32.818C61.0332 34.3565 61.1494 35.9311 61.0536 37.5C54.0494 37.5037 47.0462 37.5037 40.0439 37.5C39.9598 36.0055 40.0566 34.5064 40.3324 33.0347C40.6829 31.5784 41.3469 30.2141 42.2792 29.0349C43.2115 27.8557 44.39 26.8894 45.7344 26.2021Z" fill="#4ADE80"/>
<path d="M37.3012 43.8764C37.5859 43.7891 37.8861 43.763 38.1818 43.7997C38.4775 43.8365 38.7619 43.9353 39.0159 44.0895C39.2699 44.2438 39.4877 44.4499 39.6547 44.6941C39.8217 44.9383 39.9341 45.2149 39.9843 45.5055C40.0811 46.5472 39.9702 47.5979 40.0545 48.6409C40.2295 51.111 41.291 53.438 43.0476 55.2021C44.8041 56.9662 47.1401 58.0513 49.6342 58.2618C52.1282 58.4723 54.6163 57.7943 56.6495 56.3501C58.6828 54.9059 60.1275 52.7904 60.723 50.3854C61.1358 48.8576 60.9954 47.2715 61.0445 45.7111C61.083 45.1741 61.332 44.6733 61.7384 44.3154C62.1448 43.9574 62.6765 43.7706 63.2201 43.7948C63.7637 43.819 64.2763 44.0522 64.6485 44.4448C65.0208 44.8374 65.2234 45.3583 65.213 45.8965C65.2671 47.1776 65.242 48.4608 65.1379 49.7389C64.7147 53.0347 63.1643 56.0881 60.7444 58.3919C58.3244 60.6956 55.1806 62.1111 51.8351 62.4031C48.4895 62.6951 45.1437 61.8461 42.3534 59.9971C39.563 58.1481 37.4961 55.4105 36.496 52.2389C35.8976 50.108 35.6791 47.8904 35.8501 45.6854C35.8807 45.2747 36.0354 44.8825 36.2941 44.5599C36.5529 44.2373 36.9038 43.9991 37.3012 43.8764Z" fill="#4ADE80"/>
<path d="M47.863 21.1236C49.7679 20.7723 51.7242 20.797 53.6195 21.1963C55.5147 21.5956 57.3115 22.3616 58.9064 23.4502C60.5013 24.5388 61.863 25.9286 62.913 27.5396C63.9631 29.1506 64.6808 30.9511 65.0249 32.8375C65.2477 34.3813 65.3269 35.942 65.2615 37.5C68.0934 37.5077 70.9246 37.4945 73.7558 37.5056C74.8372 37.5392 75.8649 37.9794 76.6295 38.7366C77.3941 39.4937 77.8381 40.5108 77.871 41.5806C77.885 50.1792 77.8869 58.7785 77.8766 67.3785C77.857 69.2188 78.0268 71.1229 77.355 72.8834C76.7023 74.667 75.5191 76.2134 73.9612 77.3193C72.4032 78.4251 70.5434 79.0387 68.6263 79.0792C56.5732 79.0871 44.5195 79.0871 32.4651 79.0792C30.0458 78.9849 27.7512 77.992 26.0392 76.2984C24.3271 74.6048 23.3234 72.335 23.2281 69.9417C23.2084 60.4972 23.2066 51.0514 23.2225 41.6042C23.2387 40.5629 23.6495 39.5657 24.3734 38.8097C25.0974 38.0537 26.0818 37.594 27.132 37.5215C30.0327 37.4847 32.9355 37.5174 35.8369 37.5042C35.7963 36.1949 35.836 34.8844 35.9555 33.5799C36.3511 30.5238 37.7173 27.6709 39.8573 25.4322C41.9973 23.1936 44.8005 21.6849 47.863 21.1236ZM45.7345 26.2021C44.3892 26.8893 43.2099 27.8557 42.2769 29.0353C41.344 30.2149 40.6796 31.5798 40.329 33.0368C40.0546 34.508 39.9589 36.0064 40.044 37.5C47.0482 37.5037 54.0514 37.5037 61.0537 37.5C61.1497 35.9304 61.0335 34.3552 60.7083 32.816C60.3125 31.3078 59.5786 29.907 58.561 28.7176C57.5434 27.5282 56.2683 26.5807 54.83 25.9452C53.3918 25.3098 51.8274 25.0027 50.2529 25.0468C48.6783 25.0909 47.134 25.4851 45.7345 26.2M37.3012 43.8764C36.905 43.9995 36.5553 44.2374 36.2972 44.5593C36.0391 44.8812 35.8846 45.2723 35.8537 45.682C35.6826 47.887 35.9012 50.1046 36.4996 52.2354C37.4967 55.41 39.5627 58.1511 42.3536 60.0026C45.1446 61.8542 48.4923 62.7047 51.8398 62.4125C55.1872 62.1203 58.3327 60.7031 60.7528 58.3967C63.1728 56.0903 64.7216 53.0337 65.1415 49.7354C65.2455 48.4574 65.2706 47.1742 65.2166 45.8931C65.2269 45.3549 65.0244 44.834 64.6521 44.4414C64.2798 44.0488 63.7673 43.8155 63.2236 43.7914C62.68 43.7672 62.1484 43.954 61.742 44.3119C61.3356 44.6699 61.0866 45.1707 61.0481 45.7077C60.9989 47.2681 61.1386 48.8563 60.7266 50.382C60.1334 52.7895 58.6896 54.9078 56.6558 56.3544C54.622 57.801 52.1323 58.4805 49.6364 58.2702C47.1405 58.0599 44.8028 56.9737 43.0457 55.2077C41.2885 53.4417 40.2276 51.1123 40.0545 48.6403C39.9696 47.5986 40.0805 46.5479 39.9843 45.5049C39.934 45.2143 39.8216 44.9377 39.6546 44.6936C39.4875 44.4495 39.2697 44.2435 39.0157 44.0893C38.7617 43.9352 38.4774 43.8364 38.1817 43.7997C37.8861 43.763 37.5859 43.7891 37.3012 43.8764Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_4162_49687">
<rect width="101" height="100" fill="white"/>
</clipPath>
</defs>
</svg>
`;
