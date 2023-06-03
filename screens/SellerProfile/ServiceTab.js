import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Dimensions,
  ScrollView,
} from "react-native";
import IconButton from "../../components/IconButton";
const { width, height } = Dimensions.get("window");

export default function ServiceTab({
  categories,
  components,
  wid,
  scrollEnabled,
  onChange
}) {
  const [active, setActive] = useState("Bargaining");
  const [translateValue] = useState(new Animated.Value(0));
  const [index, setIndex] = useState(0);
  const ref=useRef()
  //const [w,setW]=useState(wid?wid:width)
  const press = (v) => {
    Animated.spring(translateValue, {
      toValue: v * (wid ? wid : width / 3),
      velocity: 10,
      useNativeDriver: true,
    }).start();
    if(ref){
       // console.log(ref)
        ref?.current?.scrollTo({x:v==1?0:v==3?(v*100):(v*70)})
    }
  };
  return (
    <View>
      {scrollEnabled ? (
        <ScrollView ref={ref} showsHorizontalScrollIndicator={false} horizontal={true}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              borderBottomWidth: 2,
              borderBottomColor: "#fafafa",
            }}>
            {categories?.map((doc, i) => (
              <IconButton
                onPress={() => {
                  setActive(doc.title);
                  press(i);
                  setIndex(i);
                  console.log(i)
                  onChange&&onChange(doc.type)
                }}
                style={[
                  st.button,
                  i == 0 && { paddingLeft: 20 },
                  { width: wid ? wid : width / 3 },
                ]}
                key={i}
                title={doc.title}
              />
            ))}
            <View style={[StyleSheet.absoluteFillObject, { top: 45 }]}>
              <Animated.View
                style={{
                  width: wid ? wid : width / 3,
                  transform: [{ translateX: translateValue }],
                }}>
                <Animated.View
                  style={[
                    {
                      width: wid ? wid : width / 3,
                      height: 2,

                      backgroundColor: "#4ADE80",
                    },
                  ]}
                />
              </Animated.View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            borderBottomWidth: 2,
            borderBottomColor: "#fafafa",
          }}>
          {categories?.map((doc, i) => (
            <IconButton
              onPress={() => {
                setActive(doc.title);
                press(i);
                setIndex(i);
              }}
              style={[
                st.button,
                i == 0 && { paddingLeft: 20 },
                { width: wid ? wid : width / 3 },
              ]}
              key={i}
              title={doc.title}
            />
          ))}
          <View style={[StyleSheet.absoluteFillObject, { top: 45 }]}>
            <Animated.View
              style={{
                width: wid ? wid : width / 3,
                transform: [{ translateX: translateValue }],
              }}>
              <Animated.View
                style={[
                  {
                    width: wid ? wid : width / 3,
                    height: 2,

                    backgroundColor: "#4ADE80",
                  },
                ]}
              />
            </Animated.View>
          </View>
        </View>
      )}

      {components?.length == categories?.length && components[index]}
    </View>
  );
}
const st = StyleSheet.create({
  button: {
    borderWidth: 0,
    borderBottomWidth: 0,
    fontSize: 16,
    width: width / 3,
  },
  active: {
    borderBottomWidth: 1.5,
    borderBottomColor: "#4ADE80",
  },
});
