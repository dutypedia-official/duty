import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable, Linking } from "react-native";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import { serverTimeToLocalDate } from "../../../action";
import customStyle from "../../../assets/stylesheet";
import { getDutyFee } from "../../../Class/service";
import IconButton from "../../../components/IconButton";
import useLang from "../../../Hooks/UseLang";

export default function StatusCart({
  price,
  startDate,
  endDate,
  onPress,
  paid,
  status,
  onMore,
  attachment,
  instruction,
  requestDate,
  onAcceptTime,
  onRejectTime,
  deliveryText,
  deliveryImage,
  onDelivered,
  vendor,
  onCancel,
  type,
  orderedBy,
}) {
  //console.log(status)
  const user = useSelector((state) => state.user);
  const [dutyFee, setDutyFee] = useState();
  const { language } = useLang();
  const isBn = language == "Bn";
  useEffect(() => {
    if (user) {
      getDutyFee(user.token).then((res) => {
        setDutyFee(res.data.fee);
      });
    }
  }, []);
  return (
    <View
      style={{
        paddingHorizontal: 20,
      }}
    >
      <View style={styles.box}>
        <Text style={[styles.medium, { textAlign: "center" }]}>
          {isBn ? "দাম" : "Price"}
        </Text>
        <View
          style={{
            marginTop: 16,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View>
            {type != "STARTING" ? (
              <Text style={styles.small}>
                {isBn ? "পরিষেবার দাম" : "Service price"}
              </Text>
            ) : (
              <Text style={styles.small}>
                {vendor
                  ? isBn
                    ? "ক্রেতার"
                    : "Buyer"
                  : isBn
                  ? "আপনার"
                  : "Your"}{" "}
                {isBn ? "অফার" : "Offer"}
              </Text>
            )}
            <Text style={[styles.small, { marginTop: 8 }]}>
              {isBn ? "ডিউটি ফি" : "Duty fee"} {dutyFee ? dutyFee * 100 : "0"}%
            </Text>
            <Text style={[styles.mediumBold, { marginTop: 16 }]}>
              {vendor
                ? isBn
                  ? "আপনি পাবেন"
                  : "You get"
                : isBn
                ? "সর্বমোট টাকা"
                : "Total pay"}
            </Text>
          </View>
          <View
            style={{
              marginLeft: 32,
              alignItems: "flex-end",
            }}
          >
            <Text style={styles.small}>{price}৳</Text>
            <Text style={[styles.small, { marginTop: 8 }]}>
              {vendor ? "- " : "+ "}
              {(price * (dutyFee ? dutyFee : 1)).toFixed(2)}৳
            </Text>
            <Text style={[styles.mediumBold, { marginTop: 16 }]}>
              {vendor
                ? (price - price * (dutyFee ? dutyFee : 1)).toFixed(2)
                : (price + price * (dutyFee ? dutyFee : 1)).toFixed(2)}
              <Text style={styles.medium}>৳</Text>
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.box}>
        <Text style={styles.medium}>
          {isBn ? "ডেলিভারির তারিখ" : "Delivery date"}
        </Text>
        <View style={[styles.flex, styles.mt16]}>
          <Text style={[styles.small]}>{serverTimeToLocalDate(startDate)}</Text>
          <Text style={[styles.small, styles.ml15]}>
            {isBn ? "থেকে" : "To"}
          </Text>
          <Text style={[styles.small, styles.ml15]}>
            {serverTimeToLocalDate(endDate)}
          </Text>
        </View>
        <View style={[{ alignItems: "flex-end" }, styles.mt16]}>
          <Text
            onPress={onPress}
            style={[styles.small, { textDecorationLine: "underline" }]}
          >
            {isBn ? "ℹ️ ভালভাবে বিস্তারিত পড়ুন" : "Learn more"}
          </Text>
        </View>
      </View>
      <View style={styles.box}>
        <Text style={styles.medium}>
          {isBn ? "পেমেন্ট এর অবস্থা" : "Payment Status"}
        </Text>
        <Text
          style={[
            styles.payText,
            styles.mt16,
            {
              color:
                paid && exporters(status).value != "Failed"
                  ? "#4ADE80"
                  : "#EC2700",
            },
          ]}
        >
          {paid && exporters(status).value != "Failed"
            ? isBn
              ? "পরিশোধ হয়েছে"
              : "Paid"
            : !paid
            ? isBn
              ? "বাকি"
              : "Due"
            : isBn
            ? "টাকা ফেরত দেয়া হয়েছে"
            : "Refund"}
        </Text>
        {exporters(status).value == "Failed" && paid && !vendor && (
          <View style={[{ alignItems: "flex-end" }, styles.mt16]}>
            <Text
              onPress={onMore}
              style={[styles.small, { textDecorationLine: "underline" }]}
            >
              {isBn
                ? "ℹ️  ফেরত নীতি সম্পর্কে বিস্তারিত পড়ুন"
                : "Learn more about refund policy"}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.box}>
        <Text style={styles.medium}>
          {isBn ? "সার্ভিস এর অবস্থা" : "Service Status"}
        </Text>
        {!paid ? (
          <Text
            style={[
              styles.statusText,
              styles.mt16,
              {
                color: vendor
                  ? exportersVendor(status).color
                  : exporters(status).color,
              },
            ]}
          >
            {vendor
              ? status == "CANCELLED"
                ? isBn
                  ? "অর্ডারটি বাতিল করা হয়েছে"
                  : "Cancel"
                : exportersVendor(status).title
              : status == "CANCELLED"
              ? isBn
                ? "অর্ডারটি বাতিল করা হয়েছে"
                : "Cancel"
              : exporters(status).title}
          </Text>
        ) : (
          <Text
            style={[
              styles.statusText,
              styles.mt16,
              {
                color: vendor
                  ? exportersVendor(status).color
                  : exporters(status).color,
              },
            ]}
          >
            {vendor
              ? status == "CANCELLED"
                ? isBn
                  ? "অর্ডারটি সম্পন্ন করতে ব্যর্থ হয়েছে"
                  : "Cancel"
                : exportersVendor(status).title
              : status == "CANCELLED"
              ? isBn
                ? "অর্ডারটি সম্পন্ন করতে ব্যর্থ হয়েছে"
                : "Cancel"
              : exporters(status).title}
          </Text>
        )}
        {!paid && status == "ACCEPTED" && !vendor && (
          <Text
            style={[
              styles.statusText,
              styles.mt16,
              { color: "#7566FF", fontWeight: "400" },
            ]}
          >
            {isBn ? "পেমেন্ট পেন্ডিং আছে" : "Payment pending"}
          </Text>
        )}
        {!paid && status == "ACCEPTED" && vendor && (
          <Text
            style={[
              styles.exSmall,
              styles.mt16,
              { textAlign: "left", fontWeight: "400" },
            ]}
          >
            {isBn
              ? "পেমেন্ট পরিশোধ এর জন্য ম্যাসেজের মাধ্যমে আপনার ক্লায়েন্টের সাথে আলাপ করুন যদি এখনও পেমেন্ট না পেয়ে থাকেন।"
              : "Check with Your client via chat for payment status if not received yet."}
          </Text>
        )}
        {requestDate && status == "PROCESSING" && !vendor && (
          <View style={styles.mt16}>
            <Text style={styles.dpText}>
              <Text style={styles.medium}>*</Text>{" "}
              {isBn
                ? "অতিরিক্ত ডেলিভারি সময় নেয়ার জন্য বিক্রেতা অনুরোধ পাঠিয়েছে।"
                : "Seller Request for Extended Delivery Time"}
            </Text>
            <Text
              style={[
                styles.exSmall,
                styles.mt16,
                { fontSize: 14, color: "#1876F2" },
              ]}
            >
              {isBn ? "অনুরুধের তারিখ" : "Request date"}{" "}
              <Text style={{ color: "#000000" }}>
                {serverTimeToLocalDate(requestDate)}
              </Text>
            </Text>
            <View
              style={[
                { justifyContent: "flex-end", flexDirection: "row" },
                styles.mt16,
              ]}
            >
              <IconButton
                onPress={onRejectTime}
                style={styles.button}
                title={isBn ? "বাতিল করুন" : "Cancel"}
              />
              <View style={{ width: 24 }} />
              <IconButton
                onPress={onAcceptTime}
                active={true}
                style={styles.button}
                title={isBn ? "গ্রহণ করুন" : "Accept"}
              />
            </View>
          </View>
        )}
        {requestDate && status == "PROCESSING" && vendor && (
          <View style={styles.mt16}>
            <Text style={styles.dpText}>
              <Text style={styles.medium}>*</Text>{" "}
              {isBn
                ? "আপনি একটি নতুন ডেলিভারি তারিখ এর জন্য অনুরোধ পাঠিয়েছেন, একবার আপনার ক্লায়েন্ট তারিখটি গ্রহণ করলে, এটি আপনার ডেলিভারির তারিখে যোগ করা হবে।"
                : "You have sent a new delivery date request. Once your client accepts the date, it will be added to your delivery date."}
            </Text>
            <Text
              style={[
                styles.exSmall,
                styles.mt16,
                { color: "#1876F2", fontSize: 14 },
              ]}
            >
              {isBn ? "অনুরুধের তারিখ" : "Request date"}{" "}
              <Text style={{ color: "#000000" }}>
                {serverTimeToLocalDate(requestDate)}
              </Text>
            </Text>
            <View
              style={[
                { flexDirection: "row", justifyContent: "center" },
                styles.mt16,
              ]}
            >
              <Text
                onPress={onCancel}
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  textDecorationLine: "underline",
                }}
              >
                {isBn ? "অনুরুধটি বাতিল করুন" : "Cancel request"}
              </Text>
            </View>
          </View>
        )}
        {status == "DELIVERED" && (
          <View style={[{ alignItems: "flex-end" }, styles.mt16]}>
            <Text
              onPress={onDelivered}
              style={[styles.small, { textDecorationLine: "underline" }]}
            >
              {isBn ? "ℹ️  ডেলিভারির বিষয়ে বিস্তারিত পড়ুন" : "Learn more"}
            </Text>
          </View>
        )}
        {deliveryText || deliveryImage ? (
          <Text style={[styles.medium, { textAlign: "left" }, styles.mt16]}>
            {isBn ? "আপনার সার্ভিস ডেলিভারি ফাইল" : "Delivery file"}
          </Text>
        ) : null}
        {deliveryText && (
          <>
            <Text style={[styles.small, styles.mt16]}>{deliveryText}</Text>
          </>
        )}
        {deliveryImage && (
          <View
            style={[
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              },
              styles.mt16,
            ]}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <SvgXml xml={icon} />
              <Text
                numberOfLines={1}
                style={[styles.small, { marginLeft: 8, flex: 1 }]}
              >
                {deliveryImage.substring(deliveryImage.lastIndexOf("/") + 1)}
              </Text>
            </View>
            <Pressable
              onPress={() => {
                Linking.openURL(deliveryImage);
              }}
              style={{
                marginLeft: 20,
              }}
            >
              <Text style={[styles.small, { color: "#4ADE80" }]}>
                {isBn ? "দেখুন" : "View"}
              </Text>
            </Pressable>
          </View>
        )}
      </View>

      {status == "PROCESSING" && !vendor && (
        <View
          style={{
            paddingVertical: 12,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "violet" }}>
            বিক্রেতা আপনার অর্ডারটি নিয়ে ইতিমধ্যে কাজ শুরু করে দিয়েছে
          </Text>
        </View>
      )}

      {vendor && orderedBy != "VENDOR" ? (
        <View style={[styles.box, { paddingBottom: 0 }]}>
          <Text style={[styles.medium, { textAlign: "left" }]}>
            {isBn ? "কাজের নির্দেশনা" : "Instruction"}
          </Text>
          {instruction ? (
            <>
              <Text style={[styles.small, styles.mt16]}>{instruction}</Text>
            </>
          ) : (
            <Text style={[styles.small, styles.mt16]}>
              {isBn
                ? "কাজের নির্দেশনা দেয়া হয়নি"
                : "No Instruction message found"}
            </Text>
          )}
          {attachment && (
            <View
              style={[
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                },
                styles.mt16,
              ]}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <SvgXml xml={icon} />
                <Text
                  numberOfLines={1}
                  style={[styles.small, { marginLeft: 8, flex: 1 }]}
                >
                  {attachment.substring(attachment.lastIndexOf("/") + 1)}
                </Text>
              </View>
              <Pressable
                onPress={() => {
                  Linking.openURL(attachment);
                }}
                style={{
                  marginLeft: 20,
                }}
              >
                <Text style={[styles.small, { color: "#4ADE80" }]}>
                  {isBn ? "দেখুন" : "View"}
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      ) : (
        <View
          style={
            instruction || attachment
              ? [styles.box, { paddingBottom: 0 }]
              : null
          }
        >
          {!vendor && orderedBy != "VENDOR" && (instruction || attachment) ? (
            <Text style={[styles.medium, { textAlign: "left" }]}>
              {isBn ? "কাজের নির্দেশনা" : "Instruction"}
            </Text>
          ) : null}
          {instruction && !vendor && orderedBy != "VENDOR" && (
            <>
              <Text style={[styles.small, styles.mt16]}>{instruction}</Text>
            </>
          )}
          {attachment && (
            <View
              style={[
                {
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                },
                styles.mt16,
              ]}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <SvgXml xml={icon} />
                <Text
                  numberOfLines={1}
                  style={[styles.small, { marginLeft: 8, flex: 1 }]}
                >
                  {attachment.substring(attachment.lastIndexOf("/") + 1)}
                </Text>
              </View>
              <Pressable
                onPress={() => {
                  Linking.openURL(attachment);
                }}
                style={{
                  marginLeft: 20,
                }}
              >
                <Text style={[styles.small, { color: "#4ADE80" }]}>
                  {isBn ? "দেখুন" : "View"}
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      )}
      <View style={{ height: 36 }} />
    </View>
  );
}
const styles = StyleSheet.create({
  small: {
    fontSize: 14,
    fontWeight: "400",
  },
  medium: {
    fontSize: 20,
    fontWeight: "400",
    textAlign: "center",
  },
  mediumBold: {
    fontWeight: "500",
    fontSize: 20,
  },
  payText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  mt: {
    marginTop: 24,
  },
  box: {
    borderTopColor: "#FAFAFA",
    borderTopWidth: 1,
    paddingTop: 24,
    paddingBottom: 24,
  },
  mt16: {
    marginTop: 16,
  },
  ml15: {
    marginLeft: 15,
  },
  flex: {
    justifyContent: "center",
    flexDirection: "row",
  },
  dpText: {
    fontSize: 16,
    fontWeight: "400",

    color: "#09090A",
  },
  exSmall: {
    fontSize: 12,
    fontWeight: "400",
    textAlign: "center",
  },
  button: {
    height: 30,
    borderColor: "#A3A3A3",
    borderRadius: 4,
  },
});
const icon = `<svg width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.9985 6.79304V26.2499C23.9985 28.3208 22.3197 29.9996 20.2487 29.9996H3.74976C1.67883 29.9996 0 28.3208 0 26.2499V3.75127C0 1.68033 1.67883 0.00150347 3.74976 0.00150347H17.207C17.4061 -0.0111249 17.6133 0.0552595 17.7792 0.22116L23.7788 6.22078C23.9447 6.38668 24.0111 6.59394 23.9985 6.79304ZM16.499 1.50141H3.74976C2.5072 1.50141 1.49991 2.50871 1.49991 3.75127V26.2499C1.49991 27.4924 2.5072 28.4997 3.74976 28.4997H20.2487C21.4913 28.4997 22.4986 27.4924 22.4986 26.2499V7.50103H17.2489C16.8347 7.50103 16.499 7.16527 16.499 6.75108V1.50141ZM17.9989 2.562V6.00113H21.438L17.9989 2.562ZM6.74958 11.9992C6.33539 11.9992 5.99962 11.6635 5.99962 11.2493C5.99962 10.8351 6.33539 10.4993 6.74958 10.4993H17.2489C17.6631 10.4993 17.9989 10.8351 17.9989 11.2493C17.9989 11.6635 17.6631 11.9992 17.2489 11.9992H6.74958ZM6.74958 16.499C6.33539 16.499 5.99962 16.1632 5.99962 15.749C5.99962 15.3348 6.33539 14.9991 6.74958 14.9991H17.2489C17.6631 14.9991 17.9989 15.3348 17.9989 15.749C17.9989 16.1632 17.6631 16.499 17.2489 16.499H6.74958ZM6.74958 20.9987C6.33539 20.9987 5.99962 20.6629 5.99962 20.2487C5.99962 19.8345 6.33539 19.4988 6.74958 19.4988H14.2491C14.6633 19.4988 14.9991 19.8345 14.9991 20.2487C14.9991 20.6629 14.6633 20.9987 14.2491 20.9987H6.74958Z" fill="black"/>
</svg>
`;
const exporters = (key) => {
  const { language } = useLang();
  const isBn = language == "Bn";
  switch (key) {
    case "WAITING_FOR_ACCEPT":
      return {
        title: isBn ? "অনুরুধ পেন্ডিং আছে" : "Request pending",
        value: "Request pending",
        color: "#7566FF",
      };
    case "ACCEPTED":
      return {
        title: isBn ? "সার্ভিসটি গ্রহণ করা হয়েছে" : "Order Accepted",
        value: "Order Accepted",
        color: "#4ADE80",
      };
    case "WAITING_FOR_PAYMENT":
      return {
        title: isBn ? "সার্ভিসটি গ্রহণ করা হয়েছে" : "Order Accepted",
        value: "Order Accepted",
        color: "#4ADE80",
      };
    case "PROCESSING":
      return {
        title: isBn ? "প্রক্রিয়াকরণ হচ্ছে" : "Processing",
        value: "Processing",
        color: "#4ADE80",
      };
    case "DELIVERED":
      return {
        title: isBn ? "ডেলিভারি সম্পন্ন হয়েছে" : "Delivered",
        value: "Delivered",
        color: "#4ADE80",
      };
    case "REFUNDED":
      return {
        title: isBn ? "সার্ভিসটি সম্পন্ন করতে ব্যর্থ হয়েছে" : "Failed",
        value: "Failed",
        color: "#EC2700",
      };
    case "CANCELLED":
      return {
        title: isBn ? "অর্ডারটি বাতিল করা হয়েছে" : "Cancelled Order",
        value: "Failed",
        color: "#EC2700",
      };
    case "COMPLETED":
      return {
        title: isBn ? "অর্ডারটি সফল ভাবে সম্পন্ন হয়েছে" : "Order Completed",
        value: "Delivered",
        color: "#4ADE80",
      };
    default:
      return {
        title: isBn ? "অজানা" : "Unknown",
        value: "Unknown",
        color: "#000000",
      };
  }
};
const exportersVendor = (key) => {
  const { language } = useLang();
  const isBn = language == "Bn";
  switch (key) {
    case "WAITING_FOR_ACCEPT":
      return {
        title: isBn ? "এখনো গ্রহণ করা হয়নি" : "Waiting for accept",
        value: "Waiting for accept",
        color: "#7566FF",
      };
    case "ACCEPTED":
      return {
        title: isBn ? "সার্ভিসটি গ্রহণ করা হয়েছে" : "Order Accepted",
        value: "Order Accepted",
        color: "#7566FF",
      };
    case "WAITING_FOR_PAYMENT":
      return {
        title: isBn ? "টাকা পরিশোধ করা বাকি আছে" : "Payment pending",
        value: "Payment pending",
        color: "#4ADE80",
      };
    case "PROCESSING":
      return {
        title: isBn ? "প্রক্রিয়াকরণ হচ্ছে" : "Processing",
        value: "Processing",
        color: "#4ADE80",
      };
    case "DELIVERED":
      return {
        title: isBn ? "ডেলিভারি সম্পন্ন হয়েছে" : "Delivered",
        value: "Delivered",
        color: "#4ADE80",
      };
    case "REFUNDED":
      return {
        title: isBn ? "সার্ভিসটি সম্পন্ন করতে ব্যর্থ হয়েছে" : "Failed",
        value: "Failed",
        color: "#EC2700",
      };
    case "CANCELLED":
      return {
        title: isBn ? "অর্ডারটি বাতিল করা হয়েছে" : "Cancelled Order",
        value: "Failed",
        color: "#EC2700",
      };
    case "COMPLETED":
      return {
        title: isBn ? "অর্ডারটি সফল ভাবে সম্পন্ন হয়েছে" : "Order Completed",
        value: "Delivered",
        color: "#4ADE80",
      };
    default:
      return {
        title: isBn ? "অজানা" : "Unknown",
        value: "Unknown",
        color: "#000000",
      };
  }
};
