import React, { useState } from "react";
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import Input from "../../components/Input";
import InputButton from "../Vendor/account/InputButton";
const { width, height } = Dimensions.get("window");
import { Menu } from "react-native-paper";
import { CheckBox } from "../Seller/Pricing";
import IconButton from "../../components/IconButton";
import { registerUser, userLogin } from "../../Class/auth";
import { useDispatch } from "react-redux";
import ActivityLoader from "../../components/ActivityLoader";
import useLang from "../../Hooks/UseLang";

export default function SignUp_3({ navigation, route }) {
  const { language } = useLang();
  const isBn = language == "Bn";
  const [visible, setVisible] = React.useState(false);
  const [gender, setGender] = useState();
  const token = route?.params?.token;
  const [name, setName] = useState();
  const [nameError, setNameError] = useState();
  const [genderError, setGenderError] = useState();
  const [age, setAge] = useState();
  const [ageError, setAgeError] = useState();
  const [userName, setUserName] = useState();
  const [userNameError, setUserNameError] = useState();
  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState();
  const [RePassword, setRePassword] = useState();
  const [RePasswordError, setRePasswordError] = useState();
  const [check, setCheck] = useState(false);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  var regName = /^[a-zA-Z0-9]+$/;
  const openMenu = () => setVisible(true);
  //console.log("df")
  const closeMenu = () => setVisible(false);
  const verify = async () => {
    setNameError();
    setUserNameError();
    setPasswordError();
    setRePasswordError();

    if (name.split("")?.length < 4) {
      setNameError(isBn ? "নাম খুব ছোট" : "Name is too small");
      return;
    }
    if (name.split("")?.length > 20) {
      setNameError(isBn ? "নাম খুব বড়" : "Name is too large");
      return;
    }
    if (!regName.test(userName)) {
      setUserNameError(
        isBn
          ? "ইংরেজি বর্ণমালা এবং সংখ্যা ব্যবহার করুন( কোনও স্পেস দিবেন না )"
          : "Use alphabet & number"
      );
      return;
    }
    if (userName.split("")?.length < 4) {
      setUserNameError(isBn ? "নাম খুব ছোট" : "Name is too small");
      return;
    }
    if (userName.split("")?.length > 20) {
      setUserNameError(isBn ? "নাম খুব বড়" : "Name is too large");
      return;
    }
    if (password.split("")?.length < 8) {
      setPasswordError(
        isBn ? "সর্বনিম্ন যেকোনো ৮ অক্ষর" : "Minimum 8 character"
      );
      return;
    }
    if (password !== RePassword) {
      setRePasswordError(isBn ? "পাসওয়ার্ড মেলে না" : "Password not matched");
      return;
    }
    setLoader(true);
    registerUser(token, name, userName, password, age, gender)
      .then((res) => {
        userLogin(userName, password)
          .then((res) => {
            setLoader(false);
            //console.log(res);
            if (res) {
              dispatch({ type: "SET_USER", playload: res });
              navigation.navigate("Feed");
            }
          })
          .catch((err) => {
            setLoader(false);
            Alert.alert(err.response.data.msg);
          });
      })
      .catch((err) => {
        //console.log()
        setLoader(false);
        setUserNameError(err.response.data.msg);
      });
  };
  if (loader) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
        <View style={[styles.mt37, { paddingHorizontal: 20 }]}>
          <Text style={styles.label}>{isBn ? "আপনার নাম" : "Your name"}</Text>
          <Input
            onChange={(e) => {
              setName(e);
            }}
            value={name}
            placeholder={isBn ? "আপনার নাম লিখুন" : "Type your name"}
            style={[styles.input, styles.mt8]}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: "red",
              }}
            >
              {nameError}
            </Text>
            <Text>
              {isBn
                ? "সর্বনিম্ন 4 সর্বাধিক 20 অক্ষর"
                : "min 4 max 20 character"}
            </Text>
          </View>
          <View
            style={[
              {
                flexDirection: "row",
                justifyContent: "space-between",
              },
              styles.mt20,
            ]}
          >
            <View
              style={{
                width: width / 2 - 36,
              }}
            >
              <Text style={styles.label}>{isBn ? "লিঙ্গ" : "Gender"}</Text>
              <Menu
                contentStyle={{
                  backgroundColor: "white",
                }}
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                  <InputButton
                    error={genderError}
                    onPress={openMenu}
                    style={[styles.input, styles.mt8]}
                    placeholder={isBn ? "নির্বাচন করুন" : "Select"}
                    value={gender}
                  />
                }
              >
                <Menu.Item
                  onPress={() => {
                    setGender("Male");
                    closeMenu();
                  }}
                  title={isBn ? "পুরুষ" : "Male"}
                />
                <Menu.Item
                  onPress={() => {
                    setGender("Female");
                    closeMenu();
                  }}
                  title={isBn ? "মহিলা" : "Female"}
                />
                <Menu.Item
                  onPress={() => {
                    setGender("Other");
                    closeMenu();
                  }}
                  title={isBn ? "অন্যকিছু" : "Other"}
                />
              </Menu>
            </View>
            <View
              style={{
                width: width / 2 - 36,
              }}
            >
              <Text style={styles.label}>
                {isBn ? "বয়স ( ইংরেজিতে নম্বরে )" : "Age"}
              </Text>
              <Input
                value={age}
                onChange={setAge}
                error={ageError}
                keyboardType={"number-pad"}
                style={[styles.input, styles.mt8]}
                placeholder={isBn ? "সর্বনিম্ন ১২ বয়স থেকে" : "12"}
              />
            </View>
          </View>
          <Text style={[styles.label, styles.mt20]}>
            {isBn ? "একটি ইউজার নেম তৈরি করুন" : "Create a username"}
          </Text>
          <Input
            autoCapitalize={"none"}
            value={userName}
            onChange={setUserName}
            placeholder={isBn ? "আপনার ইউজার লিখুন" : "Type your username"}
            style={[styles.input, styles.mt8]}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                color: "red",
              }}
            >
              {userNameError}
            </Text>
            <Text>
              {isBn
                ? "সর্বনিম্ন 4 সর্বাধিক 20 অক্ষর"
                : "min 4 max 20 character"}
            </Text>
          </View>
          <Text style={[styles.label, styles.mt20]}>
            {isBn ? "পাসওয়ার্ড" : "Password"}
          </Text>
          <Input
            error={passwordError}
            value={password}
            onChange={setPassword}
            secureTextEntry={true}
            style={[styles.input, styles.mt8]}
            placeholder={isBn ? "পাসওয়ার্ড লিখুন" : "Type password"}
          />
          <Text style={[styles.label, styles.mt20]}>
            {isBn ? "পুনরায় লিখুন" : "Retype"}
          </Text>
          <Input
            error={RePasswordError}
            value={RePassword}
            onChange={setRePassword}
            secureTextEntry={true}
            style={[styles.input, styles.mt8]}
            placeholder={isBn ? "পুনরায় পাসওয়ার্ড লিখুন" : "Retype password"}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            marginBottom: 10,
            flex: 1,
            maxHeight: 50,
            paddingHorizontal: 20,
            marginTop: 24,
          }}
        >
          <CheckBox
            value={check}
            onChange={() => {
              setCheck((v) => !v);
            }}
          />
          <Text
            style={{
              fontWeight: "500",
              flex: 1,
              fontSize: 14,
            }}
          >
            {isBn ? "আমি ডিউটির সমস্ত সার্ভিসের" : "I agree with all of Duty's"}{" "}
            <Text style={{ color: "#7566FF", fontWeight: "400" }}>
              {isBn ? "শর্তাবলী" : "Terms of Service"}
            </Text>
            ,{" "}
            <Text style={{ color: "#7566FF", fontWeight: "400" }}>
              {isBn ? "গোপনীয়তা নীতি" : "Privacy Policy"}
            </Text>
            , {isBn ? "এবং" : "and"}{" "}
            <Text style={{ color: "#7566FF", fontWeight: "400" }}>
              {isBn ? "রিফান্ড নীতির" : "Refund Policy"}
            </Text>
            {isBn && <Text> সাথে একমত</Text>}
          </Text>
        </View>
        <IconButton
          onPress={verify}
          disabled={
            name && gender && age && userName && password && RePassword && check
              ? false
              : true
          }
          active={
            name && gender && age && userName && password && RePassword && check
              ? true
              : false
          }
          style={{
            marginHorizontal: 20,
            marginVertical: 20,
          }}
          title={isBn ? "নিশ্চিত করুন" : "Confirm"}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "400",
  },
  mt37: {
    marginTop: 37,
  },
  mt8: {
    marginTop: 8,
  },
  mt20: {
    marginTop: 20,
  },
  input: {
    backgroundColor: "#F1F1F1",
    borderRadius: 4,
    borderBottomWidth: 0,
    marginHorizontal: 0,
  },
});
