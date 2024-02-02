import { useIsFocused } from "@react-navigation/native";
import React from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { setHideBottomBar } from "../../../Reducers/hideBottomBar";
import useLang from "../../../Hooks/UseLang";

export default function OrderDeliveryRequirements({ navigation, route }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const vendor = useSelector((state) => state.vendor);
  const { language } = useLang();
  const isBn = language == "Bn";
  React.useEffect(() => {
    if (isFocused) {
      //console.log("hidden")
      dispatch(setHideBottomBar(true));
      setTimeout(() => {
        dispatch(setHideBottomBar(true));
      }, 50);
    } else {
      //console.log("seen")
      dispatch(setHideBottomBar(false));
    }
  }, [isFocused]);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          paddingHorizontal: 20,
          paddingBottom: 32,
        }}
      >
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
            {isBn
              ? "ডেলিভারি ডকুমেন্ট আপলোড করার জন্য গুরুত্বপূর্ণ নির্দেশিকা:"
              : "Important Guidelines for Uploading Delivery Documents"}
          </Text>
        </View>
        <Text style={styles.text}>
          {isBn
            ? "ক্রেতার কাছে আপনার সার্ভিস ডেলিভারি করার সময়, ডেলিভারির প্রমাণ হিসাবে সার্ভিস এর সাথে প্রাসঙ্গিক ফাইল আপলোড করা গুরুত্বপূর্ণ৷ এটি উভয় পক্ষের জন্য একটি মসৃণ লেনদেন নিশ্চিত করতে সহায়তা করে এবং সমস্ত অর্ডারের নিরাপত্তা রক্ষা করে৷"
            : "When delivering your service to the buyer, it's important to upload relevant documents as proof of delivery. This helps ensure a smooth transaction for both parties and protects the security of all orders."}
        </Text>
        <Text style={styles.text}>
          {isBn
            ? `স্বচ্ছতা নিশ্চিত করতে এবং সার্ভিস ডেলিভারি প্রমাণ দেয়ার  জন্য, যদি সার্ভিসটি অনলাইনে ডেলিভারি করা হয় তাহলে আমরা আপনাকে অনুরোধ করছি যে আপনি একটি স্ক্রিনশট বা ১০-১৫ সেকেন্ডের একটি ভিডিও রেকর্ডিং নিন৷ গুগল মিট বা জুম-এর মতো প্ল্যাটফর্মের মাধ্যমে পরিচালিত শিক্ষাদানের সেশনের ক্ষেত্রে, অনুগ্রহ করে সেশনের একটি স্ক্রিনশট বা ভিডিও রেকর্ডিং অন্তর্ভুক্ত করুন৷।

উপরন্তু, যদি আপনি অনলাইনে কোনো ফাইল পাঠাতে চান, তাহলে অনুগ্রহ করে ডেলিভারি ইনপুটের ক্ষেত্রে একটি ফাইল লিঙ্ক প্রদান করুন বা ডেলিভারির উপযুক্ত প্রমাণ প্রদান করুন যা আমরা ক্রেতাকে দেখাতে পারি৷ এটি জড়িত সমস্ত পক্ষের জন্য একটি মসৃণ এবং নির্ভরযোগ্য লেনদেন প্রক্রিয়া নিশ্চিত করতে সহায়তা করে৷`
            : "To ensure transparency and provide proof of service delivery, we request that you take a screenshot or a 10-15 second video recording of the service provided if it is being delivered online. In the case of teaching sessions conducted through platforms such as Google Meet or Zoom, please include a screenshot or video recording of the session. In addition, if you need to send any files online, please provide a file link in the delivery input field or provide appropriate proof of delivery that we can show to the buyer. This helps to ensure a smooth and reliable transaction process for all parties involved."}
        </Text>
        <Text style={styles.text}>
          {isBn
            ? 'ফিজিক্যাল ভাবে ডেলিভারি সার্ভিসগুলির জন্য, যেমন হোম সার্ভিস প্রদানের ক্ষেত্রে অনুগ্রহ করে গ্রাহকের সামনে করা কাজের একটি ফটো তুলুন এবং ছবিটিকে একটি ডেলিভারি ফাইল হিসাবে আপলোড করুন৷ ডেলিভারি নিশ্চিত করতে গ্রাহককে "হ্যাঁ, আমি বুজে পেয়েছি" বোতামে ক্লিক করতে বলতে ভুলবেন না৷'
            : 'For physical services, like providing home services, please take a photo of the work done in front of the customer and upload it as a delivery file. Remember to ask the customer to click the "Yes, I received" button to confirm delivery.'}
        </Text>
        <Text style={[styles.text, { color: "#EC2700" }]}>
          {isBn
            ? "ফিজিক্যাল সার্ভিসের জন্য, ডিউটিতে, আমরা পণ্য বা সার্ভিসের ডেলিভারির জন্য কুরিয়ারের মতো তৃতীয় পক্ষের ডেলিভারি সার্ভিসের ব্যবহার কঠোরভাবে নিষিদ্ধ করি৷। আমাদের ব্যবহারকারীদের নিরাপত্তা নিশ্চিত করতে ক্রেতা এবং বিক্রেতাদের মধ্যে সমস্ত লেনদেন অবশ্যই ব্যক্তিগতভাবে, মুখোমুখি হতে হবে৷ অধিকন্তু, একটি নিরাপদ এবং নির্ভরযোগ্য অর্থপ্রদানের প্রক্রিয়া প্রদান করতে, সমস্ত অর্থ প্রদান করতে হবে ডিউটি ​​প্ল্যাটফর্মের মাধ্যমে৷ যদি একজন ক্রেতা বা বিক্রেতা কোনো তৃতীয় পক্ষের ডেলিভারি সার্ভিস ব্যবহার করে এবং পণ্য বা সার্ভিস সম্পর্কিত কোনো সমস্যা অনুভব করে, তাহলে তার কোনো ক্ষতির জন্য ডিউটিকে ​​দায়ী করা যাবে না৷"
            : "For physical services, at Duty, we strictly prohibit the use of any third-party delivery services, such as couriers, for the delivery of products or services. All transactions between buyers and sellers must be conducted in-person, face-to-face, to ensure the safety and security of our users. Furthermore, to provide a secure and reliable payment process, all payments must be made through the Duty platform. If a buyer or seller uses any third-party delivery services and experiences any issues related to the product or service, Duty cannot be held responsible for any damages or losses incurred."}
        </Text>
        <Text style={[styles.text]}>
          {isBn
            ? "এই ধরনের ক্ষেত্রে, ডিউটি ​​যথাযথ ব্যবস্থা নেওয়ার অধিকার সংরক্ষণ করে, যার মধ্যে বিক্রেতার অ্যাকাউন্টের সমাপ্তি এবং কোনও আলোচনা ছাড়াই ক্রেতাকে সম্পূর্ণ অর্থ ফেরত দেওয়া সহ আমরা আমাদের ব্যবহারকারীদের নিরাপত্তাকে অত্যন্ত গুরুত্ব সহকারে নিই এবং আমাদের শর্তাবলীর যেকোনো লঙ্ঘনের প্রতি শূন্য-সহনশীলতা নীতি বজায় রাখি৷ অনুগ্রহ করে কোনো জাল বা ভুল পণ্য পাঠানো থেকে বিরত থাকুন কারণ এটি গ্রাহককে অসন্তুষ্টির দিকে নিয়ে যেতে পারে এবং আমাদের প্ল্যাটফর্মে আপনার সুনামের ক্ষতি করতে পারে৷। যদি আমরা দেখতে পাই যে আপনি ইচ্ছাকৃতভাবে জাল পণ্য পাঠিয়েছেন, আমরা কোনো রকমের আলোচনা ছাড়াই আপনার অ্যাকাউন্ট বন্ধ করার অধিকার সংরক্ষণ করি৷"
            : "In such cases, Duty reserves the right to take appropriate action, including the termination of the seller's account and the refunding of the full amount to the buyer without any discussion. We take the safety and security of our users very seriously and maintain a zero-tolerance policy towards any violation of our terms. Please refrain from sending any fake or incorrect products as it can lead to customer dissatisfaction and harm your reputation on our platform. If we find that you have intentionally sent fake products, we reserve the right to terminate your account without discussion."}
        </Text>
        <Text style={[styles.text]}>
          {isBn
            ? "আপনার পণ্যগুলিকে ডেলিভারির জন্য পাঠানোর আগে অনুগ্রহ করে বার বার চেক করে দেখুন যাতে গ্রাহক আশানুরূপ তাদের অর্ডার পান৷ অনুগ্রহ করে আমাদের"
            : "Please double-check your products and their condition before sending them out for delivery to ensure that the customer receives their order as expected.please refer to our"}{" "}
          <Text
            onPress={() => {
              navigation.navigate("WebViewsGlobal", {
                url: "https://duty.com.bd/legal/order-policy",
                title: "Order Policy",
              });
            }}
            style={{ color: "#4ADE80" }}
          >
            অর্ডার এবং ডেলিভারি নীতি বিভাগটি পড়ুন৷
          </Text>
        </Text>
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
const styles = StyleSheet.create({
  text: {
    fontSize: 16,

    fontWeight: "400",
    marginTop: 24,
  },
});
