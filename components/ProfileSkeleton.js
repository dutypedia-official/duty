import React from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";
const { width, height } = Dimensions.get("window");

export default function ProfileSkeleton() {
  const colorMode = "light";
  //const colors = ["#F3F3F3", "#505050"];
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          marginHorizontal: 20,
        },
      ]}>
      <View
        style={{
          height: 410,
          alignItems: "flex-end",
          justifyContent: "center",
        }}>
        <Skeleton
          //colors={colors}
          colorMode={colorMode}
          radius="round"
          height={21}
          width={31}
        />
        <Gap height={16} />
        <Skeleton
          //colors={colors}
          colorMode={colorMode}
          radius="round"
          height={21}
          width={31}
        />
        <Gap height={16} />
        <Skeleton
          // colors={colors}
          colorMode={colorMode}
          radius="round"
          height={21}
          width={31}
        />
        <Gap height={16} />
        <Skeleton
          //colors={colors}
          colorMode={colorMode}
          radius="round"
          height={21}
          width={31}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}>
        <Skeleton
          colorMode={colorMode}
          radius="round"
          height={20}
          width={138}
        />
        <Skeleton colorMode={colorMode} radius="round" height={20} width={76} />
      </View>
      <Gap height={32} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Skeleton colorMode={colorMode} radius="round" height={63} width={63} />
        <Skeleton
          colorMode={colorMode}
          radius="round"
          height={30}
          width={width / 2 - 68}
        />
        <Skeleton
          colorMode={colorMode}
          radius="round"
          height={30}
          width={width / 2 - 68}
        />
      </View>
      {/* <Gap height={32} />
      <Skeleton colorMode={colorMode} radius="round" height={17} width={230} />
      <Gap height={32} />
      <Skeleton colorMode={colorMode} radius="round" height={11} width={276} />
      <Gap height={32} /> */}
      {/* <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}>
        <Skeleton
          colorMode={colorMode}
          radius="round"
          height={11}
          width={138}
        />
        <Gap width={16} />
        <Skeleton
          colorMode={colorMode}
          radius="round"
          height={11}
          width={138}
        />
      </View> */}
      {/* 
        
       
        
        <Gap height={32} />
        <Skeleton
         
          colorMode={colorMode}
          radius="round"
          height={17}
          width={113}
        />
        <Gap height={32} />
        <Skeleton
         
          colorMode={colorMode}
          radius="round"
          height={12}
          width={width - 40}
        />
        <Gap height={6} />
        <Skeleton
        
          colorMode={colorMode}
          radius="round"
          height={12}
          width={width - 40}
        />
        <Gap height={6} />
        <Skeleton
         
          colorMode={colorMode}
          radius="round"
          height={12}
          width={width - 40}
        />
        <Gap height={6} />
        <Skeleton
        
          colorMode={colorMode}
          radius="round"
          height={12}
          width={width - 40}
        />
        <Gap height={32} />
        <Skeleton
        
          colorMode={colorMode}
          radius="round"
          height={17}
          width={113}
        />
        <Gap height={32} />
        <Skeleton
         
          colorMode={colorMode}
          radius="round"
          height={12}
          width={width - 40}
        />
        <Gap height={6} />
        <Skeleton
         
          colorMode={colorMode}
          radius="round"
          height={12}
          width={width - 40}
        />
        <Gap height={6} />
        <Skeleton
         
          colorMode={colorMode}
          radius="round"
          height={12}
          width={width - 40}
        />
        <Gap height={6} /> */}
      {/* <Skeleton
          // colors={colors}
          colorMode={colorMode}
          radius="round"
          height={12}
          width={width - 40}
        />
        <Gap height={32} />
        <Skeleton
          //colors={colors}
          colorMode={colorMode}
          radius="round"
          height={17}
          width={113}
        />
        <Gap height={32} />
        <Skeleton
          //colors={colors}
          colorMode={colorMode}
          radius="round"
          height={12}
          width={width - 40}
        />
        <Gap height={6} />
        <Skeleton
          // colors={colors}
          colorMode={colorMode}
          radius="round"
          height={12}
          width={width - 40}
        />
        <Gap height={6} />
        <Skeleton
          //colors={colors}
          colorMode={colorMode}
          radius="round"
          height={12}
          width={width - 40}
        />
        <Gap height={6} />
        <Skeleton
          //colors={colors}
          colorMode={colorMode}
          radius="round"
          height={12}
          width={width - 40}
        /> */}
    </SafeAreaView>
  );
}
const Gap = ({ height, width }) => (
  <View style={{ height: height, width: width }} />
);
const styles = StyleSheet.create({
  shape: {
    justifyContent: "center",
    height: 250,
    width: 250,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
  },
  padded: {
    paddingHorizontal: 20,
  },
});
