import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Alert,
  RefreshControl,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  getMemberId,
  getSubsOrderById,
  cancelRequestDate,
} from "../../Class/service";
import IconButton from "./../../components/IconButton";
import { convertServerFacilities } from "../../Class/dataConverter";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { wait } from "../../action";
import { socket } from "../../Class/socket";
import { SafeAreaView } from "react-native-safe-area-context";
import InfoCart from "../Seller/OrderScript/InfoCart";
import OrderInfo from "../Seller/OrderScript/OrderInfo";
import StatusCart from "../Seller/OrderScript/StatusCart";
import ReceiptSkeleton from "../../components/ReceiptSkeleton";
import useLang from "../../Hooks/UseLang";
import ActivityLoader from "../../components/ActivityLoader";

const OrderDetails = ({ navigation, route }) => {
  const orderId = route?.params?.orderId;
  const dispatch = useDispatch();
  const { language } = useLang();
  const isBn = language == "Bn";
  const initialState = [
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
  ];
  const user = useSelector((state) => state.user);
  const [ListData, setListData] = React.useState([]);
  const [Facilities, setFacilities] = React.useState([]);
  const ListSelection = useSelector((state) => state.ListSelection);
  const [ServiceError, setServiceError] = React.useState();
  const [FacilitiesError, setFacilitiesError] = React.useState();
  const ref = React.useRef();
  const [Loader, setLoader] = React.useState(false);
  const vendor = useSelector((state) => state.vendor);
  const [data, setData] = React.useState();
  //console.log(data.type);
  const orderSocket = useSelector((state) => state.orderSocket);
  const [MemberId, setMemberId] = React.useState();
  const [refreshing, setRefreshing] = useState(false);
  const { width, height } = Dimensions.get("window");
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setServiceError();
    setFacilitiesError();
    if (!data || !data?.selectedServices) {
      setListData([]);
      dispatch({ type: "SET_LIST_SELECTION", playload: [] });
    }
    if (!data?.facilites) {
      setFacilities([]);
    }
    wait(1000).then(() => setRefreshing(false));
  }, []);
  const isFocused = useIsFocused();

  //console.log(subsOrder)

  useFocusEffect(
    React.useCallback(() => {
      return setListData(ListSelection);
    }, [ListSelection])
  );
  useEffect(() => {
    if (orderId && isFocused) {
      setLoader(true);
      dataLoader(orderId);
    } else {
      setLoader(false);
    }
  }, [orderId, refreshing, isFocused]);
  React.useEffect(() => {
    //console.log(data.selectedServices);
    //console.warn(subsOrder)
    if (data) {
      //console.log(data.selectedServices)
      setListData(data.selectedServices);
    }
    if (
      data &&
      data.facilites &&
      Array.isArray(data.facilites.selectedOptions)
    ) {
      setFacilities(convertServerFacilities(data.facilites));
    } else if (data && Array.isArray(data.facilites)) {
      setFacilities(data.facilites);
    }
    if (data && data.type == "PACKAGE") {
      setFacilities(data.selectedPackage?.features);
    }
    //console.log(data.selectedPackage)
  }, [data]);
  const validate = () => {
    setServiceError(null);
    setFacilitiesError(null);
    if (data.type == "ONETIME") {
      navigation.navigate("AcceptOrder", {
        facilities: Facilities,
        id: data.id,
        data: data,
      });
      return;
    }
    // if (ListSelection.length == 0) {
    //   Alert.alert("*There at list one service required");

    //   return;
    // }
    if (ListData.length == 0) {
      setServiceError(
        isBn
          ? "*এখানে অন্তত একটি সার্ভিস অ্যাড করা আবশ্যক"
          : "*There at list one service required"
      );
      ref?.current?.scrollTo({ y: 200 });
      return;
    }

    navigation.navigate("AcceptOrder", {
      facilities: Facilities,
      id: data.id,
      data: data,
      skills: ListData,
    });
  };
  React.useState(() => {
    //console.log("------")
    //console.warn(data.user.id)
    //console.log(vendor.service.id)
    if (data) {
      getMemberId(user.token, vendor.service.id, data.user.id)
        .then((res) => {
          setMemberId(res.data.member);
          //console.log(res.data);
        })
        .catch((err) => {
          console.log(err.response.data.msg);
        });
    }
  }, [orderSocket, data]);

  const dataLoader = async (id) => {
    try {
      setLoader(true);
      const res = await getSubsOrderById(user.token, id);
      setData(res.data.order);
    } catch (err) {
      setLoader(false);
      console.error(err.message);
    } finally {
      setLoader(false);
    }
  };
  React.useEffect(() => {
    socket.on("updateOrder", () => {
      if (orderId) {
        dataLoader(orderId);
      }
    });
    return () => {
      socket?.off("updateOrder");
    };
  }, []);

  const addService = () => {
    setServiceError();
    const gigs = data.service.gigs.filter((d) => d.type == "STARTING");

    navigation.navigate("AddServiceList", {
      skills: gigs[0].skills,
      category: vendor?.service?.category,
      facilites: gigs[0].facilites.selectedOptions,
      setListData: setListData,
      name: "VendorOrderDetails",
      data: data,
      setFacilities: setFacilities,
      facilities: true,
    });
  };
  const cancelRequest = async () => {
    //const res=
    setLoader(true);
    try {
      await cancelRequestDate(user.token, data.id);
      socket.emit("updateOrder", {
        receiverId: data.user.id,
        order: data,
      });
      socket.emit("updateOrder", {
        receiverId: user.user.id,
        order: data,
      });
    } catch (err) {
      setLoader(false);
      Alert.alert(err.message);
    } finally {
      setLoader(false);
    }
  };
  //console.log(data?.agreement)

  if (Loader || !data) {
    // return <ReceiptSkeleton />;
    return (
      <View
        style={{
          height: height,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityLoader />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              //setPageChange(true);
              setLoader(true);
              onRefresh();
            }}
          />
        }
        ref={ref}
        showsVerticalScrollIndicator={false}
      >
        <InfoCart
          vendor={true}
          onClick={() => {
            navigation.navigate("UserProfile", {
              user: {
                user: data.user,
                userId: data.user.id,
              },
            });
          }}
          onMessage={() => {
            let newUser = {
              userId: data.user.id,
              user: data.user,
            };
            //createConversation()
            navigation.navigate("ChatScreen", {
              data: {
                users: [newUser],
              },
              username: data.user.username,
              serviceId: data?.service?.id,
            });
          }}
          onAgreement={() => {
            navigation.navigate("ServiceAgreement", { data: data?.agreement });
          }}
          paid={data?.paid}
          username={data?.user.username}
          uri={data?.user?.profilePhoto}
          name={`${data?.user?.name}`}
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {initialState.filter((d) => d.type.match(data.type))[0].title}{" "}
            {data?.type == "PACKAGE"
              ? `- ${data?.selectedPackage?.name}`
              : isBn
              ? "সার্ভিস"
              : "service"}
          </Text>
        </View>
        <OrderInfo
          vendor={true}
          title={data?.gigTitle}
          facilities={Facilities}
          services={ListData}
          orderId={data?.id}
          date={data?.createdAt}
          onAddService={addService}
          status={data?.status}
          serviceError={ServiceError}
          type={data?.type}
        />
        <StatusCart
          vendor={true}
          onPress={() => {
            navigation.navigate("ImportantNotice", {
              name: `${user?.user?.name}`,
            });
          }}
          price={data?.offerPrice ? data?.offerPrice : data?.amount}
          paid={data?.paid}
          status={data?.status}
          onMore={() => {
            navigation.navigate("ImportantNotice", {
              name: `${user?.user?.name} ${user?.user?.lastName}`,
              type: "FAILED",
            });
          }}
          onDelivered={() => {
            navigation.navigate("ImportantNotice", {
              name: `${user?.user?.name}`,
              type: "DELIVERED",
            });
          }}
          requestDate={data?.requestedDeliveryDate}
          instruction={data?.description}
          attachment={data?.attachment}
          startDate={data?.deliveryDateFrom}
          endDate={data?.deliveryDateTo}
          onAcceptTime={() => timeRequest(true)}
          onRejectTime={() => timeRequest(false)}
          deliveryText={data?.proofText}
          deliveryImage={data?.proofImage}
          onCancel={cancelRequest}
          type={data?.type}
          orderedBy={data?.orderedBy}
        />
        {data?.status == "ACCEPTED" && (
          <Text style={[styles.font, { marginBottom: 8, color: "#4ADE80" }]}>
            {isBn ? "অর্ডারটি গ্রহণ হয়েছে" : "Order accepted"}
          </Text>
        )}
        {data?.status == "DELIVERED" ||
          (data?.status == "COMPLETED" && (
            <Text style={[styles.font, { marginBottom: 32, color: "#4ADE80" }]}>
              {isBn ? "অর্ডারটি সফলভাবে সম্পন্ন হয়েছে" : "Completed"}
            </Text>
          ))}
        {data?.cancelledBy ? (
          <Text style={styles.font}>
            {data.cancelledBy == "USER"
              ? isBn
                ? "ক্রেতা অর্ডারটি বাতিল করেছে"
                : "Buyer canceled this order"
              : isBn
              ? "আপনি অর্ডারটি বাতিল করেছেন"
              : "You cancelled the order"}
          </Text>
        ) : !data.cancelledBy && exporters(data?.status).title == "Failed" ? (
          <Text style={styles.font}>
            {isBn
              ? "ডেলিভারির তারিখ অতিক্রম হয়েছে"
              : "Delivery date has expired"}
          </Text>
        ) : (
          <></>
        )}
        {data?.status == "WAITING_FOR_ACCEPT" && (
          <IconButton
            onPress={validate}
            active={true}
            style={[styles.button, { marginBottom: 0 }]}
            title={isBn ? "অর্ডারটি গ্রহণ করুন" : "Accept order"}
          />
        )}
        {data?.status == "PROCESSING" && (
          <View>
            {isBn ? (
              <Text
                style={[
                  styles.text,
                  { marginBottom: 12, marginHorizontal: 20, textAlign: "left" },
                ]}
              >
                <Text style={{ color: "red" }}>
                  যদি সার্ভিসটি সম্পন্ন করে থাকেন তাহলে ডেলিভারির আগে গ্রাহকের
                  সাথে ভালভাবে আলাপ করুন এবং সার্ভিসটির সম্পূর্ণ অথবা কিছু অংশ
                  ভালভাবে চেক করতে বলুন, যাতে ডেলিভারির পরে আপনার গ্রাহকের কোনও
                  দ্বিমত না থাকে।
                  {"\n"}
                </Text>{" "}
                আর আপনি যদি ইতিমধ্যে আপনার অর্ডারটি ডেলিভারি করে থাকেন অথবা করতে
                চান, তবে হ্যাঁ আমি ডেলিভারি করেছি বুতামে ক্লিক করুন
              </Text>
            ) : (
              <Text
                style={[
                  styles.text,
                  { marginBottom: 12, marginHorizontal: 20, textAlign: "left" },
                ]}
              >
                Before delivering the service, talk to the customer and ask them
                to check it carefully. This helps avoid disagreements after
                delivery. Click{" "}
                <Text style={{ color: "#4CD964" }}>yes i delivered</Text> if you
                already delivered your order
              </Text>
            )}
            <IconButton
              onPress={() => {
                navigation.navigate("OrderDelivery", { order: data });
              }}
              active={true}
              style={[styles.button, { marginBottom: 0 }]}
              title={isBn ? "হ্যাঁ আমি ডেলিভারি করেছি" : "Yes I delivered"}
            />
          </View>
        )}
        {data?.status == "PROCESSING" && !data.requestedDeliveryDate && (
          <IconButton
            onPress={() => {
              navigation.navigate("NeedExtraTIme", { data: data });
            }}
            style={[styles.button, { marginTop: 12, marginBottom: 0 }]}
            title={isBn ? "অতিরিক্ত সময় প্রয়োজন" : "Need extra time"}
          />
        )}
        {data?.status == "WAITING_FOR_ACCEPT" ||
        data?.status == "ACCEPTED" ||
        data?.status == "PROCESSING" ? (
          <IconButton
            onPress={() => {
              navigation.navigate("CancelOrderConfirmation", {
                order: data,
                name: `${user?.user?.name}`,
              });
            }}
            style={[styles.button, { marginTop: 12 }]}
            title={isBn ? "অর্ডারটি বাতিল করুন" : "Cancel order"}
          />
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    fontWeight: "400",
  },
  textContainer: {
    justifyContent: "center",
    flexDirection: "row",
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: "#FAFAFA",
  },
  button: {
    borderWidth: 1,
    borderColor: "#D1D1D1",
    borderRadius: 4,
    height: 40,
    marginHorizontal: 20,
    marginBottom: 32,
  },
  font: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 32,
    color: "#EC2700",
  },
});
export default OrderDetails;
const exporters = (key) => {
  switch (key) {
    case "WAITING_FOR_ACCEPT":
      return {
        title: "Request pending",
        color: "#7566FF",
      };
    case "ACCEPTED":
      return {
        title: "Order Accepted",
        color: "#4ADE80",
      };
    case "WAITING_FOR_PAYMENT":
      return {
        title: "Order Accepted",
        color: "#4ADE80",
      };
    case "PROCESSING":
      return {
        title: "Processing",
        color: "#4ADE80",
      };
    case "DELIVERED":
      return {
        title: "Delivered",
        color: "#4ADE80",
      };
    case "REFUNDED":
      return {
        title: "Failed",
        color: "#EC2700",
      };
    case "CANCELLED":
      return {
        title: "Failed",
        color: "#EC2700",
      };
    case "COMPLETED":
      return {
        title: "Completed",
        color: "#4ADE80",
      };
    default:
      return {
        title: "Unknown",
        color: "#000000",
      };
  }
};
