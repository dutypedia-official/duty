import React, { useCallback, useState } from "react";
import { ScrollView, View, Text, Alert } from "react-native";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import customStyle from "../../../assets/stylesheet";
import { cancelOrderByUser, cancelOrderByVendor } from "../../../Class/service";
import { socket } from "../../../Class/socket";
import ActivityLoader from "../../../components/ActivityLoader";
import IconButton from "../../../components/IconButton";
import ViewMore from "../../../Hooks/ViewMore";
import { styles } from "../../create_dashboard/BusinessTitle";
import TextOp from "../../create_dashboard/TextOp";
import useLang from "../../../Hooks/UseLang";
import ReadMore from "../../../components/ReadMore";

export default function CancelOrderConfirmation({ navigation, route }) {
  const [layoutHeight, setLayoutHeight] = useState();
  const name = route?.params?.name;
  const order = route?.params?.order;
  const [loader, setLoader] = useState(false);
  const user = useSelector((state) => state.user);
  const vendor = useSelector((state) => state.vendor);
  const { language } = useLang();
  const isBn = language == "Bn";

  const cancelTheOrder = useCallback(() => {
    setLoader(true);
    if (vendor) {
      cancelOrderByVendor(user.token, order.id)
        .then((res) => {
          setLoader(false);

          navigation.navigate("VendorOrderDetails", {
            data: order,
            orderId: order?.id,
            type: order.type,
          });
          socket.emit("updateOrder", {
            receiverId: res.data.receiverId,
            order: order,
          });
          socket.emit("updateOrder", {
            receiverId: order.user.id,
            order: order,
          });
          socket.emit("notificationSend", {
            receiverId: res.data.receiverId,
            order: order,
          });
        })
        .catch((err) => {
          setLoader(false);
          Alert.alert(err.response.data.msg);
        });
      return;
    }
    cancelOrderByUser(user.token, order.id)
      .then((res) => {
        setLoader(false);
        navigation.navigate("OrderDetails", {
          data: order,
          orderId: order?.id,
          type: order.type,
        });
        socket.emit("updateOrder", {
          receiverId: res.data.receiverId,
          order: order,
        });
        socket.emit("updateOrder", {
          receiverId: order.user.id,
          order: order,
        });
      })
      .catch((err) => {
        setLoader(false);
        Alert.alert(err.response.data.msg);
      });
  }, []);
  if (loader) {
    return (
      <View style={customStyle.fullBox}>
        <ActivityLoader />
      </View>
    );
  }
  return (
    <ScrollView>
      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 28,
            fontWeight: "400",
            marginTop: 25,
          }}
        >
          {isBn
            ? "আপনি যদি অর্ডারটি বাতিল করতে চান তাহলে নিশ্চিত করুন?"
            : "Please confirm if you wish to cancel this order ?"}
        </Text>
        <IconButton
          onPress={cancelTheOrder}
          style={{
            marginTop: 32,
            height: 38,
          }}
          active={true}
          title={isBn ? "নিশ্চিত করুন" : "Confirm"}
        />
        <View
          style={{
            flexDirection: "row",
            marginTop: 24,
          }}
        >
          <SvgXml xml={light} />
          <Text
            style={{
              marginLeft: 8,
              color: "#1A1A1A",

              fontSize: 24,
              fontWeight: "500",
              flex: 1,
            }}
          >
            {isBn ? "গুরুত্বপূর্ণ ম্যাসেজ" : "Important message"}
          </Text>
        </View>
        {vendor ? (
          <ReadMore
            view={true}
            containerStyle={{
              marginTop: 24,
            }}
            content={
              isBn
                ? `• অর্ডারটি বাতিল হয়ে গেলে আপনার সেলার প্রোফাইলের রেটিং এর উপর নেগেটিভ প্রভাব ফেলতে পারে৷

• আপনি যদি এমন একটি অর্ডার বাতিল করেন যার ইতিমধ্যে পেমেন্ট করা হয়ে গেছে, তখন ক্রেতা রিফান্ডের জন্য অনুরোধ করতে পারে, যার ফলে আপনার আয়ের ক্ষতি হতে পারে৷।
              
• আপনি যদি ঘন ঘন অর্ডার ক্যান্সেল করেন, তাহলে আমাদের নিয়ম ও শর্তাবলী ভঙ্গ হবে যার ফলে আপনার অ্যাকাউন্ট আমাদের টিমের সাথে আলোচনা করে স্থগিত করা হতে পারে৷`
                : `• Cancelling an order may negatively impact your seller rating.
                
• If you cancel an order that has already been paid for, the buyer may request a refund, which can result in a loss of revenue for you.
                
• If you cancel orders frequently, your account may be flagged and reviewed by our team for potential violation of our terms and conditions.`
            }
          />
        ) : (
          <ReadMore
            containerStyle={{
              marginTop: 24,
            }}
            content={
              <Text style={[styles.spText, { marginTop: 0 }]}>
                {isBn
                  ? `প্রিয় ${name}, আমরা বুজতে পারি যে এমন অনেক সময় হতে পারে যখন আপনাকে একটি অর্ডার বাতিল করতে হতে পারে৷। যাইহোক, আমরা অনুরোধ করছি যে আপনি অতিরিক্ত অর্ডার বাতিল  করা থেকে বিরত থাকুন কারণ এটি আমাদের বিক্রেতাদের অসুবিধার কারণ হতে পারে এবং আমাদের প্ল্যাটফর্মে তাদের কর্মক্ষমতা উপর প্রভাব পড়তে পারে৷। অনুগ্রহ করে বিক্রেতার সাথে যোগাযোগ করুন এবং অর্ডার বাতিল করার আগে যেকোনো সমস্যা সমাধানের চেষ্টা করুন৷ আমরা আমাদের কমিউনিটির সকল সদস্যের জন্য একটি পজিটিভ অভিজ্ঞতা নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ এবং আপনার সহযোগিতার জন্য আপনাকে ধন্যবাদ৷`
                  : `Dear ${name}, we understand that there may be times when you need to cancel an order. However, we kindly request that you avoid excessive cancellations as it may cause inconvenience to our sellers and affect their performance on our platform. Please communicate with the seller and try to resolve any issues before requesting to cancel an order. We appreciate your cooperation in ensuring a positive experience for all members of our community. Thank you.`}
              </Text>
            }
          />
        )}
      </View>
    </ScrollView>
  );
}
const light = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="24" height="24" fill="url(#pattern0)"/>
<defs>
<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_3907_26764" transform="scale(0.0078125)"/>
</pattern>
<image id="image0_3907_26764" width="128" height="128" xlink:href="data:image/png;base64,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"/>
</defs>
</svg>
`;
