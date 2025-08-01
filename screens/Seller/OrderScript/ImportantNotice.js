import { useIsFocused } from "@react-navigation/native";
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { setHideBottomBar } from "../../../Reducers/hideBottomBar";
import useLang from "../../../Hooks/UseLang";

export default function ImportantNotice({ navigation, route }) {
  const name = route?.params?.name;
  const type = route?.params?.type;
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
    <ScrollView>
      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginTop: 24,
          }}
        >
          <SvgXml xml={light} />
          {vendor ? (
            isBn ? (
              <Text
                style={{
                  marginLeft: 8,
                  color: "#1A1A1A",

                  fontSize: 24,
                  fontWeight: "500",
                  flex: 1,
                }}
              >
                {type == "FAILED"
                  ? `রিফান্ড এর নীতি এবং প্রক্রিয়া`
                  : type == "DELIVERED"
                  ? `সার্ভিস ডেলিভারি করার পর ডেলিভারি নিশ্চিতকরণের নিয়মাবলী`
                  : `ডেলিভারি সময় এবং প্রফাইল রেটিং:`}
              </Text>
            ) : (
              <Text
                style={{
                  marginLeft: 8,
                  color: "#1A1A1A",

                  fontSize: 24,
                  fontWeight: "500",
                  flex: 1,
                }}
              >
                {type == "FAILED"
                  ? `Refund Policy and Process`
                  : type == "DELIVERED"
                  ? `Importance of Proper Delivery Confirmation in Online Transactions`
                  : `Delivery Time and Profile Rating.`}
              </Text>
            )
          ) : isBn ? (
            <Text
              style={{
                marginLeft: 8,
                color: "#1A1A1A",

                fontSize: 24,
                fontWeight: "500",
                flex: 1,
              }}
            >
              {type == "FAILED"
                ? `রিফান্ড এর নীতি এবং প্রক্রিয়া`
                : type == "DELIVERED"
                ? `সার্ভিস বুঝে পেয়ে থাকলে,৭২ ঘণ্টার মধ্যে ( হ্যাঁ আমি বুঝে পেয়েছি ) বুতামে ক্লিক করুন`
                : `একটি পজিটিভ অভিজ্ঞতার জন্য সময়মত ডেলিভারি সংক্রান্ত নোট:`}
            </Text>
          ) : (
            <Text
              style={{
                marginLeft: 8,
                color: "#1A1A1A",

                fontSize: 24,
                fontWeight: "500",
                flex: 1,
              }}
            >
              {type == "FAILED"
                ? `Refund Policy and Process`
                : type == "DELIVERED"
                ? `Product Received? Click 'Yes' Within 72 Hours!`
                : `Regarding timely delivery for a positive experience`}
            </Text>
          )}
        </View>
        {vendor ? (
          <Text
            style={{
              fontSize: 16,

              fontWeight: "400",
              marginTop: 24,
            }}
          >
            {type == "FAILED" ? (
              isBn ? (
                `প্রিয় ${name}, আপনি যদি আপনার সার্ভিস ডেলিভারি করতে অক্ষম হন বা যদি কোনও ক্রেতা সার্ভিসটি বাতিল করার অনুরোধ করে, আমরা সার্ভিসের স্থিতিটিকে "ব্যর্থ" হিসাবে চিহ্নিত করব এবং লেনদেনের সকল অর্থ বিক্রেতার কাছে সম্পূর্ণ ফেরত দিব৷
আমাদের প্রাথমিক লক্ষ্য হল ক্রেতা এবং বিক্রেতা উভয়ের জন্য একটি ন্যায্য এবং বিশ্বস্ত বাজার প্রদান করা এবং আমরা নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ যে সমস্ত লেনদেন সততা ও স্বচ্ছতার সাথে পরিচালিত হয়৷।আমাদের রিফান্ড নীতির বিষয়ে আপনার কোন প্রশ্ন বা কনসার্ন থাকলে, অনুগ্রহ করে আমাদের রিফান্ড নীতি বিভাগ দেখুন৷।`
              ) : (
                `Dear ${name}, If you unable to deliver your service or if a buyer requests to cancel the service, we will mark the service status as "failed" and initiate a full refund to the seller for the amount of the transaction.

Our primary goal is to provide a fair and trustworthy marketplace for both buyers and sellers, and we are committed to ensuring that all transactions are handled with integrity and transparency. If you have any questions or concerns regarding our refund policy, please refer to our Refund Policy section`
              )
            ) : type == "DELIVERED" ? (
              <Text>
                {isBn
                  ? `একটি স্বচ্ছ এবং পেশাদার অনলাইন লেনদেন প্রক্রিয়া নিশ্চিত করতে, বিক্রেতার জন্য "হ্যাঁ, আমি ডেলিভারি করেছি" বোতামে ক্লিক করে সার্ভিসটি সম্পূর্ণ হয়েছে তা নিশ্চিত করা অত্যন্ত গুরুত্বপূর্ণ৷ অনলাইন ডেলিভারির ক্ষেত্রে, বিক্রেতাকে বোতামে ক্লিক করার আগে সমস্ত প্রয়োজনীয় ফাইল আপলোড করতে হবে৷।যাইহোক, ফিজিক্যাল ভাবে সার্ভিস প্রদানের জন্য, কর্মচারী বা শ্রমিককে অবশ্যই ক্রেতার সামনে "হ্যাঁ, আমি পেয়েছি" বোতামে ক্লিক করে তাদের সন্তুষ্টি নিশ্চিত করতে বলতে হবে৷।
ক্রেতা "হ্যাঁ, আমি পেয়েছি" বোতামে ক্লিক করতে ব্যর্থ হলে, বিক্রেতাকে ৭২ ঘন্টার জন্য অপেক্ষা করতে হবে৷। যদি ক্রেতা এখনও এই সময়ের মধ্যে সাড়া না দেয়, তাহলে লেনদেনটি স্বয়ংক্রিয়ভাবে সম্পূর্ণ হিসাবে চিহ্নিত হবে, ধরে নেওয়া হবে যে বিক্রেতা তাদের ডেলিভারি দায়িত্ব যথাযথভাবে পালন করেছেন৷।তা সত্ত্বেও, বিক্রেতার কাছে ডেলিভারির প্রমাণ হিসাবে যথাযথ ডকুমেন্টেশন থাকা অপরিহার্য যাতে ভবিষ্যতে উদ্ভূত কোনো বিবাদ এড়ানো যায়৷`
                  : `To ensure a transparent and professional online transaction process, it's crucial for the seller to confirm the completion of the service by clicking on the "yes, I delivered" button. In the case of online delivery, the seller must upload all the necessary documents before clicking on the button. However, for physical delivery, the employee or labor must ask the buyer to confirm their satisfaction by clicking on the "yes, I received" button in front of the buyer. If the buyer fails to click on the "yes, I received" button, the seller must wait for a period of 72 hours. If the buyer still doesn't respond within this time, the transaction will be automatically marked as complete, assuming that the seller has fulfilled their delivery obligations properly. Nevertheless, it's essential for the seller to have proper documentation as proof of delivery to avoid any disputes that may arise in the future.`}{" "}
              </Text>
            ) : isBn ? (
              `প্রিয় ${name}, আমাদের প্ল্যাটফর্মে একটি ভাল সুনাম বজায় রাখার জন্য সময়মত ডেলিভারি অত্যন্ত গুরুত্বপূর্ণ৷ আপনি যদি নির্দিষ্ট সময়ের মধ্যে অর্ডারটি ডেলিভারি করতে না পারেন, তাহলে আপনি ক্রেতার সাথে যোগাযোগ করুন এবং অতিরিক্ত সময়ের জন্য অনুরোধ করুন৷ যদি ক্রেতা ইতিমধ্যে অর্থ প্রদান করে থাকে এবং আপনি অর্ডারটি সময়মতো ডেলিভারি করতে না পারেন তবে ক্রেতাকে তার সম্পূর্ণ টাকা ফেরত দেওয়া হবে, যা আপনার বিজনেস প্রোফাইল রেটিংয়ে নেগেটিভ প্রভাব ফেলতে পারে৷ আমাদের কমিউনিটির সকল শর্ত এবং নিয়মনীতি বুজে সাহায্য এবং সহযোগিতা করে একটি পজিটিভ অভিজ্ঞতা নিশ্চিত করার জন্য আপনাকে ধন্যবাদ৷`
            ) : (
              `Dear ${name}, please be advised that timely delivery is crucial for maintaining a positive reputation on our platform. If you are unable to deliver the order within the specified timeframe, it is recommended that you communicate with the buyer and request an extension. If the buyer has already paid and you are unable to deliver the order, a refund will be issued to the buyer, which may have a negative impact on your profile rating. Thank you for your understanding and cooperation in ensuring a positive experience for all members of our community.`
            )}
          </Text>
        ) : (
          <Text
            style={{
              fontSize: 16,

              fontWeight: "400",
              marginTop: 24,
            }}
          >
            {type == "FAILED" ? (
              isBn ? (
                `প্রিয় ${name}, আমরা বুঝি যে কখনও কখনও একটি অর্ডার আশানুরূপ হিসাবে ডেলিভারি নাও হতে পারে৷ এই ক্ষেত্রে, আমরা ৭-৩০ কার্যদিবসের মধ্যে আপনার টাকা আপনাকে ফেরত দেব৷ যাইহোক, যদি আপনি এই সময়ের মধ্যে আপনার টাকা ফেরত না পেয়ে থাকেন, তাহলে অনুগ্রহ করে সাহায্যের জন্য আমাদের সহায়তা টিমের সাথে যোগাযোগ করতে দ্বিধাবোধ করবেন না৷ আমরা আত্মবিশ্বাসী যে আমাদের প্ল্যাটফর্মে আপনার একটি সুন্দর অভিজ্ঞতা রয়েছে তা নিশ্চিত করতে আমরা প্রতিশ্রুতিবদ্ধ, এবং আমাদের বোঝার জন্য আপনাকে ধন্যবাদ৷ আরও বিশদ বিবরণের জন্য, অনুগ্রহ করে আমাদের অর্থ ফেরত নীতি বিভাগ দেখুন৷`
              ) : (
                `Dear valued ${name}, we understand that sometimes an order may not be delivered as expected. In such cases, we will refund your payment within 7 working days. However, if you have not received your refund within this time frame, please do not hesitate to contact our support team for further assistance. We are committed to ensuring that you have a seamless experience on our platform, and we thank you for your understanding.`
              )
            ) : type == "DELIVERED" ? (
              isBn ? (
                <Text>
                  আপনার পণ্যটি পাওয়ার পর, অনুগ্রহ করে "হ্যাঁ, আমি বুজে পেয়েছি"
                  বোতামে ক্লিক করুন। 72 ঘন্টার মধ্যে এটি করতে ব্যর্থ হলে আপনার
                  সার্ভিসটি ( বুজে পেয়েছেন ) বলে স্বয়ংক্রিয়ভাবে বিবেচিত হবে।
                  তবে নিশ্চিত থাকুন, এটি হওয়ার আগে আমরা আপনাকে তিনবার আপনার
                  নোটিফিকেশন সেকশনে অবহিত করব। আপনার যদি কোন প্রশ্ন থাকে তাহলে
                  বিনা দ্বিধায়{" "}
                  <Text style={{ color: "#4ADE80" }}>
                    আমাদের সাহায্য এবং সহায়তা টিম
                  </Text>
                  . এর সাথে যোগাযোগ করুন
                </Text>
              ) : (
                <Text>
                  Upon receiving your product, kindly click on the "Yes, I
                  Received" button. Failure to do so within 72 hours will result
                  in an automatic marking of the item as received. Rest assured,
                  we will notify you three times before this happens. For any
                  queries, please feel free to contact our{" "}
                  <Text style={{ color: "#4ADE80" }}>support center</Text>.
                </Text>
              )
            ) : isBn ? (
              `প্রিয় ${name}, আমাদের প্ল্যাটফর্মে একটি পজিটিভ রেপুটেশন বজায় রাখার জন্য সময়মত ডেলিভারি করা অত্যন্ত গুরুত্বপূর্ণ৷ যদি কোনও বিক্রেতা নির্দিষ্ট সময়ের মধ্যে অর্ডার ডেলিভারি করতে না পারে, তবে তারা অতিরিক্ত সময়ের জন্য অনুরোধ করতে পারে, অথবা আপনি একটি সমাধান খুঁজে পেতে তাদেরকে সাহায্য করতে পারেন৷ তাও যদি বিক্রেতা অর্ডারটি ডেলিভারি  করতে না পারে, তাহলে আপনাকে আপনার সম্পূর্ন টাকা ফেরত দেওয়া হবে এবং তার বিজনেস প্রোফাইল রেটিং এর উপর একটি খারাপ প্রভাব পড়তে পারে৷ আমরা আমাদের কমিউনিটির সকল সদস্যের জন্য একটি নিরাপদ এবং পজিটিভ অভিজ্ঞতা নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ, এবং আপনার সহযোগিতার জন্য ধন্যবাদ৷ আমাদের প্ল্যাটফর্ম নির্বাচন করার জন্যও আপনাকে ধন্যবাদ৷।`
            ) : (
              `Dear ${name}, please be advised that timely delivery is crucial for maintaining a positive experience on our platform. If a seller is unable to deliver the order within the specified timeframe, they may request an extension, or you can communicate with them to find a resolution. If the seller is unable to deliver the order, a refund will be issued to you, and their profile rating may be negatively impacted. We are committed to ensuring a safe and positive experience for all members of our community, and we appreciate your cooperation. Thank you for choosing our platform.`
            )}
          </Text>
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
