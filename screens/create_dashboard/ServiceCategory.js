import React, { useState } from "react";
import {
  Platform,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  Dimensions,
  Text,
  Modal,
} from "react-native";
import PageChip from "./components/PageChip";
import service from "../../assets/service.png";
import { icon, styles } from "./BusinessTitle";
import { SvgXml } from "react-native-svg";
import ViewMore from "../../Hooks/ViewMore";
import TextOp from "./TextOp";
import Input from "../../components/Input";
import InputButton from "../Vendor/account/InputButton";
import IconButton from "../../components/IconButton";
import ServiceCategoryAdd from "./components/ServiceCategoryAdd";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setHideBottomBar } from "../../Reducers/hideBottomBar";
import ReadMore from "../../components/ReadMore";
import useLang from "../../Hooks/UseLang";

const { width, height } = Dimensions.get("window");

export default function ServiceCategory({ navigation, route }) {
  const businessForm = useSelector((state) => state.businessForm);
  const [layoutHeight, setLayoutHeight] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [serviceCategory, setServiceCategory] = useState(
    businessForm?.serviceCategory
  );
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [key, setKey] = useState();
  const { language } = useLang();
  const isBn = language == "Bn";

  const content = isBn
    ? `
আপনার ব্যবসা প্রদর্শনের জন্য আমাদের প্ল্যাটফর্ম নির্বাচন করায় আপনাকে ধন্যবাদ! আপনার সার্ভিস গুলো সঠিকভাবে শ্রেণীবদ্ধ করার জন্য, এই সার্ভিস গুলো অনুসরণ করুন:

1.পছন্দের সার্ভিস ক্যাটাগরি গুলো ভালভাবে রিভিউ করুন৷।
    
2. আপনার ব্যাবসার অফার গুলো রিপ্রেজেন্ট করে এমন সেরা ক্যাটাগরি গুলো সিলেক্ট করুন৷।
    
3. আপনার ব্যবসায় যদি একাধিক সার্ভিস প্রোভাইড করে, তাহলে আপনার ব্যবসার প্রধান সার্ভিস সরবরাহের সাথে মিল আছে এমন ক্যাটাগরি গুলো চয়েজ করুন৷।
    
4. যদি আপনি সঠিক মিল খুঁজে না পান তবে আপনার ব্যবসা সঠিকভাবে বর্ণনা করে এমন সবচেয়ে কাছের ক্যাটাগরি গুলো চয়েজ করুন৷ অথবা, আপনি নিজের সার্ভিস ক্যাটাগরি গুলো ম্যানুয়ালি ভাবে অ্যাড করতে পারেন এবং একটি সংক্ষিপ্ত বিবরণ প্রদান করতে পারেন৷।
    
5. মনে রাখবেন, গ্রাহকদের আপনার ব্যবসাকে সহজে খুঁজে পেতে ক্যাটাগরি গুলো সাহায্য করবে৷।
    
যদি আপনার কোন প্রশ্ন থাকে বা সহায়তা প্রয়োজন হয় তবে দয়া করে আমাদের সাহায্যকারী টিমের সাথে যোগাযোগ করুন৷।
    
আমরা এখানে আপনাদের সাহায্য করার জন্য  আছি!
আপনার সহযোগিতার জন্য, এবং আমাদের প্ল্যাটফর্মে আপনার সার্ভিসগুলি দেখানোর জন্য আপনাকে ধন্যবাদ ! "  
`
    : `Thank you for choosing our platform to showcase your business! To accurately categorize your services, please follow these instructions:
1. Review the available service categories carefully.
2. Select the category that best represents the primary service your business offers.
3. If your business provides multiple services, choose the category that aligns with your main service offering.
4. If you cannot find an exact match, select the closest category that describes your business accurately. Alternatively, you can manually enter your own service category and provide a brief description.
5. Remember, choosing the appropriate service category will help potential customers find your business easily.
If you have any questions or need assistance, please feel free to reach out to our support team. We're here to help!
Thank you for your cooperation, and we look forward to showcasing your services on our platform!"`;

  React.useEffect(() => {
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
  }, [isFocused]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingHorizontal: 20,
        }}
      >
        <PageChip currentPage={1} totalPage={14} />
        <Image
          style={{
            height: width / 2 + 60,
            width: "100%",
            marginTop: 30,
          }}
          source={service}
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
              ? "আপনার সার্ভিস ক্যাটাগরি গুলো বাছাই করার জন্য টিপস:"
              : "Tips for Choosing Your Service Category"}
          </Text>
        </View>

        <ReadMore
          containerStyle={{
            marginTop: 24,
          }}
          content={content}
        />
        <Text style={[styles.headLine, { lineHeight: 32, marginTop: 15 }]}>
          {isBn
            ? "কোন সার্ভিস ক্যাটাগরি আপনার ব্যবসাকে ভালভাবে উপস্থাপন করে?"
            : "Which service category best describes your business?"}
        </Text>
        <InputButton
          value={serviceCategory}
          onPress={() => setModalVisible(true)}
          style={[styles.input]}
          placeholder={
            isBn
              ? "উদাহরণ: আইনজীবী, গ্রাফিক ডিজাইন, বিজনেস কনসালট্যান্ট"
              : "example: lawyer, graphic design,Business consultant "
          }
        />
        <Text style={styles.text}>
          {isBn ? "সর্বোচ্চ ৫০টি অক্ষর" : "Max 50 characters"}{" "}
        </Text>
        <IconButton
          onPress={() => {
            dispatch({ type: "SERVICE_CATEGORY", playload: serviceCategory });
            navigation?.navigate("Skills", {
              serviceCategory: key,
            });
          }}
          active={serviceCategory ? true : false}
          disabled={serviceCategory ? false : true}
          style={styles.button}
          title={isBn ? "পরবর্তী" : "Continue"}
        />
      </ScrollView>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={setModalVisible}
      >
        <ServiceCategoryAdd
          onSelect={(e, object) => {
            setServiceCategory(e);
            setKey(object);
            //console.log(key)
          }}
          onClose={setModalVisible}
          navigation={navigation}
        />
      </Modal>
    </KeyboardAvoidingView>
  );
}
