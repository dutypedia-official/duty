import React from "react";
import { Dimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import ImageViewer from "react-native-image-zoom-viewer";
const {width,height}=Dimensions.get("window")

export default function PictureViewer({ url,onClose }) {
  const inset = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000000",
        paddingTop: inset?.top,
      }}>
      <View
        style={{
          alignItems: "flex-end",
          paddingRight:20,
          paddingTop:20
        }}>
        <AntDesign onPress={onClose} name="closecircleo" size={24} color="#e5e5e5" />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          
        }}>
        <ImageViewer style={{
            width:width,
            height:height/2
        }} imageUrls={[{url:url}]} renderIndicator={() => null} />
      </View>
    </View>
  );
}
