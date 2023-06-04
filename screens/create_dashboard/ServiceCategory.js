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

const { width, height } = Dimensions.get("window");

export default function ServiceCategory({ navigation, route }) {
  const businessForm=useSelector(state=>state.businessForm)
  const [layoutHeight, setLayoutHeight] = useState(0);
  const [modalVisible,setModalVisible]=useState(false)
  const [serviceCategory,setServiceCategory]=useState(businessForm?.serviceCategory)
  const isFocused=useIsFocused()
  const dispatch=useDispatch()
  const [key,setKey]=useState()
  


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
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingHorizontal: 20,
        }}>
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
          }}>
          <SvgXml
            style={{
              marginRight: 8,
            }}
            xml={icon}
          />
          <Text style={[styles.headLine, { flex: 1 }]}>
            Tips for Choosing Your Service Category
          </Text>
        </View>
        
        <ReadMore containerStyle={{
          marginTop:24
        }} content={content}/>
        <Text style={[styles.headLine,{lineHeight:32,marginTop:15}]}>Which service category best describes your business?</Text>
        <InputButton value={serviceCategory} onPress={()=>setModalVisible(true)} style={[styles.input]} placeholder={"example: lawyer, graphic design,Business consultant "}/>
        <Text style={styles.text}>Max 50 characters </Text>
        <IconButton onPress={()=>{
          dispatch({ type: "SERVICE_CATEGORY", playload: serviceCategory });
          navigation?.navigate("Skills",{
            serviceCategory:key,
          })
        }} active={serviceCategory?true:false}
        disabled={serviceCategory?false:true} style={styles.button} title={"Continue"}/>
      </ScrollView>
      <Modal animationType="slide" visible={modalVisible} onRequestClose={setModalVisible}>
        <ServiceCategoryAdd onSelect={(e,object)=>{
          setServiceCategory(e)
          setKey(object)
          //console.log(key)
        }} onClose={setModalVisible} navigation={navigation}/>
      </Modal>
    </KeyboardAvoidingView>
  );
}
const content=`Thank you for choosing our platform to showcase your business! To accurately categorize your services, please follow these instructions:
1. Review the available service categories carefully.
2. Select the category that best represents the primary service your business offers.
3. If your business provides multiple services, choose the category that aligns with your main service offering.
4. If you cannot find an exact match, select the closest category that describes your business accurately. Alternatively, you can manually enter your own service category and provide a brief description.
5. Remember, choosing the appropriate service category will help potential customers find your business easily.
If you have any questions or need assistance, please feel free to reach out to our support team. We're here to help!
Thank you for your cooperation, and we look forward to showcasing your services on our platform!"`