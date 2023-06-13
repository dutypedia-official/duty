import React, { useEffect, useState } from "react";
import {
  Canvas,
  Box,
  BoxShadow,
  Fill,
  rrect,
  rect,
  Image as Picture,
  useImage,
} from "@shopify/react-native-skia";
import { Menu } from "react-native-paper";
import { Alert, Dimensions, Platform, View, Share } from "react-native";
import { SvgXml } from "react-native-svg";
import { getLikeGigs, setLikeGigs } from "../../Class/service";
import { useDispatch, useSelector } from "react-redux";
import { setSaveList } from "../../Reducers/saveList";
const { width, height } = Dimensions.get("window");
const primaryColor = "white";
import * as Sharing from 'expo-sharing';

export default function ImageCanvas({
  backgroundImage,
  newUser,
  Data,
  navigation,
  isFocused,
  gigId,
}) {
  const newImage = useImage(backgroundImage);
  const userInfo = Data?.service?.user;
  const [like, setLike] = useState(false);
  const dispatch = useDispatch();
  const saveList = useSelector((state) => state.saveList);
  const [Visible, setVisible] = React.useState(false);

  useEffect(() => {
    let arr = saveList?.filter((d) => d.gig.id == gigId);
    if (arr?.length > 0) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [saveList?.length, isFocused]);
  useEffect(() => {
    if (!newUser?.token) {
      setLike(false);
    }
  }, [newUser, isFocused]);

  const addToSaveList = async () => {
    if (!Data) {
      return;
    }

    const res = await setLikeGigs(newUser?.token, gigId);
    //console.log(res.data)
    const response = await getLikeGigs(newUser?.token);
    //console.log(response.data.gigs)
    dispatch(setSaveList(response.data.gigs));
  };
  return (
    <>
      <Canvas style={{ width: width, height: height - (height * 30) / 100 }}>
        <Fill color={primaryColor} />
        <Box
          box={rrect(
            rect(0, 0, width - 3, height - ((height * 30) / 100 + 10)),
            5,
            5
          )}
          color={primaryColor}>
          <BoxShadow
            dx={30}
            dy={30}
            blur={20}
            color={Platform.OS == "ios" ? "#e6e6e6" : "#cdcdcd"}
            inner
          />
          <BoxShadow
            dx={-10}
            dy={-10}
            blur={20}
            color={Platform.OS == "ios" ? "#e6e6e6" : "#cdcdcd"}
            inner
          />
          <BoxShadow
            dx={5}
            dy={5}
            blur={20}
            color={Platform.OS == "ios" ? "#e6e6e6" : "#cdcdcd"}
          />
          <BoxShadow
            dx={-20}
            dy={-20}
            blur={20}
            color={Platform.OS == "ios" ? "#e6e6e6" : "#cdcdcd"}
          />
        </Box>
        {backgroundImage && newImage && (
          <Picture
            image={newImage}
            fit="cover"
            x={0}
            y={0}
            width={width}
            height={height - (height * 30) / 100}
          />
        )}
      </Canvas>
      {newUser?.user?.id != Data?.service?.user?.id && (
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 10,
            height: height - (height * 30) / 100,
            justifyContent: "center",
            elevation: 2,
            zIndex: 100,
          }}>
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
                  if (!newUser?.token) {
                    navigation.navigate("LogIn");
                    return;
                  }
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
            }>
            <Menu.Item
              onPress={() => {
                navigation.navigate("Support_1", {
                  serviceId: Data?.service?.id,
                });
                setVisible(!Visible);
              }}
              title="Report"
            />
            {/* <Menu.Item onPress={() => {}} title="Copy URL" /> */}
          </Menu>

          <SvgXml
            onPress={() => {
              if (!newUser?.token) {
                navigation.navigate("LogIn");
                return;
              }
              addToSaveList();
              setLike((v) => !v);
            }}
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
            xml={like ? loveIconAc : loveIcon}
            height={Platform.OS == "ios" ? "50" : "45"}
            width={Platform.OS == "ios" ? "50" : "45"}
          />
          {/* <SvgXml
            onPress={async() => {
              Share.share({
                title:`${Data?.service?.serviceCenterName}`,
                url:`https://duty.com.bd/feed/service/${Data?.service?.slug}`,
                message:"You can share url to other"
              }).catch(e=>{
                Alert.alert("Ops!",e.message)
              })
            //  const r=await Sharing.isAvailableAsync()
            //  console.log(r)
            //   Sharing.shareAsync().catch(e=>{
            //     Alert.alert("Ops!",e.message)
            //   })
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
            }}
            xml={shareIcon}
            height={Platform.OS == "ios" ? "50" : "45"}
            width={Platform.OS == "ios" ? "50" : "45"}
          /> */}

          <SvgXml
            onPress={() => {
              if (newUser && !newUser?.token) {
                navigation.navigate("LogIn");
                return;
              }
              navigation.navigate("CreateAppointment", { data: Data });
              //navigation.navigate("AppointmentList", { data: Data });
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
            }}
            xml={newCalender}
            height={Platform.OS == "ios" ? "50" : "45"}
            width={Platform.OS == "ios" ? "50" : "45"}
          />
          <SvgXml
            onPress={() => {
              if (newUser && !newUser?.token) {
                navigation.navigate("LogIn");
                return;
              }
              if (!userInfo) {
                Alert.alert("Invalid user!");
                return;
              }
              if (newUser?.user.id == userInfo.id) {
                Alert.alert("Ops!", "Self messaging is not allowed.");
                return;
              }
              let user = {
                userId: userInfo?.id,
                user: userInfo,
              };
              navigation.navigate("ChatScreen", {
                data: {
                  users: [user],
                  service: Data?.service,
                  serviceId: Data?.service?.id,
                },
                username: userInfo?.username,
                serviceId: Data?.service?.id,
              });
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
      )}
    </>
  );
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
const loveIconAc = `<svg width="45" height="41" viewBox="0 0 45 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_d_6086_40919)">
<path d="M13.415 3.1481C15.1389 2.82166 16.9219 3.04992 18.508 3.8001C20.1741 4.59864 21.5641 5.87613 22.5 7.4691C23.6045 5.57873 25.349 4.14602 27.418 3.4301C29.2529 2.81868 31.2435 2.86643 33.047 3.5651C34.9104 4.30209 36.4794 5.63182 37.512 7.3491C38.413 8.84263 38.9247 10.5385 39 12.2811V12.8701C38.8631 15.058 38.1439 17.1695 36.917 18.9861C35.4738 21.1689 33.7501 23.1525 31.79 24.8861C30.1346 26.3848 28.389 27.7808 26.563 29.0661C25.406 29.8791 24.231 30.6661 23.016 31.3901C22.8677 31.4822 22.6974 31.5327 22.5229 31.5364C22.3484 31.5401 22.1761 31.4968 22.024 31.4111C21.109 30.8761 20.224 30.2961 19.343 29.7111C16.3233 27.7041 13.5291 25.3769 11.009 22.7701C9.84309 21.5479 8.80442 20.2104 7.909 18.7781C6.78634 17.0483 6.12882 15.0582 6 13.0001V12.5861C6.03195 10.1306 6.94468 7.76822 8.572 5.9291C9.83614 4.49419 11.5385 3.51664 13.415 3.1481Z" fill="#DA1E37"/>
</g>
<defs>
<filter id="filter0_d_6086_40919" x="0" y="0.00317383" width="45" height="40.5334" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="3"/>
<feGaussianBlur stdDeviation="3"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.161 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_6086_40919"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_6086_40919" result="shape"/>
</filter>
</defs>
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
