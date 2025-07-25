import { useIsFocused } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import SubHeader from "../../components/SubHeader";
import { setHideBottomBar } from "../../Reducers/hideBottomBar";
import OfferNow from "../Seller/OfferNow";
import useLang from "../../Hooks/UseLang";

export default function ServiceOrder({ navigation, route }) {
  const data = route?.params?.data;
  const type = route.params?.type;
  const price = route?.params?.price;
  const title = route?.params?.title;
  const id = route?.params?.id;
  const serviceList = route?.params?.serviceList;
  const facilities = route?.params?.facilities;
  const selectedPackage = route?.params?.selectedPackage;
  const services = route?.params?.services;
  const category = route?.params?.category;

  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const { language } = useLang();
  const isBn = language == "Bn";

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
    <View
      style={{
        flex: 1,
      }}
    >
      <SubHeader
        navigation={navigation}
        title={
          isBn
            ? type == "STARTING"
              ? "দরদাম করুন"
              : type == "ONETIME"
              ? "ক্রয় করুন"
              : "ক্রয় করুন"
            : type == "STARTING"
            ? "Offer Your Price"
            : type == "ONETIME"
            ? "Fixed Price Service"
            : "Package Service"
        }
      />
      {type == "STARTING" && (
        <OfferNow
          navigation={navigation}
          title={title}
          id={id}
          type={type}
          price={price}
          data={data}
        />
      )}
      {type == "ONETIME" && (
        <OfferNow
          navigation={navigation}
          type={type}
          data={data}
          gigs={data}
          serviceList={serviceList}
          facilities={facilities}
        />
      )}
      {type == "PACKAGE" && (
        <OfferNow
          navigation={navigation}
          type={type}
          data={data}
          gigs={data}
          serviceList={serviceList}
          facilities={facilities}
          selectedPackage={selectedPackage}
          services={services}
          category={category}
        />
      )}
    </View>
  );
}
