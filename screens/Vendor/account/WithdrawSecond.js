import React, { useState } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  Linking,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
import customStyle from "../../../assets/stylesheet";
import { requestWithdraw } from "../../../Class/service";
import ActivityLoader from "../../../components/ActivityLoader";
import IconButton from "../../../components/IconButton";
import Input from "../../../components/Input";
import { CheckBox } from "../../Seller/Pricing";
import useLang from "../../../Hooks/UseLang";

export default function WithdrawSecond({ navigation, route }) {
  const [amount, setAmount] = useState();
  const [check, setCheck] = useState(false);
  const [amountError, setAmountError] = useState();
  const [checkError, setCheckError] = useState();
  const data = route?.params?.data;
  const [loader, setLoader] = useState(false);
  const user = useSelector((state) => state.user);
  const vendor = useSelector((state) => state.vendor);
  const { language } = useLang();
  const isBn = language == "Bn";
  const save = async () => {
    setAmountError();
    setCheckError();
    if (!amount) {
      setAmountError(isBn ? "*টাকার পরিমাণ আবশ্যক" : "*Amount is required");
      return;
    }
    if (parseInt(amount) > parseInt(data?.amount)) {
      setAmountError(
        isBn
          ? "*অনুরোধকৃত পরিমাণ অবশ্যই উত্তোলনের পর্যাপ্ত টাকার পরিমাণের সমান বা কম হতে হবে।"
          : "*The requested amount must be equal to or less than the available amount."
      );
      return;
    }
    if (parseInt(amount) < 500) {
      setAmountError(
        isBn
          ? "সর্বনিম্ন ৫০০ টাকা তুলতে পারবেন"
          : "*Minimum request amount 500BDT"
      );
      return;
    }
    if (!check) {
      Alert.alert("", "Accept terms and conditions");
      return;
    }
    setLoader(true);
    try {
      await requestWithdraw(user.token, {
        amount: Number(amount),
        serviceId: vendor.service.id,
      });
      setLoader(false);
      navigation.navigate("WithdrawFinal");
    } catch (err) {
      Alert.alert(err.code, err.message);
      console.error(err.message);
      setLoader(false);
    }
  };
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
        <Text style={[styles.gap1, styles.smallText]}>
          {isBn ? "উত্তোলনের জন্য পর্যাপ্ত টাকা আছে" : "Available for withdraw"}{" "}
          <Text
            style={{
              fontWeight: "500",
            }}
          >
            {data?.amount}
          </Text>
          ৳
        </Text>
        <Text style={[styles.gap1]}>
          {isBn ? "টাকার পরিমাণ লিখুন" : "Enter amount"}
        </Text>
        <Input
          error={amountError}
          value={amount}
          onChange={setAmount}
          placeholder={"0.00"}
          keyboardType={"number-pad"}
          style={styles.input}
        />
        <View
          style={{
            flexDirection: "row",
            marginVertical: 20,
          }}
        >
          <CheckBox value={check} onChange={() => setCheck((v) => !v)} />
          {isBn ? (
            <Text style={styles.extraSmall}>
              আমি ডিউটির{" "}
              <Text
                onPress={() => {
                  Linking.openURL("https://duty.com.bd");
                }}
                style={{
                  textDecorationLine: "underline",
                  color: "#7566FF",
                }}
              >
                উত্তোলন
              </Text>{" "}
              এর নীতির সাথে একমত
            </Text>
          ) : (
            <Text style={styles.extraSmall}>
              I accept all the{" "}
              <Text
                onPress={() => {
                  Linking.openURL("https://duty.com.bd");
                }}
                style={{
                  textDecorationLine: "underline",
                  color: "#7566FF",
                }}
              >
                terms and conditions
              </Text>{" "}
              of the duty.
            </Text>
          )}
        </View>
        <IconButton
          active={amount && check ? true : false}
          onPress={() => {
            save();
          }}
          title={isBn ? "উত্তোলনের জন্য অনুরোধ পাঠান" : "Send withdraw request"}
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#000000",
    marginHorizontal: 0,
    marginTop: 8,
  },
  largeFont: {
    fontSize: 16,
    fontWeight: "600",
  },
  gap1: {
    marginTop: 20,
  },
  gap2: {
    marginTop: 8,
  },
  smallText: {
    fontSize: 16,
  },
  extraSmall: {
    fontSize: 14,
  },
  radio: {
    marginVertical: 4,
  },
});
