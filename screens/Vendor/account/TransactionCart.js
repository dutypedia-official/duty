import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  convertDate,
  dateConverter,
  serverTimeToLocal,
  serverTimeToLocalDate,
} from "../../../action";
import Avatar from "../../../components/Avatar";
import { types } from "./types";
import useLang from "../../../Hooks/UseLang";

export default function TransactionCart({ data }) {
  const { language } = useLang();
  const isBn = language == "Bn";
  //console.log(data)
  return (
    <View style={styles.container}>
      <View style={styles.flexBox}>
        {isBn ? (
          <Text style={styles.smallText}>
            {data && types.filter((d) => d.type.match(data.type))[0]?.titleBn}
          </Text>
        ) : (
          <Text style={styles.smallText}>
            {data && types.filter((d) => d.type.match(data.type))[0].title}
          </Text>
        )}
        <Text style={styles.smallText}>
          {data && serverTimeToLocalDate(data?.createdAt)}
        </Text>
      </View>
      <View style={styles.flexBox}>
        <View style={styles.flexBox}>
          <Avatar style={{ width: 30, height: 30, margin: 4 }} />
          <View>
            <Text style={[styles.textLarge, { fontWeight: "700" }]}>
              {data && `${data.user.name}`}
            </Text>
            <Text style={styles.smallText}>
              @{data && `${data.user.username}`}
            </Text>
          </View>
        </View>
        <View
          style={{
            alignItems: "flex-end",
          }}
        >
          {data?.type == "STARTING" ? (
            <Text style={styles.textLarge}>
              {data && `${data.offerPrice - data.offerPrice * data.dutyFee}`}৳
            </Text>
          ) : (
            <Text style={styles.textLarge}>
              {data && `${data.amount - data.amount * data.dutyFee}`}৳
            </Text>
          )}
          <Text style={styles.smallText}>{data && exporters(data.status)}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 94,
    marginVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    padding: 8,
  },
  textLarge: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    color: "#484848",
  },
  smallText: {
    fontSize: 12,
    color: "#484848",
  },
  flexBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
});
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
