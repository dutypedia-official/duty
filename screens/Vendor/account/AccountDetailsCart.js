import React from "react";
import { View, Text, StyleSheet } from "react-native";
import IconButton from "../../../components/IconButton";
import useLang from "../../../Hooks/UseLang";

export default function AccountDetailsCart({
  onWithdraw,
  totalEarnings,
  amount,
  pendingAmount,
}) {
  const { language } = useLang();
  const isBn = language == "Bn";
  return (
    <View
      style={{
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "#E6E6E6",
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={styles.smallText}>
            {isBn ? "বর্তমান ব্যালেন্স" : "Available Amount"}
          </Text>
          <Text style={styles.largeText}>{amount}৳</Text>
        </View>
        <View
          style={{
            alignItems: "flex-end",
          }}
        >
          <Text style={styles.smallText}>
            {isBn ? "সর্বমোট আয়" : "Total Earnings"}
          </Text>
          <Text style={styles.largeText}>{totalEarnings}৳</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 26,
        }}
      >
        <View>
          <Text style={styles.smallText}>
            {isBn ? "পেন্ডিং ব্যালেন্স" : "Pending Amount"}
          </Text>
          <Text style={styles.largeText}>{pendingAmount?.toFixed(2)}৳</Text>
        </View>
        <IconButton
          onPress={onWithdraw}
          style={{
            width: 100,
            height: 40,
            fontFamily: "Poppins-Medium",
          }}
          title={isBn ? "উত্তোলন" : "Withdraw"}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  largeText: {
    fontSize: 24,
    fontFamily: "Poppins-SemiBold",
  },
  smallText: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
  },
});
