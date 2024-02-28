import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  FlatList,
  SafeAreaView,
  RefreshControl,
  Alert,
  Pressable,
  Animated as Animation,
  Platform,
  Easing,
  StatusBar as Bar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  primaryColor,
  backgroundColor,
  assentColor,
  secondaryColor,
  textColor,
} from "../../assets/colors";
import ProfileOption from "../../components/ProfileOption";
import { AntDesign } from "@expo/vector-icons";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import Button from "../../components/Button";
import RatingView from "../../components/RatingView";
import { user, calenderIcon, noticeIcon, serviceIcon } from "../../assets/icon";
import { SvgXml } from "react-native-svg";
import ReviewCart from "../../Cart/ReviewCart";
import RelatedService from "../../Cart/RelatedService";
import IconButton from "../../components/IconButton";
import { Menu } from "react-native-paper";
import { Rows, ServiceTable, TabBar, TabScreen } from "../VendorProfile";
import Animated, {
  FadeIn,
  StretchInY,
  FlipInEasyX,
  Transition,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import ServiceCart from "../../Cart/ServiceCart";
import {
  getService,
  getOtherServices,
  getRelatedServices,
  getUnRelatedServices,
  getGigs,
  getGigById,
} from "../../Class/service";
import { useSelector, useDispatch } from "react-redux";
import {
  convertServerFacilities,
  serverToLocal,
} from "../../Class/dataConverter";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();
import useHandleScroll from "../../components/constants/FabView";
import Carousel from "react-native-reanimated-carousel";
import AnimatedHeight from "../../Hooks/AnimatedHeight";
import { StatusBar } from "expo-status-bar";
import { MotiView } from "moti";
import { useIsFocused } from "@react-navigation/native";
import { setHideBottomBar } from "../../Reducers/hideBottomBar";
import FixedBackHeader from "../Seller/components/FixedBackHeader";
import ActivityLoader from "../../components/ActivityLoader";
import ServiceListViewer from "../../components/ServiceListViewer";
import ReadMore from "../../components/ReadMore";
import useLang from "../../Hooks/UseLang";

const { width, height } = Dimensions.get("window");
const VendorFixedService = (props) => {
  const { language } = useLang();
  const isBn = language == "Bn";
  const newUser = useSelector((state) => state.user);
  const [image, setImage] = React.useState(null);
  const [backgroundImage, setBackgroundImage] = React.useState(null);
  const navigation = props.navigation;
  const [Visible, setVisible] = React.useState(false);
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
    {
      title: "Installment",
      value: false,
      type: "INSTALLMENT",
    },
    {
      title: "Subscription",
      value: false,
      type: "SUBS",
    },
  ];
  const [Facilities, setFacilities] = React.useState([]);
  const [NewDataList, setNewDataList] = React.useState(null);
  const [ServiceList, setServiceList] = React.useState([]);
  const [ActiveService, setActiveService] = React.useState();
  const [SubServiceList, setSubServiceList] = React.useState([]);
  const serviceId =
    props.route && props.route.params.serviceId
      ? props.route.params.serviceId
      : null;
  // const user= useSelector((state) => state.user);
  const [Loader, setLoader] = React.useState(true);
  const [Data, setData] = React.useState();
  const [Images, setImages] = React.useState([]);
  const dispatch = useDispatch();
  const [ActiveServiceData, setActiveServiceData] = React.useState(null);
  const vendor = useSelector((state) => state.vendor);
  const [Click, setClick] = React.useState(false);
  const [Title, setTitle] = React.useState();
  const [Description, setDescription] = React.useState();
  const [Price, setPrice] = React.useState();
  const [Category, setCategory] = React.useState();
  const [Refresh, setRefresh] = React.useState(false);
  const [RelatedServices, setRelatedServices] = React.useState();
  const [UnRelatedServices, setUnRelatedServices] = React.useState();
  const [Gigs, setGigs] = React.useState();
  const scrollRef = React.useRef();
  const [isActionButtonVisible, setIsActionButtonVisible] =
    React.useState(false);

  const { handleScroll, showButton } = useHandleScroll();
  const [Specialty, setSpecialty] = React.useState(
    "Mobile,Tv,Application,Name,Mobile Number,++++,*****"
  );
  const params = props.route.params;
  //const data = params.data;
  const [data, setNData] = useState(params.data);
  const [newNavigation, setNewNavigation] = React.useState(1100);
  const [imageIndex, setImageIndex] = React.useState(0);
  const [scrollEnabled, setScrollEnabled] = React.useState(false);
  const [offset, setOffset] = React.useState(0);
  const [ServiceTableHeight, setServiceTableHeight] = React.useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [scrollDirection, setScrollDirection] = React.useState(false);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    if (isFocused) {
      dispatch(setHideBottomBar(true));
    } else {
      dispatch(setHideBottomBar(false));
    }
  }, [isFocused]);

  //console.log(SeeMore)
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setRefresh((val) => !val);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  React.useEffect(() => {
    setScrollEnabled(false);
    setActiveServiceData(null);
    //console.log(data);
    if (data) {
      //console.log(data);
      setData(data);
      setSpecialty(data.service.speciality);
      setBackgroundImage(data.service.wallPhoto);
      setImage(data.service.profilePhoto);
      let img = [];
      // img.push(newImage1)
      // img.push(newImage2)
      // img.push(newImage3)
      // img.push(newImage4)
      //console.log(data.images)
      setImages(data.images);
      setPrice(data.price);
      setTitle(data.title);
      setDescription(data.description);
      //setNewDataList(response.data.service.gigs[0].services.options)
      setFacilities(convertServerFacilities(data.facilites));
      let arr = initialState;
      data.service.activeServiceTypes.forEach((doc) => {
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

      setActiveServiceData(arr);
    }
  }, [data, isFocused]);
  useEffect(() => {
    if (data) {
      getGigById(newUser.token, data.id)
        .then((res) => {
          setNData(res.data.gig);
          setFacilities(convertServerFacilities(res.data.gig.facilites));
          //console.log(res.data.gig.facilites)
        })
        .catch((err) => {
          console.error(err.response.data.msg);
        });
    }
  }, [isFocused]);

  if (!Data) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityLoader />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: primaryColor }}>
      {/* {Platform.OS == "ios" && scrollEnabled && (
       <View style={{height:25}}/>
      )} */}

      <ScrollView
        scrollEventThrottle={16}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        ref={scrollRef}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: "transparent",
          flex: 1,
        }}
        onScroll={(e) => {
          handleScroll(e);
          const currentOffset = e.nativeEvent.contentOffset.y;
          const dif = currentOffset - (offset || 0);

          if (Math.abs(dif) < 3) {
            //setScrollEnabled(false);
          } else if (dif < 0) {
            //setScrollDirection(true);
            //console.log("up")
            // if (currentOffset < 380) {
            //   setScrollEnabled(false);
            // }
          } else {
            //setScrollDirection(false);
            //console.log("down")
          }

          setOffset(currentOffset);
        }}
      >
        <Carousel
          style={{
            backgroundColor: "black",
          }}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          loop={false}
          width={width}
          height={height - (height * 30) / 100}
          autoPlay={false}
          data={Images}
          scrollAnimationDuration={500}
          onSnapToItem={(index) => {
            setImageIndex(index);
          }}
          renderItem={({ index }) => (
            <Image
              source={{ uri: Images[index] }}
              fit="cover"
              x={0}
              y={0}
              width={width}
              height={height - (height * 30) / 100}
              style={{
                width: width,
                height: height - (height * 30) / 100,
                opacity: 0.87,
                backgroundColor: "black",
              }}
            />
          )}
        />

        <View
          style={{
            position: "absolute",
            zIndex: 1,
            right: 20,
            backgroundColor: "#707070",
            paddingHorizontal: 10,
            paddingVertical: 3,
            borderRadius: 20,
            top: height - ((height * 30) / 100 + 70),
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins-Medium",
              fontSize: 14,
              color: primaryColor,
            }}
          >
            {imageIndex + 1} Of 4
          </Text>
        </View>
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 10,
            height: height - (height * 30) / 100,
            justifyContent: "center",
            elevation: 2,
            zIndex: 100,
          }}
        >
          <Menu
            contentStyle={{
              backgroundColor: primaryColor,
            }}
            visible={Visible}
            onDismiss={() => {
              setVisible(!Visible);
            }}
            anchor={
              <SvgXml
                onPress={() => {
                  setVisible(!Visible);
                  //console.log("sadfa");
                }}
                style={{
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowColor: "#DDDDDD",
                  shadowRadius: Platform.OS == "ios" ? 4 : 20,
                  elevation: 0,
                  shadowOpacity: Platform.OS == "ios" ? 0.5 : 1,
                  marginLeft: 0,
                }}
                xml={threeDot}
                height={Platform.OS == "ios" ? "50" : "45"}
                width={Platform.OS == "ios" ? "50" : "45"}
              />
            }
          >
            <Menu.Item
              onPress={() => {
                navigation.navigate("Support_1");
                setVisible(!Visible);
              }}
              title="Report"
            />
            <Menu.Item onPress={() => {}} title="Copy URL" />
          </Menu>

          <SvgXml
            style={{
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowColor: "#DDDDDD",
              shadowRadius: Platform.OS == "ios" ? 4 : 20,
              elevation: 5,
              shadowOpacity: Platform.OS == "ios" ? 0.5 : 1,
            }}
            xml={loveIcon}
            height={Platform.OS == "ios" ? "50" : "45"}
            width={Platform.OS == "ios" ? "50" : "45"}
          />
          <SvgXml
            style={{
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowColor: "#DDDDDD",
              shadowRadius: Platform.OS == "ios" ? 4 : 20,
              elevation: 0,
              shadowOpacity: Platform.OS == "ios" ? 0.5 : 1,
            }}
            xml={shareIcon}
            height={Platform.OS == "ios" ? "50" : "45"}
            width={Platform.OS == "ios" ? "50" : "45"}
          />

          <SvgXml
            onPress={() => {
              navigation.navigate("ChatScreen", { data: Data });
            }}
            style={{
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowColor: Platform.OS == "ios" ? "#DDDDDD" : "#000000",
              shadowRadius: Platform.OS == "ios" ? 4 : 30,
              elevation: 0,
              shadowOpacity: Platform.OS == "ios" ? 0.5 : 1,
            }}
            xml={messageIcon}
            height={Platform.OS == "ios" ? "50" : "45"}
            width={Platform.OS == "ios" ? "50" : "45"}
          />
        </View>

        <View
          style={{
            backgroundColor: primaryColor,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            marginTop: -30,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: primaryColor,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#BEBBBB",
                fontSize: 16,
                fontFamily: "Poppins-SemiBold",
                marginTop: 10,
              }}
            >
              {isBn ? "#একদাম সার্ভিস" : "#Fixed Service"}
            </Text>

            <TouchableOpacity
              style={{}}
              onPress={() => {
                navigation.navigate("EditService", { data: data, gigs: data });
              }}
            >
              <SvgXml
                xml={isBn ? editIconBn : editIcon}
                height="50"
                width={isBn ? "70" : "50"}
              />
            </TouchableOpacity>
          </View>
          <View style={{ backgroundColor: primaryColor, marginBottom: -1 }}>
            <Text
              style={{
                fontSize: Platform.OS == "ios" ? 22 : 20.5,
                fontFamily: "Poppins-SemiBold",
                color: textColor,
                paddingHorizontal: 20,
                marginTop: 15,
              }}
            >
              {Title}
            </Text>

            <View
              style={{
                marginHorizontal: 20,
                paddingTop: 15,
              }}
            >
              {/* <AnimatedHeight
                onChange={(height) => {
                  //setNewNavigation(newHeight + 55 + height);
                  //console.log(height)
                  //setTextHeight(height);
                }}
                button={true}
                text={Description}
              /> */}
              <ReadMore content={Description} />
            </View>
          </View>
          <ServiceListViewer
            onEdit={() => {
              navigation.navigate("EditServiceList", {
                skills: data.skills,
                category: data?.service?.category,
                facilities: Facilities,
                name: "VendorOrderDetails",
                data: "ONETIME",
                gigs: data,
              });
            }}
            editable={true}
            skills={Data?.skills}
            facilities={Facilities}
            serviceCategory={{ name: data?.service?.category }}
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
                একদাম {Price} ৳
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: Platform.OS == "ios" ? 17 : 15.5,
                  color: textColor,

                  fontFamily: "Poppins-SemiBold",
                }}
              >
                {Price} ৳
              </Text>
            )}
          </View>
        </View>

        <View style={{ height: 2, backgroundColor: "#FAFAFA" }} />

        <View style={{ height: 70 }} />
      </ScrollView>
      {/* {showButton && (
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
              navigation.navigate("ChatScreen", { data: Data });
            }}
          >
            <SvgXml xml={messageIcon} height="50" width={"50"} />
          </Pressable>
        </Animated.View>
      )} */}
      <FixedBackHeader navigation={navigation} Yoffset={offset ? offset : 0} />
    </View>
  );
};

export default VendorFixedService;
const styles = StyleSheet.create({
  activeContent: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 100,
  },
  inactiveContent: {},
  backgroundContainer: {
    minHeight: 300,
  },
  container: {
    minHeight: 30,
    backgroundColor: primaryColor,
  },
  profile: {
    borderWidth: 1,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowColor: backgroundColor,
    width: 110,
    height: 110,
    marginTop: -55,
    alignSelf: "center",
    backgroundColor: primaryColor,
    borderColor: backgroundColor,
    borderRadius: 55,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: assentColor,
    width: 30,
    height: 30,
    borderRadius: 15,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 5,
    shadowColor: backgroundColor,
    elevation: 5,
    shadowOpacity: 0.1,
  },
  iconTop: {
    position: "absolute",
    right: 20,
    top: 50,
    zIndex: 4,
  },
  iconBottom: {
    position: "absolute",
    zIndex: 4,
    bottom: -10,
    right: -10,
  },
  headLine: {
    fontSize: Platform.OS == "ios" ? 22 : 20.5,
    fontFamily: "Poppins-SemiBold",
  },
  text: {
    textAlign: "center",
    fontSize: Platform.OS == "ios" ? 14 : 13,
    fontFamily: "Poppins-Medium",
  },
  image: {
    width: 110,
    height: 110,
  },
  starIcon: {
    marginRight: 3,
  },
  activeButton: {
    color: "#666666",
    backgroundColor: "#4ADE80",
    borderRadius: 15,
    borderWidth: 0,
    marginBottom: 5,
    alignItems: "flex-start",
    paddingLeft: 10,
    paddingRight: 10,
    height: 30,
    fontSize: Platform.OS == "ios" ? 13.5 : 12,
    fontFamily: "Poppins-SemiBold",
  },
  inactiveButton: {
    color: textColor,
    borderRadius: 5,
    borderWidth: 0,
    marginBottom: 5,
    alignItems: "flex-start",
    paddingLeft: 10,
    paddingRight: 10,
    height: 30,
    fontSize: Platform.OS == "ios" ? 13.5 : 12,
    fontFamily: "Poppins-SemiBold",
  },
});

function uniq(a) {
  return a.sort().filter(function (item, pos, ary) {
    return !pos || item != ary[pos - 1];
  });
}

const threeDot = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="28.227" height="16.127" viewBox="0 0 28.227 16.127">
<defs>
  <filter id="Path_6118" x="12.097" y="0" width="16.13" height="16.127" filterUnits="userSpaceOnUse">
    <feOffset dy="3" input="SourceAlpha"/>
    <feGaussianBlur stdDeviation="2" result="blur"/>
    <feFlood flood-opacity="0.161"/>
    <feComposite operator="in" in2="blur"/>
    <feComposite in="SourceGraphic"/>
  </filter>
  <filter id="Path_6119" x="6.05" y="0" width="16.127" height="16.127" filterUnits="userSpaceOnUse">
    <feOffset dy="3" input="SourceAlpha"/>
    <feGaussianBlur stdDeviation="2" result="blur-2"/>
    <feFlood flood-opacity="0.161"/>
    <feComposite operator="in" in2="blur-2"/>
    <feComposite in="SourceGraphic"/>
  </filter>
  <filter id="Path_6120" x="0" y="0" width="16.13" height="16.127" filterUnits="userSpaceOnUse">
    <feOffset dy="3" input="SourceAlpha"/>
    <feGaussianBlur stdDeviation="2" result="blur-3"/>
    <feFlood flood-opacity="0.161"/>
    <feComposite operator="in" in2="blur-3"/>
    <feComposite in="SourceGraphic"/>
  </filter>
</defs>
<g id="Group_10261" data-name="Group 10261" transform="translate(-387.386 -69.709)">
  <g transform="matrix(1, 0, 0, 1, 387.39, 69.71)" filter="url(#Path_6118)">
    <path id="Path_6118-2" data-name="Path 6118" d="M201.177,0h.1A2.08,2.08,0,0,1,202.6.52a2.063,2.063,0,1,1-2.734,0A2.081,2.081,0,0,1,201.177,0Z" transform="translate(22.23 -196.17) rotate(90)" fill="#fff"/>
  </g>
  <g transform="matrix(1, 0, 0, 1, 387.39, 69.71)" filter="url(#Path_6119)">
    <path id="Path_6119-2" data-name="Path 6119" d="M200.991,199.166a2.063,2.063,0,1,1-1.563,1.044A2.066,2.066,0,0,1,200.991,199.166Z" transform="translate(215.33 -196.17) rotate(90)" fill="#fff"/>
  </g>
  <g transform="matrix(1, 0, 0, 1, 387.39, 69.71)" filter="url(#Path_6120)">
    <path id="Path_6120-2" data-name="Path 6120" d="M199.8,398.823a2.064,2.064,0,1,1,2.788,3.043,2.082,2.082,0,0,1-1.314.52h-.1a2.067,2.067,0,0,1-2.013-2.107A2.058,2.058,0,0,1,199.8,398.823Z" transform="translate(408.39 -196.16) rotate(90)" fill="#fff"/>
  </g>
</g>
</svg>
`;
const loveIcon = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="51" height="46.538" viewBox="0 0 51 46.538">
<defs>
  <filter id="Path_20917" x="0" y="0" width="51" height="46.538" filterUnits="userSpaceOnUse">
    <feOffset dy="3" input="SourceAlpha"/>
    <feGaussianBlur stdDeviation="3" result="blur"/>
    <feFlood flood-opacity="0.161"/>
    <feComposite operator="in" in2="blur"/>
    <feComposite in="SourceGraphic"/>
  </filter>
</defs>
<g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Path_20917)">
  <path id="Path_20917-2" data-name="Path 20917" d="M7.415,34.748a8.3,8.3,0,0,1,5.093.652A9.284,9.284,0,0,1,16.5,39.069a9.168,9.168,0,0,1,4.918-4.039,8.31,8.31,0,0,1,5.629.135,9.127,9.127,0,0,1,4.465,3.784A10.419,10.419,0,0,1,33,43.881v.589a12.3,12.3,0,0,1-2.083,6.116,29.866,29.866,0,0,1-5.127,5.9,54.693,54.693,0,0,1-5.227,4.18c-1.157.813-2.332,1.6-3.547,2.324a.974.974,0,0,1-.992.021c-.915-.535-1.8-1.115-2.681-1.7A50.38,50.38,0,0,1,5.009,54.37a24.929,24.929,0,0,1-3.1-3.992A11.989,11.989,0,0,1,0,44.6v-.414a10.247,10.247,0,0,1,2.572-6.657A8.685,8.685,0,0,1,7.415,34.748Z" transform="translate(9 -28.6)" fill="#fff"/>
</g>
</svg>
`;
const shareIcon = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="51" height="50.994" viewBox="0 0 51 50.994">
<defs>
  <filter id="Path_20916" x="0" y="0" width="51" height="50.994" filterUnits="userSpaceOnUse">
    <feOffset dy="3" input="SourceAlpha"/>
    <feGaussianBlur stdDeviation="3" result="blur"/>
    <feFlood flood-opacity="0.161"/>
    <feComposite operator="in" in2="blur"/>
    <feComposite in="SourceGraphic"/>
  </filter>
</defs>
<g id="_000000ff" data-name="#000000ff" transform="translate(9 6)">
  <g transform="matrix(1, 0, 0, 1, -9, -6)" filter="url(#Path_20916)">
    <path id="Path_20916-2" data-name="Path 20916" d="M17.484,0h.03c.586.516,1.2,1,1.807,1.5Q25.769,6.75,32.216,12a5.009,5.009,0,0,0,.784.589v.083a4.266,4.266,0,0,0-.712.532q-7.406,6.05-14.809,12.1,0-3.91,0-7.819A17.99,17.99,0,0,0,9.6,19.785a17.761,17.761,0,0,0-6.867,6.988c-.351.624-.6,1.3-.888,1.95C1.229,30.145.639,31.58,0,32.994v-7.32a24.044,24.044,0,0,1,.275-2.606,18.216,18.216,0,0,1,2.633-6.759A18.506,18.506,0,0,1,17.48,7.821C17.48,5.214,17.471,2.607,17.484,0Z" transform="translate(9 6)" fill="#fff"/>
  </g>
</g>
</svg>
`;
const newCalender = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="50.633" height="49" viewBox="0 0 50.633 49">
<defs>
  <filter id="Path_19748" x="0" y="0" width="46.367" height="46.222" filterUnits="userSpaceOnUse">
    <feOffset dy="3" input="SourceAlpha"/>
    <feGaussianBlur stdDeviation="3" result="blur"/>
    <feFlood flood-opacity="0.161"/>
    <feComposite operator="in" in2="blur"/>
    <feComposite in="SourceGraphic"/>
  </filter>
  <filter id="add-circle" x="22.65" y="21.017" width="27.982" height="27.982" filterUnits="userSpaceOnUse">
    <feOffset dy="3" input="SourceAlpha"/>
    <feGaussianBlur stdDeviation="3" result="blur-2"/>
    <feFlood flood-opacity="0.161"/>
    <feComposite operator="in" in2="blur-2"/>
    <feComposite in="SourceGraphic"/>
  </filter>
</defs>
<g id="Group_10262" data-name="Group 10262" transform="translate(-373.367 -208.547)">
  <g transform="matrix(1, 0, 0, 1, 373.37, 208.55)" filter="url(#Path_19748)">
    <path id="Path_19748-2" data-name="Path 19748" d="M14.416,7.285a1,1,0,0,1,1.849.086,13.242,13.242,0,0,1,.052,1.9q4.266,0,8.534,0A13.388,13.388,0,0,1,24.9,7.386a1,1,0,0,1,1.859-.071,11.81,11.81,0,0,1,.062,1.957c1.182.027,2.364-.054,3.543.044a4.979,4.979,0,0,1,4.294,4.107A36.147,36.147,0,0,1,34.7,18.35c-.007,3.935.017,7.869-.01,11.806a4.946,4.946,0,0,1-5,4.777q-9.111.007-18.225,0a4.981,4.981,0,0,1-5-5.235c.01-3.7,0-7.4.007-11.1,0-1.655-.158-3.314,0-4.966a4.948,4.948,0,0,1,3.125-4c1.514-.591,3.166-.268,4.747-.352a10.928,10.928,0,0,1,.069-1.987M9.3,12.236c-1.007.948-.817,2.41-.81,3.659H32.673c.01-1.251.19-2.713-.815-3.661-1.3-1.369-3.366-.734-5.035-.881a7.378,7.378,0,0,1-.116,2.034.99.99,0,0,1-1.783-.071,10.017,10.017,0,0,1-.074-1.96q-4.266,0-8.534,0a9.855,9.855,0,0,1-.076,1.962,1,1,0,0,1-1.785.076,7.743,7.743,0,0,1-.111-2.041c-1.669.15-3.735-.49-5.04.884m2.972,8.66a1.31,1.31,0,1,0,1.679,1.628A1.319,1.319,0,0,0,12.276,20.9m5.176.03a1.311,1.311,0,1,0,1.81,1.367,1.32,1.32,0,0,0-1.81-1.367m5.2.022a1.31,1.31,0,1,0,1.866,1.1,1.324,1.324,0,0,0-1.866-1.1m5.382-.049a1.309,1.309,0,1,0,1.682,1.632A1.317,1.317,0,0,0,28.029,20.9m-15.7,5.232a1.309,1.309,0,1,0,1.642,1.591,1.318,1.318,0,0,0-1.642-1.591m15.756,0a1.309,1.309,0,1,0,1.647,1.583,1.316,1.316,0,0,0-1.647-1.583M17.235,26.3a1.308,1.308,0,1,0,2.019.923,1.319,1.319,0,0,0-2.019-.923m5.358-.064a1.309,1.309,0,1,0,1.916,1A1.318,1.318,0,0,0,22.592,26.231Z" transform="translate(2.6 -0.71)" fill="#fff"/>
  </g>
  <circle id="Ellipse_2151" data-name="Ellipse 2151" cx="3.927" cy="3.927" r="3.927" transform="translate(405.999 236.546)" fill="#efefef"/>
  <g transform="matrix(1, 0, 0, 1, 373.37, 208.55)" filter="url(#add-circle)">
    <path id="add-circle-2" data-name="add-circle" d="M7.991,3a4.991,4.991,0,1,0,4.991,4.991A4.993,4.993,0,0,0,7.991,3Zm2.5,5.49h-2v2h-1v-2h-2v-1h2v-2h1v2h2Z" transform="translate(28.65 24.02)" fill="#fff"/>
  </g>
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
const backIcon = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="45.858" height="38.26" viewBox="0 0 45.858 38.26">
<defs>
  <filter id="Path_20928" x="0" y="0" width="45.858" height="38.26" filterUnits="userSpaceOnUse">
    <feOffset dy="3" input="SourceAlpha"/>
    <feGaussianBlur stdDeviation="3" result="blur"/>
    <feFlood flood-opacity="0.161"/>
    <feComposite operator="in" in2="blur"/>
    <feComposite in="SourceGraphic"/>
  </filter>
</defs>
<g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Path_20928)">
  <path id="Path_20928-2" data-name="Path 20928" d="M30.612,85.471A1.267,1.267,0,1,1,32.4,87.266l-6.691,6.691h22.25a1.266,1.266,0,1,1,0,2.533H25.709q3.226,3.228,6.454,6.454a1.9,1.9,0,0,1,.515.668,1.266,1.266,0,0,1-2.069,1.361l-8.845-8.844a1.27,1.27,0,0,1-.027-1.78Q26.172,89.907,30.612,85.471Z" transform="translate(-12.39 -79.08)" fill="#fff"/>
</g>
</svg>
`;
const editIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="41.275" height="19" viewBox="0 0 41.275 19">
<g id="Group_10263" data-name="Group 10263" transform="translate(-118.725 -664)">
  <text id="edit" transform="translate(135 679)" fill="#86939b" font-size="14" font-weight="500"><tspan x="0" y="0">Edit</tspan></text>
  <g id="_1159633" data-name="1159633" transform="translate(118.825 667.001)">
    <g id="_000000ff" data-name="#000000ff" transform="translate(0 1.999)">
      <path id="Path_20919" data-name="Path 20919" d="M144.311,2.057a1.269,1.269,0,0,1,1,.1,3.066,3.066,0,0,1,.586.518,1.284,1.284,0,0,1,.39.871v.095a1.294,1.294,0,0,1-.2.625,2.273,2.273,0,0,1-.342.387l-4.733,4.733a.574.574,0,0,1-.239.18q-1.172.327-2.345.651a.293.293,0,0,1-.286-.056.283.283,0,0,1-.081-.292c.213-.776.43-1.551.643-2.327a.371.371,0,0,1,.1-.185l4.965-4.966a1.293,1.293,0,0,1,.54-.336m.165.538c-.246.076-.394.3-.578.465.435.444.88.878,1.316,1.322.113-.1.215-.207.319-.315a.7.7,0,0,0,.134-.745,2.041,2.041,0,0,0-.447-.525.715.715,0,0,0-.745-.2M139.4,7.557c.436.445.882.88,1.319,1.324.4-.393.795-.794,1.193-1.19l2.91-2.91L143.5,3.46q-2.052,2.048-4.1,4.1m-.265.533q-.2.73-.4,1.461c.486-.134.972-.27,1.458-.4C139.842,8.792,139.487,8.443,139.136,8.091Z" transform="translate(-135.009 -1.999)" fill="#86939b" stroke="#86939b" stroke-width="0.2"/>
      <path id="Path_20920" data-name="Path 20920" d="M.276,52.1a1.4,1.4,0,0,1,.909-.553,2.832,2.832,0,0,1,.445-.019H3.742a1.209,1.209,0,0,1,.222.009.281.281,0,0,1-.088.552H1.629a1.654,1.654,0,0,0-.452.034.836.836,0,0,0-.488.368.883.883,0,0,0-.128.477q0,3.611,0,7.222A1.023,1.023,0,0,0,.6,60.5a.84.84,0,0,0,.532.546,1.844,1.844,0,0,0,.582.048H9.25a.854.854,0,0,0,.784-.468,1.472,1.472,0,0,0,.091-.695q0-1.08,0-2.16a.281.281,0,1,1,.561,0q0,1.233,0,2.466a1.412,1.412,0,0,1-.39.983,1.379,1.379,0,0,1-1,.431c-1.131-.008-2.262,0-3.393,0-1.514,0-3.027,0-4.541,0a1.37,1.37,0,0,1-.981-.442A1.421,1.421,0,0,1,0,60.294v-7.4A1.422,1.422,0,0,1,.276,52.1Z" transform="translate(0 -50.438)" fill="#86939b" stroke="#86939b" stroke-width="0.2"/>
    </g>
    <g id="_0000008c" data-name="#0000008c" transform="translate(1.359 13.207)">
      <path id="Path_20921" data-name="Path 20921" d="M61.72,510.974c1.514,0,3.027,0,4.541,0,1.131,0,2.262,0,3.393,0l.027.018H61.72Z" transform="translate(-61.72 -510.971)" fill="#86939b" stroke="#86939b" stroke-width="0.2" opacity="0.55"/>
    </g>
  </g>
</g>
</svg>
`;

const editIconBn = `<svg width="140" height="41" viewBox="0 0 140 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.1396 8.80369C20.4863 8.69358 20.8519 8.65546 21.2139 8.69166C21.5759 8.72787 21.9268 8.83763 22.2448 9.01422C22.7009 9.32357 23.1155 9.69006 23.4785 10.1047C23.9776 10.5878 24.2716 11.2444 24.2996 11.9384V12.1384C24.2746 12.6059 24.1296 13.0591 23.8785 13.4542C23.6703 13.7523 23.4287 14.0256 23.1585 14.269L13.1943 24.2332C13.063 24.4017 12.8894 24.5325 12.6911 24.6121C11.0462 25.0711 9.40061 25.5279 7.75429 25.9826C7.65237 26.0172 7.54318 26.0245 7.43755 26.0039C7.33193 25.9832 7.23355 25.9352 7.1522 25.8647C7.06842 25.789 7.00792 25.691 6.97773 25.5821C6.94754 25.4733 6.94891 25.3581 6.98168 25.25C7.4301 23.6163 7.88693 21.9847 8.33535 20.3511C8.36649 20.2036 8.43961 20.0684 8.54589 19.9616L18.9985 9.50685C19.3127 9.18008 19.7034 8.93694 20.1354 8.79948M20.4827 9.93211C19.9648 10.0921 19.6532 10.5637 19.2659 10.9111C20.1817 11.8458 21.1185 12.7595 22.0364 13.6942C22.2743 13.4837 22.4891 13.2584 22.708 13.0311C22.9004 12.8242 23.0293 12.5663 23.0793 12.2883C23.1293 12.0102 23.0984 11.7236 22.9901 11.4626C22.7413 11.0435 22.4231 10.6698 22.049 10.3574C21.8552 10.1446 21.6045 9.99182 21.3265 9.9172C21.0485 9.84257 20.755 9.84921 20.4806 9.93632M9.80061 20.3826C10.7185 21.3195 11.6575 22.2353 12.5775 23.17C13.4196 22.3426 14.2512 21.4984 15.089 20.6647L21.2154 14.5384L18.4322 11.7574C15.5522 14.6318 12.675 17.509 9.80061 20.389M9.24272 21.5111C8.96201 22.5356 8.68132 23.5609 8.40062 24.5868C9.42378 24.3047 10.4469 24.0184 11.4701 23.7447C10.7311 22.9826 9.98378 22.2479 9.24484 21.5068L9.24272 21.5111Z" fill="#86939B"/>
<path d="M20.1396 8.80369C20.4863 8.69358 20.8519 8.65546 21.2139 8.69166C21.5759 8.72787 21.9268 8.83763 22.2448 9.01422C22.7009 9.32357 23.1155 9.69006 23.4785 10.1047C23.9776 10.5878 24.2716 11.2444 24.2996 11.9384V12.1384C24.2746 12.6059 24.1296 13.0591 23.8785 13.4542C23.6703 13.7523 23.4287 14.0256 23.1585 14.269L13.1943 24.2332C13.063 24.4017 12.8894 24.5325 12.6911 24.6121C11.0462 25.0711 9.40061 25.5279 7.75429 25.9826C7.65237 26.0172 7.54318 26.0245 7.43755 26.0039C7.33193 25.9832 7.23355 25.9352 7.1522 25.8647C7.06842 25.789 7.00792 25.691 6.97773 25.5821C6.94754 25.4733 6.94891 25.3581 6.98168 25.25C7.4301 23.6163 7.88693 21.9847 8.33535 20.3511C8.36649 20.2036 8.43961 20.0684 8.54589 19.9616L18.9985 9.50685C19.3127 9.18008 19.7034 8.93694 20.1354 8.79948M20.4827 9.93211C19.9648 10.0921 19.6532 10.5637 19.2659 10.9111C20.1817 11.8458 21.1185 12.7595 22.0364 13.6942C22.2743 13.4837 22.4891 13.2584 22.708 13.0311C22.9004 12.8242 23.0293 12.5663 23.0793 12.2883C23.1293 12.0102 23.0984 11.7236 22.9901 11.4626C22.7413 11.0435 22.4231 10.6698 22.049 10.3574C21.8552 10.1446 21.6045 9.99182 21.3265 9.9172C21.0485 9.84257 20.755 9.84921 20.4806 9.93632M9.80061 20.3826C10.7185 21.3195 11.6575 22.2353 12.5775 23.17C13.4196 22.3426 14.2512 21.4984 15.089 20.6647L21.2154 14.5384L18.4322 11.7574C15.5522 14.6318 12.675 17.509 9.80061 20.389M9.24272 21.5111C8.96201 22.5356 8.68132 23.5609 8.40062 24.5868C9.42378 24.3047 10.4469 24.0184 11.4701 23.7447C10.7311 22.9826 9.98378 22.2479 9.24484 21.5068L9.24272 21.5111Z" stroke="#86939B" stroke-width="0.421053"/>
<path d="M1.13769 12.1806C1.59752 11.5558 2.28513 11.1375 3.05138 11.0163C3.36212 10.9784 3.67537 10.9651 3.98822 10.9763H8.43454C8.59058 10.9683 8.74703 10.9746 8.9019 10.9953C9.04319 11.0332 9.16543 11.1221 9.24502 11.2448C9.32462 11.3675 9.35593 11.5154 9.3329 11.6598C9.30987 11.8043 9.23414 11.9351 9.12033 12.027C9.00652 12.1189 8.8627 12.1653 8.71664 12.1574H3.98611C3.66714 12.1375 3.34694 12.1616 3.03454 12.229C2.60657 12.3483 2.23956 12.6251 2.00717 13.0037C1.82365 13.306 1.73017 13.6544 1.73769 14.0079C1.73769 19.076 1.73769 24.1441 1.73769 29.2121C1.73148 29.4326 1.75917 29.6527 1.8198 29.8648C1.90261 30.1311 2.04724 30.3741 2.24189 30.5739C2.43654 30.7736 2.67569 30.9245 2.9398 31.0142C3.34026 31.1128 3.75387 31.1469 4.16506 31.1153H20.0303C20.3705 31.1241 20.7061 31.0362 20.9983 30.8618C21.2905 30.6874 21.5272 30.4336 21.6809 30.13C21.8616 29.6649 21.9273 29.1629 21.8724 28.6669C21.8724 27.1511 21.8724 25.6353 21.8724 24.1195C21.8676 24.039 21.8793 23.9583 21.9068 23.8825C21.9343 23.8067 21.977 23.7373 22.0324 23.6786C22.0877 23.6199 22.1544 23.5731 22.2284 23.5411C22.3025 23.5091 22.3823 23.4926 22.463 23.4926C22.5436 23.4926 22.6234 23.5091 22.6975 23.5411C22.7715 23.5731 22.8382 23.6199 22.8936 23.6786C22.9489 23.7373 22.9916 23.8067 23.0191 23.8825C23.0466 23.9583 23.0583 24.039 23.0535 24.1195C23.0535 25.85 23.0535 27.5806 23.0535 29.3111C23.0582 30.0812 22.7639 30.8231 22.2324 31.3806C21.9615 31.6668 21.6351 31.8948 21.2732 32.0508C20.9112 32.2068 20.5213 32.2875 20.1272 32.2879C17.7461 32.2711 15.3651 32.2879 12.984 32.2879C9.79664 32.2879 6.61138 32.2879 3.42401 32.2879C3.03478 32.2802 2.65114 32.1938 2.2962 32.0339C1.94126 31.874 1.62237 31.6439 1.35875 31.3574C0.86885 30.8324 0.58415 30.1486 0.556641 29.4311L0.556641 13.8521C0.577446 13.2491 0.779982 12.6665 1.13769 12.1806Z" fill="#86939B" stroke="#86939B" stroke-width="0.421053"/>
<path opacity="0.55" d="M3.41797 32.2838C6.60534 32.2838 9.7906 32.2838 12.978 32.2838C15.359 32.2838 17.7401 32.2838 20.1211 32.2838L20.178 32.3217H3.41797V32.2838Z" fill="#86939B" stroke="#86939B" stroke-width="0.421053"/>
<path d="M53.1165 13.1674V15.26H50.0218V31.5H47.7523V21.0958L48.4302 22.9526C47.8211 22.147 47.2905 21.5281 46.8386 21.0958C46.4063 20.6635 45.9839 20.4474 45.5712 20.4474C45.2961 20.4474 45.0407 20.526 44.8049 20.6832C44.5691 20.8403 44.3039 21.1449 44.0091 21.5968C43.7144 22.0291 43.3214 22.6972 42.8302 23.6011C42.2997 24.5639 41.8182 25.3596 41.386 25.9884C40.9537 26.5975 40.4919 27.0495 40.0007 27.3442C39.5291 27.6193 38.9495 27.7568 38.2618 27.7568C37.7312 27.7568 37.2204 27.6488 36.7291 27.4326C36.2575 27.2165 35.7761 26.8628 35.2849 26.3716C34.8133 25.8607 34.3025 25.173 33.7523 24.3084L35.5502 23.2179C36.0807 24.1611 36.5228 24.78 36.8765 25.0747C37.2302 25.3695 37.6133 25.5168 38.026 25.5168C38.36 25.5168 38.6744 25.4186 38.9691 25.2221C39.2835 25.006 39.6175 24.6425 39.9712 24.1316C40.3446 23.6207 40.767 22.9232 41.2386 22.0389L41.9165 21.0663C42.4274 20.0053 42.9186 19.2782 43.3902 18.8853C43.8618 18.4726 44.3825 18.2663 44.9523 18.2663C45.6007 18.2663 46.1804 18.453 46.6912 18.8263C47.2218 19.18 47.8309 19.7302 48.5186 20.4768L47.9291 20.5063C47.8505 20.0544 47.8014 19.6319 47.7818 19.2389C47.7621 18.8263 47.7523 18.4137 47.7523 18.0011V15.26H32.426V13.1674H53.1165ZM40.7081 23.5126C40.5116 22.1765 40.3053 21.1154 40.0891 20.3295C39.8926 19.5435 39.5389 18.9344 39.0281 18.5021C38.5368 18.0502 37.8688 17.7161 37.0239 17.5C36.1789 17.2642 35.1179 17.0677 33.8407 16.9105L34.2828 14.6705L35.8744 15.26C36.9944 15.4368 37.9277 15.6628 38.6744 15.9379C39.4211 16.213 40.0204 16.5765 40.4723 17.0284C40.9439 17.4607 41.2975 18.0011 41.5333 18.6495C41.7691 19.2979 41.9263 20.0839 42.0049 21.0074L40.7081 23.5126ZM56.4364 22.2453C57.6743 22.9919 58.8434 23.886 59.9438 24.9274C61.0638 25.9491 62.0757 27.0495 62.9796 28.2284C63.9031 29.4074 64.6792 30.5765 65.308 31.7358L63.3922 32.7084C62.5866 31.4705 61.781 30.3604 60.9754 29.3779C60.1894 28.3758 59.315 27.4523 58.3522 26.6074C57.4091 25.7625 56.2792 24.9372 54.9627 24.1316L56.4364 22.2453ZM55.1101 17.1758C55.1101 16.3702 55.287 15.6726 55.6406 15.0832C56.014 14.474 56.515 14.0025 57.1438 13.6684C57.7726 13.3344 58.4799 13.1674 59.2659 13.1674C60.0519 13.1674 60.7592 13.3344 61.388 13.6684C62.0168 14.0025 62.508 14.474 62.8617 15.0832C63.235 15.6726 63.4217 16.3702 63.4217 17.1758C63.4217 17.9814 63.235 18.6888 62.8617 19.2979C62.508 19.907 62.0168 20.3786 61.388 20.7126C60.7592 21.0467 60.0519 21.2137 59.2659 21.2137C58.4799 21.2137 57.7726 21.0467 57.1438 20.7126C56.515 20.3786 56.014 19.9168 55.6406 19.3274C55.287 18.7182 55.1101 18.0011 55.1101 17.1758ZM57.1438 17.1758C57.1438 17.8439 57.3403 18.3646 57.7333 18.7379C58.1459 19.1112 58.6568 19.2979 59.2659 19.2979C59.8947 19.2979 60.4056 19.1112 60.7985 18.7379C61.1915 18.3449 61.388 17.8242 61.388 17.1758C61.388 16.5077 61.1915 15.9968 60.7985 15.6432C60.4056 15.2698 59.8947 15.0832 59.2659 15.0832C58.6568 15.0832 58.1459 15.2796 57.7333 15.6726C57.3403 16.046 57.1438 16.547 57.1438 17.1758ZM76.2273 13.1674V15.26H75.6378C75.0287 15.3975 74.3705 15.7021 73.6631 16.1737C72.9557 16.6256 72.2877 17.2249 71.6589 17.9716C71.0301 18.6986 70.5094 19.5533 70.0968 20.5358C69.7038 21.5182 69.5073 22.5989 69.5073 23.7779C69.5073 25.1926 69.7136 26.3225 70.1263 27.1674C70.5585 27.9926 71.0891 28.5821 71.7178 28.9358C72.3466 29.2895 72.9754 29.4663 73.6042 29.4663C74.0954 29.4663 74.508 29.4172 74.8421 29.3189C75.1761 29.2207 75.5593 29.0439 75.9915 28.7884L77.0231 30.5863C76.5122 30.9793 75.9522 31.2544 75.3431 31.4116C74.734 31.5688 74.1249 31.6474 73.5157 31.6474C72.2778 31.6474 71.1775 31.3232 70.2147 30.6747C69.2715 30.0263 68.5249 29.1225 67.9747 27.9632C67.4442 26.7842 67.1789 25.4088 67.1789 23.8368C67.1789 22.2256 67.4835 20.7716 68.0926 19.4747C68.7017 18.1582 69.5171 17.0481 70.5389 16.1442C71.5803 15.2403 72.7298 14.5821 73.9873 14.1695L72.101 15.1421C71.7473 15.1814 71.3642 15.2109 70.9515 15.2305C70.5389 15.2502 70.0771 15.26 69.5663 15.26H65.44V13.1674H76.2273ZM96.1723 13.1674V15.26H93.0775V31.5H90.808V16.4095L90.9554 15.82C90.8965 15.486 90.8572 15.1421 90.8375 14.7884C90.8179 14.4347 90.808 14.0418 90.808 13.6095V11.2221H92.3701L93.0775 13.1674H96.1723ZM86.5638 12.9611C87.3301 12.9611 88.0375 13.1084 88.6859 13.4032C89.3344 13.6979 89.914 14.1105 90.4249 14.6411C90.9358 15.1716 91.3484 15.7905 91.6628 16.4979L91.5449 19.5926C90.9358 18.1779 90.2186 17.0775 89.3933 16.2916C88.568 15.5056 87.6445 15.1126 86.6228 15.1126C85.8565 15.1126 85.2375 15.3288 84.7659 15.7611C84.2944 16.1737 84.0586 16.7926 84.0586 17.6179C84.0586 18.4039 84.373 19.0523 85.0017 19.5632C85.6501 20.0544 86.6817 20.3295 88.0965 20.3884L87.8901 22.6579C86.5933 22.5793 85.5224 22.314 84.6775 21.8621C83.8523 21.4102 83.2431 20.8207 82.8501 20.0937C82.4572 19.347 82.2607 18.4923 82.2607 17.5295C82.2607 16.4881 82.467 15.6333 82.8796 14.9653C83.2923 14.2775 83.8228 13.7765 84.4712 13.4621C85.1393 13.1281 85.8368 12.9611 86.5638 12.9611ZM78.1933 12.9611C79.0186 12.9611 79.7947 13.1281 80.5217 13.4621C81.2684 13.7961 81.8775 14.3267 82.3491 15.0537C82.8207 15.7807 83.0565 16.7337 83.0565 17.9126C83.0565 18.7182 82.86 19.4846 82.467 20.2116C82.074 20.9386 81.4649 21.5281 80.6396 21.98C79.834 22.4319 78.7926 22.6579 77.5154 22.6579L77.3386 20.3884C78.3407 20.3688 79.1266 20.2312 79.6965 19.9758C80.2663 19.7007 80.6691 19.3568 80.9049 18.9442C81.1407 18.5316 81.2586 18.1189 81.2586 17.7063C81.2586 16.9007 81.0031 16.2719 80.4923 15.82C79.9814 15.3484 79.2052 15.1126 78.1638 15.1126C77.8101 15.1126 77.4565 15.1421 77.1028 15.2011C76.7687 15.2403 76.3659 15.3189 75.8944 15.4368L75.6586 13.2263C76.1498 13.1281 76.5821 13.0593 76.9554 13.02C77.3484 12.9807 77.761 12.9611 78.1933 12.9611ZM104.005 13.1674V15.26H100.91V31.5H98.6409V17.6768C98.4051 17.0088 98.0514 16.4389 97.5799 15.9674C97.1279 15.4958 96.5384 15.26 95.8114 15.26H95.5756V13.1674H96.0177C96.4893 13.1674 96.9806 13.3246 97.4914 13.6389C98.0023 13.9337 98.4149 14.3954 98.7293 15.0242C98.7097 14.926 98.69 14.7 98.6704 14.3463C98.6507 13.9926 98.6409 13.6881 98.6409 13.4326V11.2221H100.232L100.881 13.1674H104.005ZM121.56 13.1674V15.26H118.466V31.5H116.196C115.607 30.3211 114.791 29.2404 113.75 28.2579C112.728 27.2558 111.549 26.4109 110.213 25.7232C108.877 25.0354 107.452 24.5737 105.939 24.3379L104.79 21.5084C106.676 20.3688 108.621 19.3372 110.626 18.4137C112.65 17.4902 114.732 16.7042 116.874 16.0558L116.196 17.2937V13.1674H121.56ZM116.196 17.5295L116.815 18.3547C115.322 18.846 113.75 19.4551 112.099 20.1821C110.449 20.8895 108.926 21.6754 107.531 22.54C108.592 22.7758 109.722 23.1786 110.92 23.7484C112.119 24.3182 113.229 25.0354 114.251 25.9C115.273 26.7646 116.059 27.7667 116.609 28.9063H116.344C116.304 28.4544 116.265 28.0025 116.226 27.5505C116.206 27.0986 116.196 26.5582 116.196 25.9295V17.5295ZM110.773 12.9611C111.009 12.9611 111.264 12.9807 111.539 13.02C111.814 13.0396 112.08 13.0691 112.335 13.1084L112.158 15.2305C112.04 15.2109 111.893 15.2011 111.716 15.2011C111.559 15.1814 111.353 15.1716 111.097 15.1716C110.508 15.1716 110.046 15.2993 109.712 15.5547C109.398 15.7905 109.24 16.1049 109.24 16.4979C109.24 17.0088 109.466 17.4509 109.918 17.8242C110.37 18.1779 111.176 18.5807 112.335 19.0326L110.567 20.3589C109.82 19.9856 109.172 19.5926 108.621 19.18C108.071 18.7477 107.649 18.2761 107.354 17.7653C107.059 17.2544 106.912 16.6846 106.912 16.0558C106.912 15.5253 107.05 15.0242 107.325 14.5526C107.6 14.0811 108.022 13.6979 108.592 13.4032C109.162 13.1084 109.889 12.9611 110.773 12.9611ZM139.354 13.1674V15.26H136.259V31.5H133.99V24.3379L134.461 25.9884C133.813 25.0846 133.105 24.2691 132.339 23.5421C131.573 22.8151 130.787 22.2354 129.981 21.8032C129.175 21.3709 128.39 21.1547 127.623 21.1547C126.896 21.1547 126.277 21.3512 125.766 21.7442C125.275 22.1175 125.03 22.6775 125.03 23.4242C125.03 24.0137 125.236 24.5246 125.648 24.9568C126.061 25.3695 126.7 25.7428 127.564 26.0768L126.444 28.1695C125.246 27.6782 124.303 27.02 123.615 26.1947C122.947 25.3498 122.613 24.3968 122.613 23.3358C122.613 22.373 122.839 21.5772 123.291 20.9484C123.762 20.3 124.352 19.8186 125.059 19.5042C125.786 19.1898 126.523 19.0326 127.27 19.0326C128.291 19.0326 129.225 19.2095 130.07 19.5632C130.914 19.9168 131.7 20.3982 132.427 21.0074C133.174 21.6165 133.881 22.3239 134.55 23.1295L134.137 23.2474C134.078 22.7954 134.039 22.3533 134.019 21.9211C133.999 21.4691 133.99 21.0172 133.99 20.5653V15.26H120.962V13.1674H139.354Z" fill="#86939B"/>
</svg>
`;
