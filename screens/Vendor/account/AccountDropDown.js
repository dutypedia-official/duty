import React from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import customStyle from "../../../assets/stylesheet";
import { types } from "./types";
import useLang from "../../../Hooks/UseLang";

const { width, height } = Dimensions.get("window");

export default function AccountDropDown({ onSelect, data }) {
  const { language } = useLang();
  const isBn = language == "Bn";
  return (
    <View
      style={[
        {
          flex: 1,
        },
        customStyle.shadow,
      ]}
    >
      <Cart
        onPress={() => (onSelect ? onSelect("ALL") : null)}
        title={isBn ? "সব" : "All"}
      />
      {!data &&
        types.map((doc, i) => (
          <Cart
            onPress={() => (onSelect ? onSelect(doc.type) : null)}
            key={i}
            title={isBn ? doc.titleBn : doc.title}
          />
        ))}
      {data &&
        data.map((doc, i) => (
          <Cart
            onPress={() => (onSelect ? onSelect(doc) : null)}
            key={i}
            title={isBn ? doc.titleBn : doc.title}
          />
        ))}
    </View>
  );
}
const Cart = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: width - 20,
        marginLeft: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#e6e6e6",
        paddingVertical: 10,
        marginVertical: 4,
      }}
    >
      <Text style={customStyle.mediumText}>{title}</Text>
    </TouchableOpacity>
  );
};
