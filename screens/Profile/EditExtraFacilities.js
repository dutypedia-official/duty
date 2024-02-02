import { useIsFocused } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ScrollView,
  View,
  Image,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ViewMore from "../../Hooks/ViewMore";
import { setHideBottomBar } from "../../Reducers/hideBottomBar";
import { icon, styles } from "./EditBusinessTitle";
import Extra from "../../assets/Extra.png";
import { SvgXml } from "react-native-svg";
import TextOp from "../Profile/TextOp";
import IconButton from "../../components/IconButton";
import { CheckBox } from "../Seller/Pricing";
import customStyle from "../../assets/stylesheet";
import Input from "../../components/Input";
import { updateGigsData } from "../../Class/update";
import { getService } from "../../Class/service";
import ActivityLoader from "../../components/ActivityLoader";
const { width, height } = Dimensions.get("window");
import uuid from "react-native-uuid";
import useLang from "../../Hooks/UseLang";
import ReadMore from "../../components/ReadMore";

export default function EditExtraFacilities({ navigation, route }) {
  const isFocused = useIsFocused();
  const businessForm = useSelector((state) => state.businessForm);
  const dispatch = useDispatch();
  const [layoutHeight, setLayoutHeight] = useState(0);
  const serviceCategory = route?.params?.serviceCategory;
  const skills = route?.params?.skills;
  const facilities = route?.params?.facilities;
  const [Service, setService] = React.useState(facilities ? facilities : []);
  const [buttonVisible, setButtonVisible] = React.useState(false);
  const [ServiceError, setServiceError] = React.useState();
  const user = useSelector((state) => state.user);
  const [loader, setLoader] = useState(false);
  const vendor = useSelector((state) => state.vendor);
  const gigs = route?.params?.gigs;
  const { language } = useLang();
  const isBn = language == "Bn";
  //console.log(Service)
  const content = isBn
    ? `1. ইউনিক অফারগুলি আইডেন্টিফাই করুন: ক্লায়েন্টদের কাছে আপনি যে ভ্যালুতে অফার করতে চান তা উন্নত করার জন্য আপনি যে সার্ভিস বা বৈশিষ্ট্যগুলি সরবরাহ করতে পারেন সে সম্পর্কে চিন্তা করুন৷ আপনার ব্যবসায়ের স্পেশালিটি কী এবং আপনি ক্রেতাদের চাহিদা মেটানোর জন্য কত টুক দূরত্বে যেতে পারেন তা বিবেচনা করুন৷।

2. আপনার ইউনিক বিষয় গুলা দেখান: গ্রাহকদের এটেনশন পেতে আপনার ক্যাটাগরি গুলো আলাদা করার জন্য আপনি যে ইউনিক সুবিধাগুলি প্রদান করেন তা হাইলাইট করুন৷। এটি একটি ফ্রি কনসালটেশন, 24/7 কাস্টমার সাপোর্ট, অথবা পার্সোনালাইজড সলিউশন যাইহোক না কেন, নিশ্চিত করুন যে আপনার সার্ভিসগুলি বেছে নেওয়ার মাধ্যমে গ্রাহকরা সকল সুবিধাগুলি উপভোগ করতে পারবে ৷
  
3. পরিষ্কার এবং সংক্ষিপ্ত হোন: আপনার এক্সট্রা সুবিধা গুলো বর্ণনা করার সময়, তাদের মূল্য বোঝাতে পরিষ্কার এবং সংক্ষিপ্ত ভাষা ব্যবহার করুন৷ তারা যে নির্দিষ্ট সুবিধাগুলি নিয়ে আসে এবং কীভাবে তারা আপনার ব্যবসার সাথে ক্লায়েন্টদের অভিজ্ঞতাকে পজিটিভলি প্রভাবিত করতে পারে তার উপর ফোকাস করুন৷।
  
4. এটি প্রাসঙ্গিক রাখুন: নিশ্চিত করুন যে আপনি যে এক্সট্রা ফ্যাসিলিটিজ অফার করেন তা আপনার দক্ষতার সাথে প্রাসঙ্গিক এবং আপনার সমস্ত অফার করা সার্ভিসগুলির সাথে সামঞ্জস্য৷ এটি ক্লায়েন্টদের সাথে সমকম্পিত হয়ে একটি সমন্বিত এবং আকর্ষিক প্রোফাইল তৈরি করতে সাহায্য করবে৷।
  
5. প্রয়োজন অনুযায়ী আপডেট করুন: আপনার ব্যবসার বিকাশের সাথে সাথে আপনার দেওয়া এক্সট্রা ফ্যাসিলিটিজগুলি পুনরায় দেখুন এবং আপডেট করুন৷ বাজারের ট্রেন্ডস এবং ক্লায়েন্টের ডিমান্ডের প্রতি সংবেদনশীল থাকুন এবং একটি প্রতিযোগিতামূলক প্রান্ত বজায় রাখতে সেই অনুযায়ী আপনার অফারগুলিকে মেইনটেইন করুন৷।
`
    : `1. Identify Unique Offerings: Think about the additional services or features you can provide to enhance the value you offer to potential clients. Consider what makes your business special and how you can go the extra mile to meet their needs.

2. Showcase Your Differentiators: Highlight the unique facilities you provide to attract attention and stand out in your category. Whether it's offering a free consultation, 24/7 customer support, or personalized solutions, make sure to emphasize the benefits clients can enjoy by choosing your services.

3. Be Clear and Concise: When describing your extra facilities, use clear and concise language to convey their value. Focus on the specific advantages they bring and how they can positively impact clients' experiences with your business.

4. Keep it Relevant: Ensure that the extra facilities you offer are relevant to your skills and align with your overall service offerings. This will help create a cohesive and compelling profile that resonates with potential clients.

5. Update as Needed: As your business evolves, revisit and update the extra facilities you provide. Stay responsive to market trends and client demands, and adapt your offerings accordingly to maintain a competitive edge.`;
  React.useEffect(() => {
    if (businessForm?.facilities) {
      setService(businessForm.facilities);
    }
    if (isFocused) {
      //console.log("hidden")
      dispatch(setHideBottomBar(true));
      setTimeout(() => {
        dispatch(setHideBottomBar(true));
      }, 50);
    } else {
      //console.log("seen")
      dispatch(setHideBottomBar(false));
    }
    let arr = [];
    facilities?.map((doc) => {
      arr.push({
        id: doc?.id,
        title: doc?.title,
        checked: doc?.checked ? doc.checked : true,
      });
    });
    setService(arr);
  }, [isFocused]);

  const updateData = () => {
    setLoader(true);
    updateGigsData(user.token, {
      gigId: gigs?.id,
      skills: skills,
      facilites: {
        title: "Selected Options",
        selectedOptions: Service?.filter((d) => d.checked),
      },
    })
      .then((res) => {
        updateVendorInfo();
      })
      .catch((err) => {
        setLoader(false);
        console.error(err.response.data.msg);
      });
  };
  const updateVendorInfo = async () => {
    const res = await getService(user.token, vendor.service.id);
    if (res) {
      setLoader(false);
      dispatch({ type: "SET_VENDOR", playload: res.data });
      navigation.navigate("VendorProfile");
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
    <View
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginTop: 10,
            paddingHorizontal: 20,
          }}
        >
          <Image
            style={{
              width: width - 40,
              height: 230,
            }}
            source={Extra}
          />
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              marginTop: 36,
            }}
          >
            <SvgXml
              style={{
                marginRight: 8,
              }}
              xml={icon}
            />
            <Text style={[styles.headLine, { flex: 1 }]}>
              {isBn
                ? "অতিরিক্ত সুবিধা অ্যাড করার সম্পর্কে টিপস:"
                : "Tips for Extra Facilities"}
            </Text>
          </View>
          <ReadMore containerStyle={{ marginTop: 24 }} content={content} />
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "400",
                marginTop: 36,
              }}
            >
              {isBn
                ? "অতিরিক্ত সুবিধা ( আবশ্যক না)"
                : "Extra facilities ( Optional )"}
            </Text>
            {Array.isArray(Service) &&
              Service.map((doc, i) => (
                <CheckBox
                  key={i}
                  style={{
                    marginTop: 24,
                  }}
                  value={doc.checked}
                  title={doc.title}
                  onChange={() => {
                    let arr = Service;
                    setService(null);
                    arr[i] = {
                      title: doc.title,
                      checked: !doc.checked,
                      id: doc?.id,
                    };
                    setService(arr);
                    //setChange(!change);
                    //console.log(arr);
                  }}
                />
              ))}
            {Service?.length == 0 && (
              <Text
                style={{
                  marginVertical: 10,
                }}
              >
                No Facilities
              </Text>
            )}
            {ServiceError && (
              <Text
                style={{
                  fontSize: 12,
                  marginLeft: 2,
                  fontFamily: "Poppins-Light",
                  color: "red",
                  marginTop: 3,
                }}
              >
                {ServiceError}
              </Text>
            )}

            {Service && Service.length < 24 && (
              <IconButton
                onPress={() => {
                  setButtonVisible(true);
                }}
                style={{
                  flexDirection: "row",
                  borderWidth: 0,
                  width: 100,
                  marginTop: 20,
                }}
                LeftIcon={() => <SvgXml xml={plus} />}
                title={isBn ? "আরও অ্যাড করুন" : "Add More"}
              />
            )}
          </View>
          <IconButton
            active={true}
            disabled={false}
            onPress={() => {
              //dispatch({ type: "SPECIALITY", playload: skills });
              updateData();
            }}
            style={styles.button}
            title={isBn ? "আপডেট করুন" : "Update"}
          />
        </View>
      </ScrollView>
      <Modal
        transparent={true}
        visible={buttonVisible}
        onRequestClose={() => setButtonVisible(false)}
      >
        <AddCard
          onSelect={(e) => {
            setService((d) => [
              ...d,
              {
                id: uuid?.v4(),
                title: e,
                checked: true,
              },
            ]);
            setButtonVisible(false);
          }}
          onClose={() => setButtonVisible(false)}
        />
      </Modal>
    </View>
  );
}
const AddCard = ({ onClose, onSelect }) => {
  const [text, setText] = useState();
  const [textError, setTextError] = useState();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <View style={[customStyle.fullBox, { backgroundColor: "#0000001e" }]}>
        <View
          style={[
            {
              backgroundColor: "#ffffff",
              width: width - 40,

              borderRadius: 10,
              padding: 20,
            },
            customStyle.shadow,
          ]}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            Add Feature
          </Text>
          <Input
            error={textError}
            value={text}
            onChange={setText}
            style={[styles.input]}
          />
          <Text style={styles.text}>Max 40 character</Text>
          <View style={{ flexDirection: "row" }}>
            <IconButton
              onPress={() => {
                setTextError();
                if (!text) {
                  setTextError("*Text is required");
                  return;
                }
                if (text && text.split("").length > 40) {
                  setTextError("*Text must be less then 40 character");
                  return;
                }
                if (onSelect) {
                  onSelect(text);
                  setText();
                }
              }}
              style={[
                newStyles.button,
                {
                  backgroundColor: "#4ADE80",
                  color: "#ffffff",
                },
              ]}
              title={"Add"}
            />
            <View style={{ width: 20 }} />
            <IconButton
              onPress={onClose}
              style={newStyles.button}
              title={"Cancel"}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
const newStyles = StyleSheet.create({
  button: {
    width: (width - 100) / 2,
    marginTop: 20,
  },
});
const plus = `<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 9H17M9 17V1" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
