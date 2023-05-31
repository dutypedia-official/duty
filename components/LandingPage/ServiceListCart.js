import React from 'react'
import { Dimensions, ScrollView, View ,Text, Pressable,Image} from 'react-native'
import { SvgXml } from 'react-native-svg'
import { AllData } from '../../Data/AllData'

const {width,height}=Dimensions.get("window")

export default function ServiceListCart({navigation}) {
  return (
    <View style={{
        marginVertical:20
    }}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
            <View style={{width:12}}/>
            {CATEGORY_LIST.map((doc,i)=>(
                <Cart onPress={()=>{
                    navigation?.navigate("SearchSecond", { key: doc?.title?.split(" ")[0],mainCategory:doc?.title?.split(" ")[0] });
                  }} key={i} data={doc}/>
            ))}
            <View style={{width:12}}/>
        </ScrollView>
    </View>
  )
}
const Cart=({data,onPress})=>{
    return(
        <Pressable onPress={onPress} style={{
            height:width/4-5,
            backgroundColor:data.color,
            marginHorizontal:6,
            borderRadius:20,
            justifyContent:"center",
            alignItems:"center",
            paddingHorizontal:28,
            paddingVertical:16,
            borderWidth:1,
            borderColor:"#E6E6E6"
        }}>
            <Image source={data.icon} style={{height:30,width:30}}/>
            <Text style={{
                fontSize:12,
                fontWeight:"700",
                marginTop:10,
                color:data?.title=="Painter"?"#484848":"white"
            }}>{data?.title}</Text>
        </Pressable>
    )
}

import builder from "../../assets/icon/builder.png"
import business from "../../assets/icon/business.png"
import cocker from "../../assets/icon/cocker.png"
import electronics from "../../assets/icon/electronics.png"
import entertainment from "../../assets/icon/entertainment.png"
import housekeeper from "../../assets/icon/housekeeper.png"
import it from "../../assets/icon/it.png"
import labor from "../../assets/icon/labor.png"
import lawyer from "../../assets/icon/lawyer.png"
import music from "../../assets/icon/music.png"
import online_tutorial from "../../assets/icon/online_tutorial.png"
import painter from "../../assets/icon/painter.png"
import salon from "../../assets/icon/salon.png"
import trainer from "../../assets/icon/trainer.png"

export const CATEGORY_LIST=[
    {
        title:"Builder",
        icon:builder,
        color:"#009BFF",
        key:"BUIDLER",
    },
    {
        title:"Parlour",
        icon:salon,
        color:"#A8B400",
        key:"PARLOUR",
    },
    {
        title:"Labor",
        icon:labor,
        color:"#FECB00",
        key:"LABOR",
    },
    {
        title:"Electrician",
        icon:electronics,
        color:"#222222",
        key:"ELECTRICIAN",
    },
    {
        title:"Lifestyle",
        icon:builder,
        color:"#9C2AA0",
        key:"LIFESTYLE",
    },
    {
        title:"Online tuition",
        icon:online_tutorial,
        color:"#007C92",
        key:"ONLINETUTION",
    },
    {
        title:"It & technology",
        icon:it,
        color:"#E60000",
        key:"IT",
    },
    {
        title:"Lawyer",
        icon:lawyer,
        color:"#C9C3E6",
        key:"LAWYER",
    },
    {
        title:"Business",
        icon:business,
        color:"#003262",
        key:"BUSINESS",
    },
    {
        title:"Cooker",
        icon:cocker,
        color:"#9DCE0A",
        key:"COOKER",
    },
    {
        title:"Entertainment",
        icon:entertainment,
        color:"#003087",
        key:"ENTERTAINMENT",
    },
    {
        title:"Painter",
        icon:painter,
        color:"#FFFFFF",
        key:"PAINTER",
    },
    {
        title:"Music & audio",
        icon:music,
        color:"#00B0CA33",
        key:"MUSIC",
    },
    {
        title:"House keeper",
        icon:housekeeper,
        color:"#00ADEE",
        key:"HOUSEKEEPER",
    },
]