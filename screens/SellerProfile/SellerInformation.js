import React, { useEffect, useState } from "react";
import {
  Platform,
  Text,
  View,
  Animated as Animation,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { SvgXml } from "react-native-svg";
import Avatar from "../../components/Avatar";
const primaryColor = "white";
import { Tooltip } from "react-native-paper";
import AnimatedHeight from "../../Hooks/AnimatedHeight";
import { getFullRating } from "../../Class/service";
import { MotiView } from "moti";
import ProfileOption from "../../components/ProfileOption";
import { calenderIcon, noticeIcon, user } from "../../assets/icon";
import ReadMore from "../../components/ReadMore";
import useLang from "../../Hooks/UseLang";
const { width, height } = Dimensions.get("window");

export default function SellerInformation({ Data, newUser, navigation }) {
  const [rating, setRating] = useState(0);
  const [NameDropDown, setNameDropDown] = React.useState(false);
  const childRef = React.useRef();
  const [PositionDropDown, setPositionDropDown] = React.useState(false);
  const [specialtyHeight, setSpecialtyHeight] = React.useState(75);
  const [specialtyAnimation, setSpecialtyAnimation] = React.useState(
    new Animation.Value(specialtyHeight)
  );
  const [Specialty, setSpecialty] = React.useState([]);
  const [SeeMore, setSeeMore] = React.useState(false);
  const [More, setMore] = React.useState(false);
  const [OpenDetails, setOpenDetails] = React.useState(false);
  const [calenderHeight, setCalenderHeight] = React.useState(0);
  const { language } = useLang();
  const isBn = language == "Bn";
  useEffect(() => {
    Data && setSpecialty(Data?.service?.keywords);
  }, [Data]);
  React.useState(() => {
    if (newUser && Data) {
      getFullRating(newUser?.token, Data?.service?.id).then((res) => {
        setRating(res?.data?.rating);
      });
    }
  }, [Data, newUser]);

  return (
    <>
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
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: 5,
            backgroundColor: primaryColor,
          }}
        >
          <Text
            numberOfLines={2}
            style={[
              {
                fontFamily: "Poppins-SemiBold",
                marginTop: 15,
                flex: 3,
                fontSize: Platform.OS == "ios" ? 22 : 20.5,
              },
            ]}
          >
            {Data
              ? Data.service.serviceCenterName
              : "Easin Arafat It Consulting Center"}
          </Text>
          <View style={{ flex: 0.5 }} />
          <View
            style={{
              paddingTop: 20,
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <SvgXml
                xml={newStar}
                height={Platform.OS == "ios" ? "21" : "19"}
                width={Platform.OS == "ios" ? "21" : "19"}
              />
              <Text
                style={{
                  fontSize: Platform.OS == "ios" ? 20 : 18,
                  fontFamily: "Poppins-Bold",
                  color: "#FFC107",
                  marginLeft: 5,
                }}
              >
                {rating.toFixed(1)}
              </Text>
            </View>
            <Text
              style={{
                fontSize: Platform.OS == "ios" ? 12 : 11,
                fontFamily: "Poppins-Medium",
                marginTop: Platform.OS == "ios" ? 5 : 0,
              }}
            >
              {isBn ? "প্রোফাইল দেখেছে" : "Profile Views"}{" "}
              {Data ? Data.service.views : "00"}
            </Text>
          </View>
        </View>
        <Animation.View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            marginVertical: 15,
            flex: 1,
          }}
        >
          <Avatar
            style={{
              width: 40,
              height: 40,
              borderWidth: Data && Data.service.profilePhoto ? 0 : 0.5,
            }}
            source={{ uri: Data ? Data.service.profilePhoto : null }}
          />
          <View
            style={{
              flex: 3,
            }}
          >
            <Tooltip
              enterTouchDelay={10}
              title={
                Data
                  ? `${
                      Data.service.providerInfo.name
                    } (${Data.service.providerInfo.gender.toUpperCase()})`
                  : "No"
              }
            >
              <View
                onPress={() => {
                  setNameDropDown((val) => !val);
                }}
                ref={childRef}
                style={{
                  borderRadius: 10,
                  marginHorizontal: 10,
                  backgroundColor: "#E7EFFF",
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  flex: 1,
                }}
              >
                <Text
                  numberOfLines={NameDropDown ? 2 : 1}
                  style={{
                    color: "#6366F1",
                    fontSize: Platform.OS == "ios" ? 16.5 : 15,
                    fontFamily: "Poppins-SemiBold",
                  }}
                >
                  {Data
                    ? `${
                        Data.service.providerInfo.name
                      } (${Data.service.providerInfo.gender.toUpperCase()})`
                    : null}
                </Text>
              </View>
            </Tooltip>
          </View>
          <View
            style={{
              flex: 2,
            }}
          >
            <Tooltip
              enterTouchDelay={10}
              title={Data ? Data.service.providerInfo.position : ""}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#F0EFEF",
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                  justifyContent: "center",
                  justifySelf: "flex-end",
                }}
              >
                <Text
                  numberOfLines={PositionDropDown ? 4 : 1}
                  style={{
                    color: "#DA1E37",
                    textAlign: "center",
                    fontSize: Platform.OS == "ios" ? 14 : 13,
                    fontFamily: "Poppins-SemiBold",
                  }}
                >
                  {Data ? Data.service.providerInfo.position : ""}
                </Text>
              </View>
            </Tooltip>
          </View>
        </Animation.View>
        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: Platform.OS == "ios" ? 22 : 20.5,
              fontFamily: "Poppins-SemiBold",
              marginVertical: 15,
              marginTop: 2,
            }}
          >
            {isBn ? "যে সব বিষয়ে বিশেষত্ব" : "Specialty In"}
          </Text>
          <Animation.View style={{ height: specialtyAnimation }}>
            <View
              onLayout={(e) => {
                //console.log(e.nativeEvent.layout.height)
                setSpecialtyHeight(e.nativeEvent.layout.height);
              }}
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {Array.isArray(Specialty) &&
                Specialty.map((doc, i) => (
                  <SpecialtyComponent
                    more={More}
                    seeMore={(val) => {
                      setSeeMore(val);
                    }}
                    doc={doc}
                    i={i}
                    arr={Specialty}
                    key={i}
                  />
                ))}

              {SeeMore && (
                <Pressable
                  onPress={() => {
                    setMore((val) => !val);
                  }}
                  style={{
                    marginVertical: 5,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins-SemiBold",
                      fontSize: Platform.OS == "ios" ? 16.5 : 15,
                      color: "#86939B",
                    }}
                  >
                    {!More
                      ? isBn
                        ? "...সব দেখুন"
                        : "...Show All"
                      : isBn
                      ? "...অল্প দেখুন"
                      : "...Show Less"}
                  </Text>
                </Pressable>
              )}
            </View>
          </Animation.View>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            backgroundColor: primaryColor,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: Platform.OS == "ios" ? 22 : 20.5,
              fontFamily: "Poppins-SemiBold",
              marginTop: 15,
              marginBottom: 10,
            }}
          >
            {isBn ? "সেবা প্রদানকারীর সম্পর্কে" : "About"}
          </Text>

          {/* <AnimatedHeight
            id={Data.service.id == "W8kHHhBuKG4jkXPNJ32Mw" ? true : false}
            text={Data?.service?.about}
          /> */}
          <ReadMore content={Data?.service?.about} />
        </View>
        <Pressable
          onPress={() => {
            if (calenderHeight == 0) {
              setCalenderHeight(125);
            } else {
              setCalenderHeight(0);
            }
            setOpenDetails((val) => !val);
          }}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            paddingTop: 5,
          }}
        >
          <Text
            style={{
              color: "#4ADE80",
              fontSize: Platform.OS == "ios" ? 16.5 : 15,
              fontFamily: "Poppins-SemiBold",
              marginBottom: 15,
            }}
          >
            {isBn
              ? "...কাজের সময়, নোটিশ এবং টিম"
              : "...Company Calender, Notice & Team"}
          </Text>
        </Pressable>
      </View>
      <MotiView
        transition={{ type: "timing" }}
        animate={{ height: calenderHeight }}
        style={{ overflow: "hidden" }}
      >
        <View
          style={{
            backgroundColor: primaryColor,
            marginTop: -10,
          }}
          onLayout={(e) => {
            if (OpenDetails) {
              //setCalenderHeight(e.nativeEvent.layout.height);
            }
          }}
        >
          <ProfileOption
            onPress={() => {
              navigation.navigate("Company Calender", {
                workingTime: Data?.service?.workingTime,
                t47: Data?.service?.t47,
              });
            }}
            Icon={() => <SvgXml xml={calenderIcon} height="22" width="22" />}
            title={isBn ? "কাজের সময়" : "Company Calender"}
          />
          <ProfileOption
            onPress={() => {
              navigation.navigate("UserNotice", {
                serviceId: Data.service.id,
              });
            }}
            style={{
              marginBottom: 0,
            }}
            Icon={() => <SvgXml xml={noticeIcon} height="22" width="22" />}
            title={isBn ? "নোটিশ" : "Notice"}
          />
          <BarOption
            icon={user}
            title={
              isBn
                ? `কর্মচারী এবং টিম (${Data?.service.worker})`
                : `Worker and Team (${Data?.service.worker} member)`
            }
          />
        </View>
      </MotiView>

      <View style={{ height: 2, backgroundColor: "#FAFAFA" }} />
    </>
  );
}
const newStar = `<svg xmlns="http://www.w3.org/2000/svg" width="21" height="18" viewBox="0 0 21 18">
<path id="Polygon_1" data-name="Polygon 1" d="M9.6,1.879a1,1,0,0,1,1.8,0l1.844,3.843a1,1,0,0,0,.817.564l4.428.376a1,1,0,0,1,.537,1.78l-3.181,2.526a1,1,0,0,0-.349,1.024l.951,3.827a1,1,0,0,1-1.441,1.123L10.971,14.79a1,1,0,0,0-.941,0L5.994,16.942a1,1,0,0,1-1.441-1.123L5.5,11.992a1,1,0,0,0-.349-1.024L1.973,8.442a1,1,0,0,1,.537-1.78l4.428-.376a1,1,0,0,0,.817-.564Z" fill="#ffc107"/>
</svg>
`;
const SpecialtyComponent = ({ doc, i, arr, seeMore, more }) => {
  const [Length, setLength] = React.useState(0);
  React.useEffect(() => {
    let length = 0;
    arr.forEach((doc, j) => {
      if (j <= i) {
        length =
          length + doc.split("").length + (Platform.OS == "ios" ? 70 : 60);
      }
    });
    setLength(width < 400 ? length - 40 : length);
    //console.log(width)
  }, []);

  React.useEffect(() => {
    if (Length > width) {
      seeMore(true);
    } else {
      seeMore(false);
    }
  }, [Length]);
  if (Length > width && !more) {
    //seeMore();
    return null;
  }

  return (
    <View
      style={{
        borderRadius: 5,
        backgroundColor: "#4ADE80",
        paddingHorizontal: 5,
        paddingVertical: 5,
        marginRight: 5,
        marginVertical: 5,
      }}
    >
      <Text
        style={{
          color: "white",
          fontWeight: "500",
          fontSize: Platform.OS == "ios" ? 14.5 : 12,
        }}
      >
        {doc}
      </Text>
    </View>
  );
};
const BarOption = ({ icon, title }) => {
  const [lines, setLines] = React.useState(1);
  return (
    <TouchableOpacity
      onPress={() => {
        setLines((d) => {
          if (d === 1) {
            return 10;
          }
          return 1;
        });
      }}
      style={{
        paddingHorizontal: 20,
        flexDirection: "row",
        backgroundColor: primaryColor,
        paddingVertical: 5,
      }}
    >
      <SvgXml xml={icon} height="22" width="22" />
      <View
        style={{
          flex: 6,
          marginLeft: 10,
        }}
      >
        <Text
          numberOfLines={lines}
          style={{
            fontFamily: "Poppins-SemiBold",
            marginBottom: 5,
            fontSize: Platform.OS == "ios" ? 16.5 : 15,
            color: "#333333",
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
