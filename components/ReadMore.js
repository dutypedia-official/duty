import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import ReadMoreText from "rn-read-more-text";
import useLang from "../Hooks/UseLang";

export default function ReadMore({
  style,
  numberOfLine,
  content,
  containerStyle,
}) {
  const { language } = useLang();
  const isBn = language == "Bn";
  const [textRef, setTextRef] = React.useState();
  // render footer
  const handleManualToggle = () => textRef && textRef.toggle();
  const renderFooter = ({ isShowingAll, toggle }) => {
    return (
      <View>
        {!isShowingAll && (
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#4ADE80",
            }}
          >
            {isBn ? "আরও দেখুন..." : "See More..."}
          </Text>
        )}
      </View>
    );
  };
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={containerStyle}
      onPress={handleManualToggle}
    >
      <ReadMoreText
        ref={(r) => setTextRef(r)}
        style={[
          {
            fontSize: 16,
            lineHeight: 24,
            color: "#1A1A1A",
            fontWeight: "400",
          },
          style,
        ]}
        limitLines={numberOfLine ? numberOfLine : 3}
        renderFooter={renderFooter}
      >
        {content}
      </ReadMoreText>
    </TouchableOpacity>
  );
}
