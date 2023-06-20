import React, { useState } from "react";
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

const { width, height } = Dimensions.get("window");
const OtherProfile = (props) => {
  const window = Dimensions.get("window");
  const newUser = useSelector((state) => state.user);
  const [image, setImage] = React.useState(null);
  const [backgroundImage, setBackgroundImage] = React.useState(null);
  const [Lines, setLines] = React.useState(3);
  const navigation = props.navigation;
  const initialState = [
    {
      title: "Bargaining",
      value: true,
      type: "STARTING",
    },
    {
      title: "Fixed",
      value: false,
      type: "ONETIME",
    },
    {
      title: "Package",
      value: false,
      type: "PACKAGE",
    },
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
  const [Active, setActive] = React.useState("Bargaining");
  const [Facilities, setFacilities] = React.useState([]);
  const [NewDataList, setNewDataList] = React.useState(null);
  const [ServiceList, setServiceList] = React.useState([]);
  const [SubServiceList, setSubServiceList] = React.useState([]);
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
  const vendor = useSelector((state) => state.vendor);
  const [Click, setClick] = React.useState(false);
  const [Title, setTitle] = React.useState();
  const [Description, setDescription] = React.useState();
  const [Price, setPrice] = React.useState();
  const [Category, setCategory] = React.useState();
  const [Bargaining, setBargaining] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [Refresh, setRefresh] = React.useState(false);
  const [RelatedServices, setRelatedServices] = React.useState();
  const [UnRelatedServices, setUnRelatedServices] = React.useState();
  const [PackageService, setPackageService] = React.useState();
  const scrollRef = React.useRef();
  const [specialtyHeight, setSpecialtyHeight] = React.useState(75);
  const [specialtyAnimation, setSpecialtyAnimation] = React.useState(
    new Animation.Value(specialtyHeight)
  );
  const [aboutHeight, setAboutHeight] = React.useState(120);

  const params = props.route.params;
  const data = params.data;
  const [newNavigation, setNewNavigation] = React.useState(1100);
  const scroll = React.useRef();
  const [scrollEnabled, setScrollEnabled] = React.useState(false);
  const [offset, setOffset] = React.useState();
  const [statusBarHeight, setStatusBarHeight] = React.useState(0);
  const isFocused = useIsFocused();
  const [userInfo, setUserInfo] = useState();
  const [individualRating, setIndividualRating] = useState();
  const [reviews, setReviews] = useState();

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
      getService(newUser.token, serviceId)
        .then((response) => {
          if (response.data) {
            setLoader(false);
            const gigs = response.data.service.gigs.filter(
              (d) => d.type == "STARTING"
            );
            setData(response.data);

            setBackgroundImage(response.data.service.wallPhoto);
            setImage(response.data.service.profilePhoto);
            setImages(gigs[0].images);
            setPrice(gigs[0].price);
            setTitle(gigs[0].title);
            setDescription(gigs[0].description);
            //setNewDataList(response.data.service.gigs[0].services.options)
            setFacilities(convertServerFacilities(gigs[0].facilites));
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
  }, [serviceId + data, Refresh]);

  React.useEffect(() => {
    if (newUser && Data) {
      getOtherServices(newUser.token, data.service.id, "ONETIME")
        .then((res) => {
          setFixedService(res.data.gigs);
          //console.log(res.data.gigs);
        })
        .catch((err) => {
          setFixedService([]);
          console.warn(err.response.data);
        });
    }
  }, [Active + data + newUser + serviceId + Data]);
  React.useEffect(() => {
    if (newUser && data) {
      getOtherServices(newUser.token, data.service.id, "PACKAGE")
        .then((res) => {
          setPackageService(res.data.gigs);
          //console.log(res.data.gigs);
        })
        .catch((err) => {
          setPackageService([]);
          console.warn(err.response.data);
        });
    }
  }, [data + newUser + serviceId + Data, Refresh]);
  React.useEffect(() => {
    if (newUser && data) {
      //setLoader(true);
      getRelatedServices(newUser.token, data.service.id, data.service.dashboard)
        .then((response) => {
          if (response.data) {
            setLoader(false);
            setRelatedServices(response.data.gigs);
          }
        })
        .catch((err) => {
          console.warn(err.response);
          setLoader(false);
        });
      setLoader(true);
      getUnRelatedServices(
        newUser.token,
        data.service.id,
        data.service.dashboard
      )
        .then((response) => {
          if (response.data) {
            setLoader(false);
            //console.log(response.data.gigs[0])
            setUnRelatedServices(response.data.gigs);
          }
        })
        .catch((err) => {
          setLoader(false);
          console.warn(err.response);
        });
    }
  }, [data + serviceId + Data, Refresh]);
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

  if (
    !Data
  ) {
    return <ProfileSkeleton />;
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
              }}>
              <Pressable
                onPress={() => {
                  if (!newUser.token || !userInfo) {
                    navigation.navigate("LogIn");
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
                }}>
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
                  Price: Price,
                  Description: Description,
                  Facilities: Facilities,
                  Title: Title,
                  Images: Images,
                }}
              />,
              <FixedScreen
                navigation={navigation}
                params={{
                  Data: Data,
                  FixedService: FixedService,
                  onPress: clickFixed,
                  RelatedServices: RelatedServices,
                  UnRelatedServices: UnRelatedServices,
                }}
              />,
              <PackageScreen
                navigation={navigation}
                params={{
                  Data: Data,
                  onPress: clickPackage,
                  PackageService: PackageService,
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

  return (
    <>
      <View
        style={{
          backgroundColor: primaryColor,
          marginTop: 0,
          paddingVertical: 25,
          paddingTop: 25,
        }}>
        <RatingView
          style={{
            marginHorizontal: 20,
          }}
          title="Seller Communication"
          rate={individualRating?.communicationRating}
        />
        <RatingView
          style={{
            marginHorizontal: 20,
            marginTop: 5,
          }}
          title="Service As Describe"
          rate={individualRating?.describeRating}
        />
        <RatingView
          style={{
            marginHorizontal: 20,
            marginTop: 5,
          }}
          title="Service Quality"
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
        }}>
        {RelatedServices?.length > 0 && (
          <View>
            <Text
              style={{
                fontSize: Platform.OS == "ios" ? 22 : 20.5,
                fontFamily: "Poppins-SemiBold",
                color: textColor,
                paddingHorizontal: 20,
                paddingVertical: 15,
              }}>
              Related Service
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
              }}>
              You Might Also Like
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
  const Facilities = params.Facilities;
  const Data = params.Data;
  const Price = params.Price;
  const startingHeight = 120;
  //const fullHeight = calculateHeight(Description, 25);
  const animatedHeight = React.useRef(
    new Animation.Value(startingHeight)
  ).current;
  const newUser = useSelector((state) => state.user);
  const gigs = Data.service.gigs.filter((d) => d.type == "STARTING");
  const [modalVisible, setModalVisible] = useState(false);
  //console.log(Data);
  // React.useEffect(() => {
  //   Animation.spring(animatedHeight, {
  //     speed: 1100,
  //     toValue: NewLines != 3 ? fullHeight : startingHeight,
  //     useNativeDriver: false,
  //   }).start();
  // }, [NewLines]);

  //console.log(newHeight);

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
          }}>
          {Title}
        </Text>

        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 15,
          }}>
          {/* <AnimatedHeight button={true} text={Description} /> */}
          <ReadMore content={Description} />
        </View>
        <Carousel
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          loop={false}
          width={width}
          height={width + 30}
          autoPlay={false}
          data={Images}
          scrollAnimationDuration={500}
          onSnapToItem={(index) => {}}
          renderItem={({ index }) => (
            <Pressable
              onPress={() => {
                setModalVisible(Images[index]);
                console.log(Images[index]);
              }}>
              <Image
                style={{
                  width: width,
                  height: width + 30,
                }}
                source={{ uri: Images[index] }}
              />
            </Pressable>
          )}
        />
      </View>
      <ServiceListViewer
        skills={gigs[0].skills}
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
        }}>
        <Text
          style={{
            fontSize: Platform.OS == "ios" ? 17 : 15.5,
            color: textColor,
            fontFamily: "Poppins-SemiBold",
          }}>
          From {Price} ৳
        </Text>
      </View>
      <View style={{ backgroundColor: primaryColor }}>
        {newUser?.user?.id != Data?.service?.user?.id && (
          <IconButton
            onPress={() => {
              //params?.onOpen();
              navigation.navigate("ServiceOrder", {
                data: Data,
                type: "STARTING",
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
            title="Offer Now"
          />
        )}
      </View>
      {component}
      <Modal
        animationType="slide"
        visible={Boolean(modalVisible)}
        onRequestClose={() => setModalVisible()}>
        <PictureViewer onClose={() => setModalVisible()} url={modalVisible} />
      </Modal>
    </View>
  );
};

const FixedScreen = ({ navigation, route, params }) => {
  //const params = route.params;
  const FixedService = params.FixedService;
  const onPress = params.onPress;
  const RelatedServices = params.RelatedServices;
  const UnRelatedServices = params.UnRelatedServices;
  const [content, setContent] = React.useState(2);
  const data = params.Data;
  const [Active, setActive] = React.useState(false);

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

  //console.log(FixedService?.length);
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginHorizontal: 10,
          marginVertical: 20,
        }}>
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
            }}>
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
            entering={FadeIn}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}>
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
            entering={FadeIn}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}>
              <SvgXml
                xml={serviceIcon}
                style={{ marginVertical: 100 }}
                height="200"
                width="200"
              />
            </View>
          </Animated.View>
        )}
        {!FixedService && (
          <View style={customStyle.fullBox}>
            <ActivityLoader />
          </View>
        )}
        <View
          style={{
            backgroundColor: primaryColor,
            marginTop: 0,
          }}>
          {RelatedServices?.length > 2 && (
            <View>
              <Text
                style={{
                  fontSize: Platform.OS == "ios" ? 22 : 20.5,
                  fontFamily: "Poppins-SemiBold",
                  color: textColor,
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                }}>
                Related Service
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}>
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
                }}>
                You Might Also Like
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}>
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
          {!UnRelatedServices && (
            <View style={[customStyle.fullBox, { height: 220 }]}>
              <ActivityLoader />
            </View>
          )}
        </View>
      </View>
      <View style={{ height: 70 }} />
    </View>
  );
};
const PackageScreen = ({ navigation, route, params }) => {
  //const params = route.params;
  const PackageService = params.PackageService;
  const onPress = params.onPress;
  const RelatedServices = params.RelatedServices;
  const UnRelatedServices = params.UnRelatedServices;
  const [content, setContent] = React.useState(2);
  const data = params.Data;
  const [Active, setActive] = React.useState(false);

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

  return (
    <View>
      <View
        style={{
          marginHorizontal: 10,
          flexDirection: "row",
          flexWrap: "wrap",
          marginVertical: 20,
        }}>
        {Active &&PackageService&&
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
        {Active &&PackageService&& PackageService.length > content && (
          <View
            style={{
              justifyContent: "center",
              marginVertical: 15,
              alignItems: "center",
              width: "100%",
            }}>
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
        {PackageService&&PackageService.length == 0 && (
          <Animated.View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              paddingHorizontal: 10,
              backgroundColor: primaryColor,
              justifyContent: "center",
              width: "100%",
            }}
            entering={FadeIn}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}>
              <SvgXml
                xml={serviceIcon}
                style={{ marginVertical: 100 }}
                height="200"
                width="200"
              />
            </View>
          </Animated.View>
        )}
        {PackageService&&PackageService.length > 0 && !Active && (
          <Animated.View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              paddingHorizontal: 10,
              backgroundColor: primaryColor,
              justifyContent: "center",
              width: "100%",
            }}
            entering={FadeIn}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}>
              <SvgXml
                xml={serviceIcon}
                style={{ marginVertical: 100 }}
                height="200"
                width="200"
              />
            </View>
          </Animated.View>
        )}
        {!PackageService && (
          <View style={customStyle.fullBox}>
            <ActivityLoader />
          </View>
        )}
        <View
          style={{
            backgroundColor: primaryColor,
            marginTop: 0,
          }}>
          {RelatedServices && RelatedServices.length > 2 && (
            <View>
              <Text
                style={{
                  fontSize: Platform.OS == "ios" ? 22 : 20.5,
                  fontFamily: "Poppins-SemiBold",
                  color: textColor,
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                }}>
                Related Service
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}>
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
                }}>
                You Might Also Like
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}>
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
          {!UnRelatedServices && (
            <View style={[customStyle.fullBox, { height: 220 }]}>
              <ActivityLoader />
            </View>
          )}
        </View>
      </View>
      <View style={{ height: 70 }} />
    </View>
  );
};
const calculateHeight = (text, plus, minus) => {
  let textLength = text.split("").length;
  textLength = parseInt(textLength);
  let lineHeight = Platform.OS == "ios" ? 26 : 26;
  let letterWidth = Platform.OS == "ios" ? 8 : 8;
  let height = ((textLength * letterWidth) / (width - 40)) * lineHeight;
  if (plus) {
    return height + plus;
  }
  if (minus) {
    return height - minus;
  }
  return height;
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
