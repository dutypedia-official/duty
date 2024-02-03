import React from "react";
import { View, Dimensions, Text } from "react-native";
import {
  primaryColor,
  backgroundColor,
  textColor,
} from "../../../assets/colors";
import IconButton from "../../../components/IconButton";
const { width, height } = Dimensions.get("window");
import Button from "./../../../components/Button";
import useLang from "../../../Hooks/UseLang";

const AlertModal = ({ title, subTitle, onChange }) => {
  const { language } = useLang();
  const isBn = language == "Bn";
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.084)",
      }}
    >
      <View
        style={{
          width: width - 80,
          backgroundColor: primaryColor,
          justifyContent: "center",
          alignItems: "center",
          shadowOffset: {
            height: 2,
            width: 2,
          },
          shadowOpacity: 0.4,
          shadowRadius: 5,
          elevation: 5,
          shadowColor: "#707070",
          paddingVertical: 30,
          borderRadius: 5,
        }}
      >
        <Text
          style={{
            fontSize: 17,
            fontFamily: "Poppins-Medium",
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontFamily: "Poppins-Light",
            marginVertical: 10,
          }}
        >
          {subTitle}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <IconButton
            onPress={() => {
              if (onChange) {
                onChange("ok");
              }
            }}
            style={{
              backgroundColor: backgroundColor,
              color: "white",
              marginRight: "5%",
              borderWidth: 0,
              width: "40%",
            }}
            title={isBn ? "নিশ্চিত করুন" : "Confirm"}
          />
          <IconButton
            onPress={() => {
              if (onChange) {
                onChange("cancel");
              }
            }}
            style={{
              color: textColor,
              width: "40%",
            }}
            title={isBn ? "বাতিল করুন" : "Cancel"}
          />
        </View>
      </View>
    </View>
  );
};

export default AlertModal;
