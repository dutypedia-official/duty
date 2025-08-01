import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  Pressable,
  Animated as Animation,
  Platform,
  Modal,
} from "react-native";
import { primaryColor, textColor } from "./../assets/colors";
import ProfileOption from "./../components/ProfileOption";
import { AntDesign } from "@expo/vector-icons";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import Button from "./../components/Button";
import RatingView from "./../components/RatingView";
import { user, calenderIcon, noticeIcon, serviceIcon } from "../assets/icon";
import { SvgXml } from "react-native-svg";
import ReviewCart from "./../Cart/ReviewCart";
import IconButton from "./../components/IconButton";
import Animated, {
  FadeIn,
  StretchInY,
  FlipInEasyX,
  Transition,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import ServiceCart from "./../Cart/ServiceCart";
import {
  getService,
  getOtherServices,
  getRelatedServices,
  getUnRelatedServices,
  getDashboardReviews,
  getServiceJust,
  getServiceBySlug,
} from "../Class/service";
import { useSelector, useDispatch } from "react-redux";
import { convertServerFacilities, serverToLocal } from "../Class/dataConverter";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useIsFocused } from "@react-navigation/native";
const Tab = createMaterialTopTabNavigator();

import useHandleScroll from "../components/constants/FabView";
import Carousel from "react-native-reanimated-carousel";
import AnimatedHeight from "../Hooks/AnimatedHeight";
import Swiper from "react-native-swiper";
import { StatusBar } from "expo-status-bar";
import CustomAppStatusBar from "../Hooks/AppBar";
import { TabbedHeaderPager } from "react-native-sticky-parallax-header";
import BottomBar from "../components/BottomBar";
import NewBottomBar from "../components/NewBottomBar";
import { setHideBottomBar } from "../Reducers/hideBottomBar";
import FixedBackHeader from "./Seller/components/FixedBackHeader";
import ActivityLoader from "../components/ActivityLoader";
import { TopSellerCard } from "../components/LandingPage/TopSeller";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import OfferNow from "./Seller/OfferNow";
import { CheckBox } from "./Seller/Pricing";
import { setSaveList } from "../Reducers/saveList";
import ProfileSkeleton from "../components/ProfileSkeleton";
import ServiceListViewer from "../components/ServiceListViewer";
import SellerLayout from "./SellerProfile/SellerLayout";
import ImageCanvas from "./SellerProfile/ImageCanvas";
import SellerInformation from "./SellerProfile/SellerInformation";
import ServiceTab from "./SellerProfile/ServiceTab";
import ReadMore from "../components/ReadMore";
import PictureViewer from "./SellerProfile/PictureViewer";
import customStyle from "../assets/stylesheet";
import useLang from "../Hooks/UseLang";

const { width, height } = Dimensions.get("window");
const OtherProfile = (props) => {
  const window = Dimensions.get("window");
  const newUser = useSelector((state) => state.user);
  const [image, setImage] = React.useState(null);
  const [backgroundImage, setBackgroundImage] = React.useState(null);
  const navigation = props.navigation;
  const { language } = useLang();
  const isBn = language == "Bn";
  const initialState = [
    {
      title: isBn ? "দরদাম" : "Bargaining",
      value: true,
      type: "STARTING",
    },
    {
      title: isBn ? "একদাম" : "Fixed",
      value: false,
      type: "ONETIME",
    },
    // {
    //   title: "Package",
    //   value: false,
    //   type: "PACKAGE",
    // },
    // {
    //   title: "Installment",
    //   value: false,
    //   type: "INSTALLMENT",
    // },
    // {
    //   title: "Subscription",
    //   value: false,
    //   type: "SUBS",
    // },
  ];
  const { handleScroll, showButton } = useHandleScroll();
  const serviceId =
    props.route && props.route.params.serviceId
      ? props.route.params.serviceId
      : null;
  // const user= useSelector((state) => state.user);
  const [Loader, setLoader] = React.useState(false);
  const [Data, setData] = React.useState();
  const [Images, setImages] = React.useState([]);
  const dispatch = useDispatch();
  const [ActiveServiceData, setActiveServiceData] = React.useState(null);
  const [FixedService, setFixedService] = React.useState(null);
  const [Title, setTitle] = React.useState();
  const [Description, setDescription] = React.useState();
  const [Price, setPrice] = React.useState();
  const [Category, setCategory] = React.useState();
  const [Refresh, setRefresh] = React.useState(false);
  const [RelatedServices, setRelatedServices] = React.useState();
  const [UnRelatedServices, setUnRelatedServices] = React.useState();
  const [PackageService, setPackageService] = React.useState();
  const [specialtyHeight, setSpecialtyHeight] = React.useState(75);
  const [specialtyAnimation, setSpecialtyAnimation] = React.useState(
    new Animation.Value(specialtyHeight)
  );
  const params = props.route.params;
  const data = params.data;
  const [scrollEnabled, setScrollEnabled] = React.useState(false);
  const [offset, setOffset] = React.useState();
  const isFocused = useIsFocused();
  const [userInfo, setUserInfo] = useState();
  const [individualRating, setIndividualRating] = useState();
  const [reviews, setReviews] = useState();

  const slug =
    props.route && props.route.params.slug ? props.route.params.slug : null;

  //console.log(SeeMore)

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

  React.useEffect(() => {
    setLoader(true);
    setScrollEnabled(false);

    if (serviceId && newUser) {
      setActiveServiceData(null);
      setRelatedServices(null);
      setUnRelatedServices(null);
      setFixedService(null);
      setPackageService(null);
      getServiceJust(newUser.token, serviceId)
        .then((response) => {
          if (response.data) {
            setLoader(false);
            // const gigs = response.data.service.gigs.filter(
            //   (d) => d.type == "STARTING"
            // );
            setData(response.data);

            setBackgroundImage(response.data.service.wallPhoto);
            setImage(response.data.service.profilePhoto);
            // setImages(gigs[0].images);
            // setPrice(gigs[0].price);
            // setTitle(gigs[0].title);
            // setDescription(gigs[0].description);
            //setNewDataList(response.data.service.gigs[0].services.options)
            //setFacilities(convertServerFacilities(gigs[0].facilites));
            //console.log(convertServerFacilities(gigs[0].facilites))
            let arr = initialState;
            response.data.service.activeServiceTypes.forEach((doc) => {
              arr = arr.map((d) => {
                if (d.type == doc) {
                  //console.log(doc);
                  return {
                    title: d.title,
                    value: true,
                    type: d.type,
                  };
                } else {
                  return d;
                }
              });
            });
            setCategory(data?.services?.category);
            setActiveServiceData(arr);
            setUserInfo(response.data.service.user);
          }
        })
        .catch((error) => {
          setLoader(false);
          console.warn(error.response.data);
        });
    } else if (slug) {
      setActiveServiceData(null);
      setRelatedServices(null);
      setUnRelatedServices(null);
      setFixedService(null);
      setPackageService(null);
      getServiceBySlug(newUser?.token, slug)
        .then((response) => {
          if (response.data) {
            setLoader(false);
            // const gigs = response.data.service.gigs.filter(
            //   (d) => d.type == "STARTING"
            // );
            setData(response.data);

            setBackgroundImage(response.data.service.wallPhoto);
            setImage(response.data.service.profilePhoto);
            // setImages(gigs[0].images);
            // setPrice(gigs[0].price);
            // setTitle(gigs[0].title);
            // setDescription(gigs[0].description);
            //setNewDataList(response.data.service.gigs[0].services.options)
            //setFacilities(convertServerFacilities(gigs[0].facilites));
            //console.log(convertServerFacilities(gigs[0].facilites))
            let arr = initialState;
            response.data.service.activeServiceTypes.forEach((doc) => {
              arr = arr.map((d) => {
                if (d.type == doc) {
                  //console.log(doc);
                  return {
                    title: d.title,
                    value: true,
                    type: d.type,
                  };
                } else {
                  return d;
                }
              });
            });
            setCategory(data?.services?.category);
            setActiveServiceData(arr);
            setUserInfo(response.data.service.user);
          }
        })
        .catch((error) => {
          setLoader(false);
          console.warn(error.response.data);
        });
    }
  }, [serviceId, data, Refresh, slug]);

  React.useEffect(() => {
    if (newUser && data) {
      getRelatedServices(newUser.token, data.service.id, data.service.dashboard)
        .then((response) => {
          if (response.data) {
            setRelatedServices(response.data.gigs);
          }
        })
        .catch((err) => {
          console.warn(err.response);
        });

      getUnRelatedServices(
        newUser.token,
        data.service.id,
        data.service.dashboard
      )
        .then((response) => {
          if (response.data) {
            //console.log(response.data.gigs[0])
            setUnRelatedServices(response.data.gigs);
          }
        })
        .catch((err) => {
          console.warn(err.response);
        });
    }
  }, [data, serviceId, Data, Refresh]);
  React.useEffect(() => {
    if (data) {
      getDashboardReviews(newUser.token, data?.service?.id)
        .then((res) => {
          //console.log(res.data)
          setIndividualRating(res.data.aggregate.individualRating);
          setReviews(res.data.reviews);
        })
        .catch((err) => {
          console.error(err.response.data.msg);
        });
    }
  }, [data, Refresh]);

  const clickFixed = (doc) => {
    navigation.navigate("FixedService", { data: doc });
  };
  const clickPackage = (doc) => {
    //console.log("ok");
    navigation.navigate("PackageService", { data: doc });
  };

  React.useEffect(() => {
    Animation.timing(specialtyAnimation, {
      duration: 300,
      toValue: specialtyHeight,
      useNativeDriver: false,
    }).start();
  }, [specialtyHeight]);
  //console.log(Loader)

  if (Loader) {
    return (
      <View style={customStyle.fullBox}>
        <ActivityLoader />
      </View>
    );
  }
  //return <ProfileSkeleton />;
  return (
    <SellerLayout
      headers={
        <>
          {showButton && (
            <Animated.View
              entering={FadeIn}
              style={{
                shadowOffset: {
                  width: 1,
                  height: 1,
                },
                shadowColor: "#707070",
                shadowRadius: 3,
                elevation: 0,
                shadowOpacity: 0.3,
                position: "absolute",
                right: 20,
                bottom: 20,
                backgroundColor: "#4ADE80",
                borderRadius: 25,
              }}
            >
              <Pressable
                onPress={() => {
                  if (!newUser.token || !userInfo) {
                    navigation.navigate(isBn ? "লগইন" : "LogIn");
                    return;
                  }
                  if (newUser.user.id == userInfo.id) {
                    Alert.alert("Ops!", "Self messaging is not allowed.");
                    return;
                  }

                  let user = {
                    userId: userInfo.id,
                    user: userInfo,
                  };
                  navigation.navigate("ChatScreen", {
                    data: {
                      users: [user],
                      service: Data?.service,
                      serviceId: Data?.service?.id,
                    },
                    username: userInfo.username,
                    serviceId: data?.service?.id,
                  });
                }}
              >
                <SvgXml xml={messageIcon} height="50" width={"50"} />
              </Pressable>
            </Animated.View>
          )}
          <FixedBackHeader
            style={{
              marginTop: -10,
            }}
            navigation={navigation}
            Yoffset={offset ? offset : 0}
          />
        </>
      }
      component={
        <>
          <ImageCanvas
            newUser={newUser}
            Data={Data}
            navigation={navigation}
            isFocused={isFocused}
            backgroundImage={backgroundImage}
            gigId={data?.id}
          />
          <SellerInformation
            navigation={navigation}
            newUser={newUser}
            Data={Data}
          />
          <ServiceTab
            components={[
              <BargainingScreen
                component={
                  <RatingArea
                    navigation={navigation}
                    RelatedServices={RelatedServices}
                    UnRelatedServices={UnRelatedServices}
                    data={data}
                    reviews={reviews}
                    individualRating={individualRating}
                  />
                }
                navigation={navigation}
                params={{
                  Data: Data,
                  newUser: newUser,
                }}
              />,

              <FixedScreen
                navigation={navigation}
                params={{
                  Data: Data,
                  onPress: clickFixed,
                  RelatedServices: RelatedServices,
                  UnRelatedServices: UnRelatedServices,
                }}
              />,
            ]}
            categories={initialState}
          />
        </>
      }
      handleScroll={handleScroll}
      onScrollAction={(off, enable) => {
        setOffset(off);
        setScrollEnabled(enable);
      }}
      onRefresh={() => setRefresh((val) => !val)}
    />
  );
};

export default OtherProfile;
const RatingArea = ({
  individualRating,
  RelatedServices,
  UnRelatedServices,
  reviews,
  navigation,
  data,
}) => {
  const primaryColor = "white";
  const { language } = useLang();
  const isBn = language == "Bn";

  return (
    <>
      <View
        style={{
          backgroundColor: primaryColor,
          marginTop: 0,
          paddingVertical: 25,
          paddingTop: 25,
        }}
      >
        <RatingView
          style={{
            marginHorizontal: 20,
          }}
          title={isBn ? "বিক্রেতার যোগাযোগের মান" : "Seller Communication"}
          rate={individualRating?.communicationRating}
        />
        <RatingView
          style={{
            marginHorizontal: 20,
            marginTop: 5,
          }}
          title={isBn ? "বর্ণনা হিসাবে পরিষেবা" : "Service as Describe"}
          rate={individualRating?.describeRating}
        />
        <RatingView
          style={{
            marginHorizontal: 20,
            marginTop: 5,
          }}
          title={isBn ? "পরিষেবার গুণমান" : "Service Quality"}
          rate={individualRating?.qualityRating}
        />
      </View>
      <ReviewCart
        individualRating={individualRating}
        data={reviews}
        navigation={navigation}
        service={data}
      />
      <View
        style={{
          backgroundColor: primaryColor,
          marginTop: 0,
        }}
      >
        {RelatedServices?.length > 0 && (
          <View>
            <Text
              style={{
                fontSize: Platform.OS == "ios" ? 22 : 20.5,
                fontFamily: "Poppins-SemiBold",
                color: textColor,
                paddingHorizontal: 20,
                paddingVertical: 15,
              }}
            >
              {isBn ? "সম্পর্কিত আরও সার্ভিস" : "Related Service"}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ width: 10 }} />
              {RelatedServices &&
                RelatedServices.map((doc, i) => (
                  <TopSellerCard
                    style={{}}
                    onPress={() => {
                      navigation.navigate("OtherProfile", {
                        serviceId: doc ? doc.service.id : null,
                        data: doc,
                      });
                    }}
                    key={i}
                    data={doc}
                  />
                ))}
              {!RelatedServices && (
                <View style={[customStyle.fullBox, { height: 220 }]}>
                  <ActivityLoader />
                </View>
              )}
            </ScrollView>
          </View>
        )}

        {UnRelatedServices && UnRelatedServices.length > 0 && (
          <View>
            <Text
              style={{
                fontSize: Platform.OS == "ios" ? 22 : 20.5,
                fontFamily: "Poppins-SemiBold",
                color: textColor,
                paddingHorizontal: 20,
                paddingVertical: 15,
              }}
            >
              {isBn ? "কিছু পছন্দের সার্ভিস" : "You Might Also Like"}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ width: 10 }} />
              {UnRelatedServices &&
                UnRelatedServices.map((doc, i) => (
                  // <RelatedService
                  //   data={doc}
                  //   key={i}
                  //   navigation={navigation}
                  // />
                  <TopSellerCard
                    style={{}}
                    onPress={() => {
                      navigation.navigate("OtherProfile", {
                        serviceId: doc ? doc.service.id : null,
                        data: doc,
                      });
                    }}
                    key={i}
                    data={doc}
                  />
                ))}
              {!UnRelatedServices && (
                <View style={[customStyle.fullBox, { height: 220 }]}>
                  <ActivityLoader />
                </View>
              )}
              <View style={{ width: 10 }} />
            </ScrollView>
          </View>
        )}
      </View>
      {!UnRelatedServices && (
        <View style={[customStyle.fullBox, { height: 300 }]}>
          <ActivityLoader />
        </View>
      )}
      <View style={{ height: 90 }} />
    </>
  );
};

function uniq(a) {
  return a.sort().filter(function (item, pos, ary) {
    return !pos || item != ary[pos - 1];
  });
}
const BargainingScreen = ({ navigation, route, params, component }) => {
  //const params = route.params;
  const Images = params.Images;
  const primaryColor = "#ffffff";
  const textColor = "#000000";
  const Title = params.Title;
  const [NewLines, setNewLines] = React.useState(3);
  const Description = params.Description;
  const [Facilities, setFacilities] = useState();
  const Data = params.Data;
  const Price = params.Price;
  const startingHeight = 120;
  const { language } = useLang();
  const isBn = language == "Bn";
  //const fullHeight = calculateHeight(Description, 25);
  const animatedHeight = React.useRef(
    new Animation.Value(startingHeight)
  ).current;
  const newUser = useSelector((state) => state.user);
  const [gigs, setGigs] = useState();
  //const gigs = Data?.service?.gigs?.filter((d) => d.type == "STARTING");
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    if (Data) {
      getOtherServices(newUser?.token, Data.service.id, "STARTING")
        .then((res) => {
          setGigs(res.data.gigs[0]);
          //console.log(res.data.gigs[0])
          setFacilities(convertServerFacilities(res.data.gigs[0].facilites));
        })
        .catch((err) => {
          console.warn(err.response.data);
        });
    }
  }, [Data?.service?.id]);

  if (!gigs) {
    return (
      <View style={[customStyle.fullBox, { height: 300, width: width }]}>
        <ActivityLoader />
      </View>
    );
  }

  return (
    <View>
      <View style={{ backgroundColor: primaryColor, marginBottom: -1 }}>
        <Text
          style={{
            fontSize: Platform.OS == "ios" ? 22 : 20.5,
            fontFamily: "Poppins-SemiBold",
            color: textColor,
            paddingHorizontal: 20,
            marginTop: 20,
          }}
        >
          {gigs?.title}
        </Text>

        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 15,
          }}
        >
          {/* <AnimatedHeight button={true} text={Description} /> */}
          <ReadMore content={gigs?.description} />
        </View>
        <Carousel
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          loop={false}
          width={width}
          height={width + 30}
          autoPlay={false}
          data={gigs?.images}
          scrollAnimationDuration={500}
          onSnapToItem={(index) => {}}
          renderItem={({ index }) => (
            <Pressable
              onPress={() => {
                setModalVisible(gigs?.images[index]);
                console.log(gigs?.images[index]);
              }}
            >
              <Image
                style={{
                  width: width,
                  height: width + 30,
                }}
                source={{ uri: gigs?.images[index] }}
              />
            </Pressable>
          )}
        />
      </View>
      <ServiceListViewer
        skills={gigs?.skills}
        serviceCategory={{ name: Data?.service?.category }}
        facilities={Facilities}
      />
      <View
        style={{
          backgroundColor: primaryColor,
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginVertical: 25,
        }}
      >
        {isBn ? (
          <Text
            style={{
              fontSize: Platform.OS == "ios" ? 17 : 15.5,
              color: textColor,
              fontFamily: "Poppins-SemiBold",
            }}
          >
            {gigs?.price} ৳ থেকে শুরু
          </Text>
        ) : (
          <Text
            style={{
              fontSize: Platform.OS == "ios" ? 17 : 15.5,
              color: textColor,
              fontFamily: "Poppins-SemiBold",
            }}
          >
            From {gigs?.price} ৳
          </Text>
        )}
      </View>
      <View style={{ backgroundColor: primaryColor }}>
        {newUser?.user?.id != Data?.service?.user?.id && (
          <IconButton
            onPress={() => {
              //params?.onOpen();
              if (!newUser?.token) {
                navigation.navigate("LogIn");
                return;
              }
              navigation.navigate("ServiceOrder", {
                data: Data,
                type: "STARTING",
                price: gigs?.price,
                title: gigs?.title,
                id: gigs?.id,
              });
            }}
            style={{
              borderRadius: 5,
              marginHorizontal: 20,
              backgroundColor: "#FEA31E",
              borderWidth: 0,
              marginVertical: 0,
              color: textColor,
              marginTop: 0,
              height: 40,
            }}
            title={isBn ? "দরদাম করুন" : "Offer Now"}
          />
        )}
      </View>
      {component}
      <Modal
        animationType="slide"
        visible={Boolean(modalVisible)}
        onRequestClose={() => setModalVisible()}
      >
        <PictureViewer onClose={() => setModalVisible()} url={modalVisible} />
      </Modal>
    </View>
  );
};

const FixedScreen = ({ navigation, route, params }) => {
  const { language } = useLang();
  const isBn = language == "Bn";
  //const params = route.params;
  const [FixedService, setFixedService] = useState();
  const onPress = params.onPress;
  const RelatedServices = params.RelatedServices;
  const UnRelatedServices = params.UnRelatedServices;
  const [content, setContent] = React.useState(2);
  const data = params.Data;
  const [Active, setActive] = React.useState(false);
  const newUser = useSelector((state) => state.user);
  React.useEffect(() => {
    if (data) {
      data.service.activeServiceTypes.map((doc, i) => {
        if (doc === "ONETIME") {
          setActive(true);
        } else {
          //setActive(false)
        }
      });
    }
  }, [data]);
  React.useEffect(() => {
    if (data) {
      getOtherServices(newUser?.token, data.service.id, "ONETIME")
        .then((res) => {
          setFixedService(res.data.gigs);
          //console.log(res.data.gigs);
        })
        .catch((err) => {
          setFixedService([]);
          console.warn(err.response.data);
        });
    }
  }, [data?.service?.id]);

  //console.log(FixedService?.length);
  if (!FixedService) {
    return (
      <View style={[customStyle.fullBox, { width: width, height: 300 }]}>
        <ActivityLoader />
      </View>
    );
  }
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginHorizontal: 10,
          marginVertical: 20,
        }}
      >
        {Active &&
          FixedService.map(
            (doc, i) =>
              i < content && (
                <ServiceCart onPress={() => onPress(doc)} key={i} data={doc} />
              )
          )}
        {Active && FixedService && FixedService.length > content && (
          <View
            style={{
              justifyContent: "center",
              marginVertical: 15,
              alignItems: "center",
              width: "100%",
            }}
          >
            <IconButton
              onPress={() => {
                setContent((val) => val + 2);
              }}
              style={{
                borderWidth: 0,
              }}
              Icon={() => <SvgXml xml={refreshIcon} height="20" width={"20"} />}
              title="Load More"
            />
          </View>
        )}
        {!Active && FixedService && FixedService.length > 0 && (
          <Animated.View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              paddingHorizontal: 10,
              backgroundColor: primaryColor,
              justifyContent: "center",
              width: "100%",
            }}
            entering={FadeIn}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SvgXml
                xml={serviceIcon}
                style={{ marginVertical: 100 }}
                height="200"
                width="200"
              />
            </View>
          </Animated.View>
        )}
        {FixedService && FixedService.length == 0 && (
          <Animated.View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              paddingHorizontal: 10,
              backgroundColor: primaryColor,
              justifyContent: "center",
              width: "100%",
            }}
            entering={FadeIn}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SvgXml
                xml={serviceIcon}
                style={{ marginVertical: 100 }}
                height="200"
                width="200"
              />
            </View>
          </Animated.View>
        )}

        <View
          style={{
            backgroundColor: primaryColor,
            marginTop: 0,
          }}
        >
          {RelatedServices?.length > 2 && (
            <View>
              <Text
                style={{
                  fontSize: Platform.OS == "ios" ? 22 : 20.5,
                  fontFamily: "Poppins-SemiBold",
                  color: textColor,
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                }}
              >
                Related Service
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {RelatedServices &&
                  RelatedServices.map((doc, i) =>
                    i < 6 ? (
                      <TopSellerCard
                        style={{
                          width: width / 2 - 22,
                          height: 260,
                        }}
                        onPress={() => {
                          navigation.navigate("OtherProfile", {
                            serviceId: doc ? doc.service.id : null,
                            data: doc,
                          });
                        }}
                        key={i}
                        data={doc}
                      />
                    ) : null
                  )}
                {!RelatedServices && (
                  <View style={[customStyle.fullBox, { height: 220 }]}>
                    <ActivityLoader />
                  </View>
                )}
              </View>
            </View>
          )}

          {UnRelatedServices && UnRelatedServices.length > 0 && (
            <View>
              <Text
                style={{
                  fontSize: Platform.OS == "ios" ? 22 : 20.5,
                  fontFamily: "Poppins-SemiBold",
                  color: textColor,
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                }}
              >
                {isBn ? "কিছু পছন্দের সার্ভিস" : "You Might Also Like"}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {UnRelatedServices.map((doc, i) =>
                  i < 50 ? (
                    <TopSellerCard
                      style={{
                        width: width / 2 - 22,
                        height: 260,
                      }}
                      onPress={() => {
                        navigation.navigate("OtherProfile", {
                          serviceId: doc ? doc.service.id : null,
                          data: doc,
                        });
                      }}
                      key={i}
                      data={doc}
                    />
                  ) : null
                )}
              </View>
            </View>
          )}
        </View>
      </View>
      {!UnRelatedServices && (
        <View style={[customStyle.fullBox, { height: 220 }]}>
          <ActivityLoader />
        </View>
      )}
      <View style={{ height: 70 }} />
    </View>
  );
};
const PackageScreen = ({ navigation, route, params }) => {
  //const params = route.params;
  const [PackageService, setPackageService] = useState();
  const onPress = params.onPress;
  const RelatedServices = params.RelatedServices;
  const UnRelatedServices = params.UnRelatedServices;
  const [content, setContent] = React.useState(2);
  const data = params.Data;
  const [Active, setActive] = React.useState(false);
  const newUser = useSelector((state) => state.newUser);
  //console.log(FixedService)
  React.useEffect(() => {
    if (data) {
      data.service.activeServiceTypes.map((doc, i) => {
        if (doc === "PACKAGE") {
          setActive(true);
        } else {
          //setActive(false)
        }
      });
    }
  }, [data]);
  React.useEffect(() => {
    if (data) {
      getOtherServices(newUser?.token, data.service.id, "PACKAGE")
        .then((res) => {
          setPackageService(res.data.gigs);
          //console.log(res.data.gigs);
        })
        .catch((err) => {
          setPackageService([]);
          console.warn(err.response.data);
        });
    }
  }, [data?.service?.id]);
  if (!PackageService) {
    return (
      <View style={[customStyle.fullBox, { height: 300, width: width }]}>
        <ActivityLoader />
      </View>
    );
  }

  return (
    <View>
      <View
        style={{
          marginHorizontal: 10,
          flexDirection: "row",
          flexWrap: "wrap",
          marginVertical: 20,
        }}
      >
        {Active &&
          PackageService &&
          PackageService.map(
            (doc, i) =>
              i < content && (
                <ServiceCart
                  onPress={() => {
                    if (onPress) {
                      onPress(doc);
                    }
                  }}
                  key={i}
                  data={doc}
                />
              )
          )}
        {Active && PackageService && PackageService.length > content && (
          <View
            style={{
              justifyContent: "center",
              marginVertical: 15,
              alignItems: "center",
              width: "100%",
            }}
          >
            <IconButton
              onPress={() => {
                setContent((val) => val + 2);
              }}
              style={{
                borderWidth: 0,
              }}
              Icon={() => <SvgXml xml={refreshIcon} height="20" width={"20"} />}
              title="Load More"
            />
          </View>
        )}
        {PackageService && PackageService.length == 0 && (
          <Animated.View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              paddingHorizontal: 10,
              backgroundColor: primaryColor,
              justifyContent: "center",
              width: "100%",
            }}
            entering={FadeIn}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SvgXml
                xml={serviceIcon}
                style={{ marginVertical: 100 }}
                height="200"
                width="200"
              />
            </View>
          </Animated.View>
        )}
        {PackageService && PackageService.length > 0 && !Active && (
          <Animated.View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              paddingHorizontal: 10,
              backgroundColor: primaryColor,
              justifyContent: "center",
              width: "100%",
            }}
            entering={FadeIn}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SvgXml
                xml={serviceIcon}
                style={{ marginVertical: 100 }}
                height="200"
                width="200"
              />
            </View>
          </Animated.View>
        )}

        <View
          style={{
            backgroundColor: primaryColor,
            marginTop: 0,
          }}
        >
          {RelatedServices && RelatedServices.length > 2 && (
            <View>
              <Text
                style={{
                  fontSize: Platform.OS == "ios" ? 22 : 20.5,
                  fontFamily: "Poppins-SemiBold",
                  color: textColor,
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                }}
              >
                Related Service
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {RelatedServices &&
                  RelatedServices.map((doc, i) =>
                    i < 6 ? (
                      <TopSellerCard
                        style={{
                          width: width / 2 - 22,
                          height: 260,
                        }}
                        onPress={() => {
                          navigation.navigate("OtherProfile", {
                            serviceId: doc ? doc.service.id : null,
                            data: doc,
                          });
                        }}
                        key={i}
                        data={doc}
                      />
                    ) : null
                  )}
                {!RelatedServices && (
                  <View style={[customStyle.fullBox, { height: 220 }]}>
                    <ActivityLoader />
                  </View>
                )}
              </View>
            </View>
          )}

          {UnRelatedServices && UnRelatedServices.length > 0 && (
            <View>
              <Text
                style={{
                  fontSize: Platform.OS == "ios" ? 22 : 20.5,
                  fontFamily: "Poppins-SemiBold",
                  color: textColor,
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                }}
              >
                You Might Also Like
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {UnRelatedServices.map((doc, i) =>
                  i < 50 ? (
                    <TopSellerCard
                      style={{
                        width: width / 2 - 22,
                        height: 260,
                      }}
                      onPress={() => {
                        navigation.navigate("OtherProfile", {
                          serviceId: doc ? doc.service.id : null,
                          data: doc,
                        });
                      }}
                      key={i}
                      data={doc}
                    />
                  ) : null
                )}
              </View>
            </View>
          )}
        </View>
      </View>
      {!UnRelatedServices && (
        <View style={[customStyle.fullBox, { height: 220 }]}>
          <ActivityLoader />
        </View>
      )}
      <View style={{ height: 70 }} />
    </View>
  );
};

const refreshIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="14.646" height="12.902" viewBox="0 0 14.646 12.902">
<g id="_000000ff" data-name="#000000ff" transform="translate(-6.437 -13.36)">
  <path id="Path_20932" data-name="Path 20932" d="M7.3,16.648A6.652,6.652,0,0,1,12,13.435a6.386,6.386,0,0,1,4.863,1.255A6.488,6.488,0,0,1,19.4,19.44a6.819,6.819,0,0,1-.251,2.145,5.047,5.047,0,0,1,1.385-.372.691.691,0,0,1,.219,1.262c-.91.363-1.858.638-2.789.947a.672.672,0,0,1-.862-.43c-.329-.936-.676-1.868-.974-2.814a.688.688,0,0,1,1.185-.581,11.864,11.864,0,0,1,.537,1.431,5.132,5.132,0,0,0-3.427-6.068,5.005,5.005,0,0,0-3.255.068,5.167,5.167,0,0,0-3.194,3.459,5.033,5.033,0,0,0,.641,4.083,5.243,5.243,0,0,0,4.394,2.364c.7.033.752,1.186.08,1.318a6.477,6.477,0,0,1-6.378-4.575A6.315,6.315,0,0,1,7.3,16.648Z" transform="translate(0)" fill="#4ade80"/>
</g>
</svg>
`;
const messageIcon = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="58.546" height="58.546" viewBox="0 0 58.546 58.546">
<defs>
  <filter id="Path_20915" x="0" y="0" width="58.546" height="58.546" filterUnits="userSpaceOnUse">
    <feOffset dy="3" input="SourceAlpha"/>
    <feGaussianBlur stdDeviation="3" result="blur"/>
    <feFlood flood-opacity="0.161"/>
    <feComposite operator="in" in2="blur"/>
    <feComposite in="SourceGraphic"/>
  </filter>
</defs>
<g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Path_20915)">
  <path id="Path_20915-2" data-name="Path 20915" d="M11.075,2.3a4.556,4.556,0,0,1,7.911,0L29.358,20.448c1.736,3.037-.663,7.827-3.956,6.816L15.17,23.4,4.657,27.264C.511,27.6-1.034,23.485.7,20.448Z" transform="translate(28.38 6) rotate(45)" fill="#fff"/>
</g>
</svg>
`;
