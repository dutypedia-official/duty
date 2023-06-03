import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import { View,ScrollView,RefreshControl } from "react-native";
import { wait } from "../../action";
import useHandleScroll from "../../components/constants/FabView";


export default function SellerLayout({ onScrollAction,onRefresh,component,headers,handleScroll }) {
    const [scrollEnabled,setScrollEnabled]=useState(false)
    const scrollRef=useRef()
   
    const [refreshing, setRefreshing] = React.useState(false);
    const [offset, setOffset] = React.useState();
    const onRefresher = React.useCallback(() => {
        setRefreshing(true);
        onRefresh&&onRefresh()
        wait(2000).then(() => setRefreshing(false));
      }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        hidden={false}
        backgroundColor={scrollEnabled ? "white" : "transparent"}
      />
      <ScrollView
        scrollEventThrottle={16}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        ref={scrollRef}
        refreshControl={
          <RefreshControl
            style={{}}
            refreshing={refreshing}
            onRefresh={onRefresher}
          />
        }
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: "white",
          flex: 1,
        }}
        onScroll={(e) => {
          handleScroll&& handleScroll(e);
          const currentOffset = e.nativeEvent.contentOffset.y;
          const dif = currentOffset - (offset || 0);

          if (Math.abs(dif) < 3) {
            //setScrollEnabled(false);
          } else if (dif < 0) {
            //console.log("up")
            if (currentOffset < 380) {
              setScrollEnabled(false);
            }
          } else {
            if (currentOffset > 380) {
              setScrollEnabled(true);
            } else {
              setScrollEnabled(false);
            }
          }
          onScrollAction&&onScrollAction(currentOffset,scrollEnabled)
          setOffset(currentOffset);
        }}>
            {component}
        </ScrollView>
        {headers}
    </View>
  );
}
