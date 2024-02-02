import React from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { primaryColor, textColor } from "./../assets/colors";
import useLang from "../Hooks/UseLang";

const Appointment = ({ navigation }) => {
  const [Options, setOptions] = React.useState();
  const { language } = useLang();
  const isBn = language == "Bn";
  return (
    <ScrollView>
      <Text
        style={{
          marginVertical: 15,
          marginHorizontal: 20,
          fontSize: 20,
          fontFamily: "Poppins-SemiBold",
        }}
      >
        {isBn ? "অ্যাপয়েন্টমেন্ট" : "Appointment"}
      </Text>
      <ListView
        onPress={() => {
          navigation.navigate("Upcoming");
        }}
        title={isBn ? "সামনের" : "Upcoming"}
        number={2}
      />
      <ListView
        onPress={() => {
          navigation.navigate("Previous");
        }}
        title={isBn ? "আগের" : "Previous"}
        number={5}
      />
      <ListView2
        onPress={() => {
          navigation.navigate("Request");
        }}
        title={isBn ? "অনুরুধ" : "Request"}
        number={0}
      />
    </ScrollView>
  );
};

export default Appointment;

export const ListView = ({ onPress, title, number }) => {
  const { language } = useLang();
  const isBn = language == "Bn";
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingLeft: 40,
        backgroundColor: primaryColor,
      }}
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}
    >
      <View
        style={{
          borderBottomWidth: 1,
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingRight: 10,
          paddingVertical: 15,
          borderBottomColor: "#e5e5e5",
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
        <View
          style={{
            flexDirection: "row",
            width: 50,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              color: textColor,
            }}
          >
            {number}
          </Text>
          <AntDesign name="right" size={24} color="black" />
        </View>
      </View>
    </TouchableOpacity>
  );
};
const ListView2 = ({ onPress, title, number }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingLeft: 40,
        backgroundColor: primaryColor,
      }}
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingRight: 10,
          paddingVertical: 15,
        }}
      >
        <Text
          style={{
            flex: 1,
            fontSize: 17,
            fontFamily: "Poppins-Medium",
          }}
        >
          {title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            flex: 2,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                marginLeft: "50%",
                fontFamily: "Poppins-Medium",
              }}
            >
              {isBn ? "আপনি পাঠিয়েছেন" : "Sent"}
            </Text>
            <Text style={{ marginLeft: 10, fontFamily: "Poppins-Medium" }}>
              {number}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 2,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                marginLeft: "22%",
                fontFamily: "Poppins-Medium",
              }}
            >
              {isBn ? "আপনাকে পাঠিয়েছে" : "Receive"}
            </Text>
            <Text style={{ marginLeft: 10, fontFamily: "Poppins-Medium" }}>
              {number}
            </Text>
          </View>
          <AntDesign name="right" size={24} color="black" />
        </View>
      </View>
    </TouchableOpacity>
  );
};
