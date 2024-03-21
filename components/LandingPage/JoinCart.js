import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
const { width, height } = Dimensions.get("window");
import { LinearGradient } from "expo-linear-gradient";
import { rotate, translate } from "@shopify/react-native-skia";
import IconButton from "../IconButton";
import useLang from "../../Hooks/UseLang";

export default function JoinCart({ style, onJoin, colors, onClick }) {
  const { language } = useLang();
  const isBn = language == "Bn";
  return (
    <View
      style={[
        {
          backgroundColor: "green",
          borderRadius: 23,
          marginHorizontal: 20,
          overflow: "hidden",
          marginVertical: 20,
        },
        style,
      ]}
    >
      <LinearGradient
        // Background Linear Gradient
        colors={colors ? colors : ["#0BAB54", "#3BB6B7"]}
        style={styles.container}
        end={{ x: 0.9, y: 0.2 }}
      >
        <Text style={styles.text1}>
          {isBn ? "আপনিও সেবা দিয়ে আয় করুন" : "Grow your business in one month"}
        </Text>
        <Text style={[styles.text2]}>
          {isBn
            ? "নিজের যে কোন দক্ষতা কে কাজে লাগিয়ে ঘরে বসে আয় করুন!  আয় শুরু করতে আমাদের ডিউটি প্ল্যাটফর্মে ব্যবসায়ি অ্যাকাউন্ট খুলে যোগ দিন এবং নিজের সেবাকে সারা বাংলাদেশে পৌঁছে দিন"
            : "Revamp your biz! Join our BD platform for 100% growth in 1 month. Boost sales, expand effortlessly & achieve success"}
        </Text>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <IconButton
            onPress={onClick}
            style={styles.button}
            title={isBn ? "একটি ব্যবসায়িক অ্যাকাউন্ট খুলুন" : "Join now"}
          />
        </View>
      </LinearGradient>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  text1: {
    fontSize: 20,
    color: "white",
    fontWeight: "800",
    width: "100%",
    letterSpacing: width < 380 ? -1.2 : 0,
    lineHeight: 38,
  },
  text2: {
    fontSize: 12,
    fontWeight: "400",

    color: "white",
    marginTop: 12,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 40,
    marginTop: 12,
    height: 38,
  },
});
const background = `<svg width="401" height="246" viewBox="0 0 401 246" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="401" height="246" rx="23" fill="url(#paint0_linear_3113_18727)"/>
<defs>
<linearGradient id="paint0_linear_3113_18727" x1="1.18262e-06" y1="112.75" x2="401" y2="112.75" gradientUnits="userSpaceOnUse">
<stop stop-color="#0BAB54"/>
<stop offset="1" stop-color="#3BB6B7"/>
</linearGradient>
</defs>
</svg>
`;
