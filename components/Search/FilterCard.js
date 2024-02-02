import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Platform } from "react-native";
import SwitchCart from "./SwitchCart";
import { Slider } from "@miblanchard/react-native-slider";
import { OnlineTutionIcon } from "../../assets/icon";
import DropDown from "../DropDown";
import DropDownRight from "./DropDownRight";
import AddressPicker from "./AddressPicker";
import IconButton from "../IconButton";
import useLang from "../../Hooks/UseLang";

export default function FilterCard({ onSelect }) {
  const [range, setRange] = useState([50, 25000]);
  const [online, setOnline] = useState(false);
  const [verified, setVerified] = useState(false);
  const [sortBy, setSortBy] = useState();
  const [address, setAddress] = useState(["", ""]);
  const [min, setMin] = useState("50");
  const [max, setMax] = useState("25000");
  const [division, setDivision] = useState();
  const [district, setDistrict] = useState();
  const { language } = useLang();
  const isBn = language == "Bn";
  useEffect(() => {
    if (min && max) {
      //setRange([parseInt(min),parseInt(max)])
    }
  }, [max, min]);

  return (
    <View
      style={{
        paddingHorizontal: 32,
        paddingTop: 28,
        paddingBottom: 36,
      }}
    >
      <Text style={[styles.largeText, { textAlign: "center" }]}>
        {isBn ? "ফিলটার করুন" : "Filter"}
      </Text>
      <View style={styles.lineBox}>
        <Text style={[styles.largeText]}>{isBn ? "দাম" : "Price"}</Text>
        <View style={{ height: 20 }} />
        <Slider
          maximumValue={25000}
          minimumValue={50}
          value={[min, max]}
          onValueChange={(value) => {
            setMax(value[1]);
            setMin(value[0]);
          }}
          renderThumbComponent={() => (
            <View
              style={{
                backgroundColor: "white",
                height: 17,
                width: 17,
                borderRadius: 9,
                borderWidth: 1,
                borderColor: "#4CD964",
              }}
            ></View>
          )}
          maximumTrackTintColor={"#C6F3CE"}
          minimumTrackTintColor={"#4ADE80"}
        />
        <View style={{ height: 20 }} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <InputBox
            value={min}
            onChange={(e) => {
              if (!e) {
                return;
              }
              setMin(e);
            }}
          />
          <Text style={[styles.mediumText, { marginHorizontal: 12 }]}>
            {isBn ? "থেকে" : "to"}
          </Text>
          <InputBox
            onChange={(e) => {
              //console.log(e)
              if (!e) {
                return;
              }
              setMax(e);
            }}
            value={max}
          />
        </View>
      </View>
      <Text style={[styles.largeText, { marginBottom: 32 }]}>
        {isBn ? "অবস্থা" : "Status"}
      </Text>
      <SwitchCart
        value={online}
        onChange={() => setOnline((t) => !t)}
        title={isBn ? "অনলাইনে থাকা বিক্রেতা" : "Online Seller"}
      />
      {Platform.OS == "ios" && <View style={{ height: 10 }} />}
      <SwitchCart
        value={verified}
        onChange={() => setVerified((t) => !t)}
        title={isBn ? "যাচাইকৃত বিক্রেতা" : "Verified Seller"}
      />
      <DropDownRight
        value={sortBy}
        onChange={setSortBy}
        data={["Older", "Newest"]}
        title={isBn ? "শ্রেণীবিভক্ত করুন" : "Sort by"}
      />
      <Text style={[styles.largeText, { marginTop: 32 }]}>
        {isBn ? "ঠিকানা" : "Location"}
      </Text>
      <AddressPicker
        onDivision={(e) => {
          setDivision(e);
          setDistrict();
        }}
        onDistrict={setDistrict}
        value={address}
        onChange={setAddress}
      />
      <IconButton
        onPress={() => {
          onSelect({
            min: min,
            max: max,
            division: division,
            district: district,
            online: online,
            verified: verified,
            orderBy: sortBy,
          });
        }}
        style={styles.button}
        title={isBn ? "সম্পন্ন" : "Apply"}
      />
    </View>
  );
}
const InputBox = ({ value, onChange }) => {
  value = parseInt(value);
  value = value.toString();
  return (
    <View
      style={{
        borderColor: "#E6E6E6",
        borderWidth: 1,
        borderRadius: 4,
        height: 34,
        flex: 1,
      }}
    >
      <TextInput
        keyboardType="number-pad"
        value={value}
        onChangeText={onChange}
        style={{ flex: 1, textAlign: "center" }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  largeText: {
    fontSize: 20,

    fontWeight: "400",
  },
  mediumText: {
    fontWeight: "400",
    fontSize: 16,
  },
  lineBox: {
    marginVertical: 32,
  },
  checkBox: {
    margin: 0,
  },
  button: {
    height: 35,
    backgroundColor: "#4ADE80",
    marginTop: 32,
    borderRadius: 8,
    color: "#ffffff",
    marginBottom: 35,
  },
});
