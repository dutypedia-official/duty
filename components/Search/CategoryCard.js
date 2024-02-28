import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { SvgXml } from "react-native-svg";
import { AllData } from "../../Data/AllData";
import useLang from "../../Hooks/UseLang";

export default function CategoryCard({ data, onPress }) {
  const category = AllData.filter((d) => d.key.match(data.key))[0];
  const { language } = useLang();
  const isBn = language == "Bn";
  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        marginHorizontal: 20,
        alignItems: "center",
        marginTop: 24,
      }}
    >
      <SvgXml xml={data?.icon} />
      <View
        style={{
          marginLeft: 12,
          flex: 1,
        }}
      >
        <Text style={styles.headline} numberOfLines={1}>
          {isBn ? data?.titleBn : data?.title}
        </Text>
        <Text style={styles.normalText} numberOfLines={3}>
          {category?.data?.map((doc, i) => {
            return i != 0
              ? `, ${isBn ? doc.titleBn : doc.title}`
              : `${isBn ? doc.titleBn : doc.title}`;
          })}
          {category?.list &&
            category.list[0]?.data?.map((doc, i) => {
              return i != 0
                ? `, ${isBn ? doc.titleBn : doc.title}`
                : `${isBn ? doc.titleBn : doc.title}`;
            })}
        </Text>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  headline: {
    fontSize: 16,
    fontWeight: "500",
  },
  normalText: {
    fontSize: 12,

    fontWeight: "400",
    marginTop: 4,
    color: "#767676",
  },
});
