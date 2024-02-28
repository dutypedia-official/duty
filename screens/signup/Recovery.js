import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Text,
  Image,
  Alert,
} from "react-native";
import { SvgXml } from "react-native-svg";
import IconButton from "../../components/IconButton";
import Input from "../../components/Input";
import photo from "../../assets/Images/photo.jpeg";
import { resetUser } from "../../Class/auth";
import customStyle from "../../assets/stylesheet";
import ActivityLoader from "../../components/ActivityLoader";
import useLang from "../../Hooks/UseLang";

export default function Recovery({ navigation, route }) {
  const [number, setNumber] = useState();
  const [error, setError] = useState();
  const [loader, setLoader] = useState(false);
  const { language } = useLang();
  const isBn = language == "Bn";
  const sendOtp = async () => {
    setLoader(true);
    setError();
    try {
      await resetUser(number);
      navigation.navigate("SignUp_2", { number: number, reset: true });
    } catch (error) {
      console.log(error.response?.status);
      if (error.response?.status == 429) {
        Alert.alert(
          isBn
            ? "আপনি অনেকবার রিকুয়েস্ট করেছেন। দয়া করে ২৪ ঘণ্টা পর আবার চেষ্টা করুন।"
            : "Too many request! Please try again after 24 hours."
        );
      } else {
        setError(
          isBn ? "এই নাম্বারে কোন অ্যাকাউন্ট খোলা হয় নাই" : "User not found!"
        );
      }
    } finally {
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          <Image
            width={"100%"}
            style={[
              signUpStyle.mt28,
              {
                height: 253,
                width: "100%",
              },
            ]}
            source={photo}
          />
          <Text style={[signUpStyle.headLine, signUpStyle.mt44]}>
            {isBn ? "আপনার ফোন নাম্বার লিখুন" : "Enter Your Phone Number"}
          </Text>
          <Text style={[signUpStyle.mt8, signUpStyle.text]}>
            {isBn
              ? "আপনার গোপনীয়তা আমাদের কাছে গুরুত্বপূর্ণ৷ নিশ্চিন্ত থাকুন, আপনার নম্বরটি শুধুমাত্র যাচাইকরণের উদ্দেশ্যে ব্যবহার করা হবে৷"
              : "Your privacy is important to us. Rest assured, your number will only be used for verification purposes."}{" "}
          </Text>
          <Input
            error={error}
            keyboardType={"number-pad"}
            value={number}
            onChange={setNumber}
            style={[signUpStyle.input, signUpStyle.mt18]}
            placeholder={"01*********"}
          />
        </View>
      </ScrollView>
      <IconButton
        active={number ? true : false}
        disabled={number ? false : true}
        onPress={() => {
          sendOtp();
        }}
        style={signUpStyle.button}
        title={isBn ? "পরবর্তি" : "Continue"}
      />
    </KeyboardAvoidingView>
  );
}

const signUpStyle = StyleSheet.create({
  mt28: {
    marginTop: 28,
  },
  mt8: {
    marginTop: 8,
  },
  mt44: {
    marginTop: 44,
  },
  mt18: {
    marginTop: 18,
  },
  input: {
    backgroundColor: "#F1F1F1",
    borderRadius: 4,
    borderBottomWidth: 0,
    marginHorizontal: 0,
  },
  headLine: {
    fontSize: 24,
    fontWeight: "700",
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
  },
  button: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
});
