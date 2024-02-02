import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { Color } from "../assets/colors";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import useLang from "../Hooks/UseLang";

const ChatHeader = () => {
  const isDark = useSelector((state) => state.isDark);
  const colors = new Color(isDark);
  const primaryColor = colors.getPrimaryColor();
  const textColor = colors.getTextColor();
  const assentColor = colors.getAssentColor();
  const backgroundColor = colors.getBackgroundColor();
  const { language } = useLang();
  const isBn = language == "Bn";
  const styles = StyleSheet.create({
    box: {
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 0,
    },
    text: {
      color: textColor,
      fontSize: 20,
      fontWeight: "bold",
    },
    input: {
      margin: 10,
      backgroundColor: primaryColor,
      height: 40,
      width: "90%",
      borderRadius: 5,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
    },
  });

  return (
    <SafeAreaView>
      <View style={styles.box}>
        <TouchableOpacity style={styles.input}>
          <EvilIcons
            style={{
              marginRight: 10,
            }}
            name="search"
            size={24}
            color={assentColor}
          />
          <Text
            style={{
              color: textColor,
              fontFamily: "Poppins-Medium",
            }}
          >
            {isBn ? "বার্তা খুঁজুন" : "Search Chat"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatHeader;
