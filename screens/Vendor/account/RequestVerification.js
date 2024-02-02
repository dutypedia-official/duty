import { useIsFocused } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import { useDispatch } from "react-redux";
import IconButton from "../../../components/IconButton";
import { setHideBottomBar } from "../../../Reducers/hideBottomBar";
import DVDVD from "../../../assets/Images/DVDVD.png";
import useLang from "../../../Hooks/UseLang";
const { width, height } = Dimensions.get("window");

export default function RequestVerification({ navigation }) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const { language } = useLang();
  const isBn = language == "Bn";

  React.useEffect(() => {
    if (isFocused) {
      // dispatch(setHideBottomBar(true));
    } else {
      //dispatch(setHideBottomBar(false));
    }
    setTimeout(() => {
      // dispatch(setHideBottomBar(true));
    }, 5);
  }, [isFocused]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginTop: 28,
            marginBottom: 32,
            paddingHorizontal: 28,
          }}
        >
          <Image
            source={DVDVD}
            style={{
              width: width - 56,
              height: 230,
            }}
          />
          <Text
            style={{
              color: "#09090A",
              fontSize: 24,
              fontWeight: "400",

              marginTop: 28,
            }}
          >
            {isBn
              ? "টাকা উত্তোলন করার আগে আপনার অ্যাকাউন্ট ভেরিফাই করুন"
              : "Verify Your Account Before Withdrawing Funds"}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",

              marginTop: 28,
              color: "#484848",
            }}
          >
            {isBn
              ? "আমাদের প্ল্যাটফর্ম থেকে তহবিল উত্তোলন করার জন্য আপনাকে ধন্যবাদ। আপনার অ্যাকাউন্টের নিরাপত্তা নিশ্চিত করার জন্য, আমরা সমস্ত ব্যবহারকারীদের যেকোনো টাকা উত্তোলন অনুরোধ প্রক্রিয়া করার আগে তাদের পরিচয় যাচাই করতে চাই। যাচাইকরণ প্রক্রিয়া সম্পূর্ণ করার জন্য অনুগ্রহ করে কিছুক্ষণ সময় নিন। এটি আমাদের নিশ্চিত করবে যে আপনি অনুমোদিত অ্যাকাউন্ট ধারক। একবার আপনার অ্যাকাউন্ট যাচাই করা হয়ে গেলে, আপনি আপনার টাকা উত্তোলনের অনুরোধটি সম্পূর্ণ করতে সক্ষম হবেন। আপনার অ্যাকাউন্ট সুরক্ষিত রাখতে আপনার বিচারবুদ্ধি এবং সহযোগিতার জন্য আপনাকে ধন্যবাদ৷"
              : "Thank you for choosing to withdraw funds from our platform. To ensure the security of your account, we require all users to verify their identity before processing any withdrawal requests. Please take a moment to verify your account by completing the verification process. This will allow us to confirm that you are the authorized account holder and prevent any unauthorized withdrawals. Once your account has been verified, you will be able to complete your withdrawal request. Thank you for your understanding and cooperation in keeping your account secure."}
          </Text>
          <IconButton
            onPress={() => {
              navigation.navigate("FirstStepVerification");
            }}
            style={{
              height: 44,
              backgroundColor: "#4ADE80",
              color: "#ffffff",
              borderRadious: 4,
              marginTop: 28,
            }}
            title={isBn ? "ভেরিফাই করুন" : "Verify now"}
          />
          <IconButton
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              height: 44,
              borderRadious: 4,
              marginTop: 12,
              borderColor: "#E6E6E6",
            }}
            title={isBn ? "বাদ দিন" : "Cancel"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
