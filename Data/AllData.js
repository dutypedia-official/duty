import builder_1 from "../assets/Images/builder_1.jpg";
import uuid from "react-native-uuid";
import { BuilderOptions } from "./../Data/builder";
import {
  BuilderIcon,
  BusinessServiceIcon,
  CookerIcon,
  ElectricIcon,
  EntertainmentIcon,
  HouseKeeperIcon,
  ItIcon,
  MusicIcon,
  PainterIcon,
  OnlineTutionIcon,
  SaloonIcon,
  RentIcon,
} from "../assets/icon";
import business from "../assets/Images/business.webp";
import { BusinessOptions } from "./../Data/business";
import { CookerOptions } from "./../Data/cooker";
import { ElectricianOptions } from "./../Data/electrician";
import electrician from "../assets/Images/electrician.webp";
import entertainment from "../assets/Images/entertainment.webp";
import { EntertainmentOptions } from "./../Data/entertainment";
import MainHouseKeeper from "./../Data/MainHouseKeeper";
import it from "../assets/Images/it.webp";
import { ItOptions } from "./../Data/it";
import musicaudio from "../assets/Images/musicaudio.webp";
import { MusicAudioOptions } from "./../Data/musicaudio";
import MainPainter from "./../Data/MainPainter";
import { OnlineTutionOptions } from "./../Data/onlinetution";
import onlinetution from "../assets/Images/onlinetution.webp";
import parlour from "../assets/Images/parlour.webp";
import { ParlorOptions } from "./../Data/parlor";
import MainLabor from "./../Data/MainLabor";
import head from "../assets/Images/head.webp";
import { lawyer, lifeStyle } from "./../assets/icon";
import { LawyerOptions } from "./lawyer";
import lifestyle from "../assets/Images/lifestyle.webp";
import { LifeStyleOptions } from "../Data/lifestyle";
import bs from "../assets/backgrounds/bs.jpg";
import ck from "../assets/backgrounds/ck.jpg";
import en from "../assets/backgrounds/en.jpg";
import ent from "../assets/backgrounds/ent.png";
import hc from "../assets/backgrounds/hc.jpg";
import its from "../assets/backgrounds/it.jpg";
import law from "../assets/backgrounds/law.jpg";
import lb from "../assets/backgrounds/lb.jpg";
import music from "../assets/backgrounds/music.jpg";
import ppt from "../assets/backgrounds/ppt.jpg";
import salon from "../assets/backgrounds/salon.jpg";
import tutor from "../assets/backgrounds/tutor.jpg";
import life from "../assets/backgrounds/life.jpg";
import bu from "../assets/backgrounds/bu.png";

export const AllData = [
  {
    title: "Builder Services",
    titleBn: "নির্মাতা সার্ভিস",
    icon: BuilderIcon,
    color: "#FF9C68",
    image: builder_1,
    picture: bu,
    key: "BUIDLER",
    data: [
      {
        title: "Bridge Builder",
        titleBn: "সেতু নির্মাতা",
        list: [
          {
            title: "Bridge Builder",
            titleBn: "সেতু নির্মাতা",
            data: BuilderOptions.bridgebuilder,
          },
        ],
      },
      {
        title: "Carpenter",
        titleBn: "কাঠ মিস্ত্রি",
        list: [
          {
            title: "Carpenter",
            titleBn: "কাঠ মিস্ত্রি",
            data: BuilderOptions.carpenter,
          },
        ],
      },
      {
        title: "House Builder",
        titleBn: "বাসা নির্মাতা",
        list: [
          {
            title: "House Builder",
            titleBn: "বাসা/বাড়ি নির্মাতা",
            data: BuilderOptions.housebuilder,
          },
        ],
      },
      {
        title: "Jewellary Items",
        titleBn: "জুয়েলারী আইটেম",
        list: [
          {
            title: "Jewelry Items",
            data: BuilderOptions.jewellaryitems.JewelryItems,
          },
          {
            title: "Goldsmith Services",
            data: BuilderOptions.jewellaryitems.GoldsmithServices,
          },
          {
            title: "Gold Type",
            data: BuilderOptions.jewellaryitems.GoldType,
          },
          {
            title: "Types Of Diamonds",
            data: BuilderOptions.jewellaryitems.TypesOfDiamonds,
          },
        ],
      },
      {
        title: "Office Builder",
        titleBn: "অফিস নির্মাতা",
        list: [
          {
            title: "Office Builder",
            titleBn: "অফিস নির্মাতা",
            data: BuilderOptions.officebuilder,
          },
        ],
      },
      {
        title: "Road Construction",
        titleBn: "রাস্তা নির্মাতা",
        list: [
          {
            title: "Road Construction",
            titleBn: "রাস্তা নির্মাতা",
            data: BuilderOptions.roadconstruction,
          },
        ],
      },
      {
        title: "Tailor Service",
        titleBn: "দর্জি সার্ভিস",
        list: [
          {
            title: "Females Dress",
            titleBn: "মহিলাদের পোশাক",
            data: BuilderOptions.tailorservice.LadiesDress,
          },
          {
            title: "Males Dress",
            titleBn: "পুরুষদের পোশাক",
            data: BuilderOptions.tailorservice.JeansDress,
          },
          {
            title: "Baby Dress",
            titleBn: "বাচ্চাদের পোশাক",
            data: BuilderOptions.tailorservice.BabyDress,
          },
        ],
      },
    ],
  },
  {
    title: "Business Services",
    titleBn: "ব্যবসা সংক্রান্ত সার্ভিস",
    icon: BusinessServiceIcon,
    color: "blue",
    image: business,
    picture: bs,
    key: "BUSINESS",
    data: [
      {
        title: "Branding Services",
        titleBn: "ব্রান্ড সংক্রান্ত সার্ভিস",
        list: [
          {
            title: "Branding Services",
            titleBn: "ব্রান্ড সংক্রান্ত সার্ভিস",
            data: BusinessOptions.BRANDINGSERVICES,
          },
        ],
      },
      {
        title: "Business Consulting",
        titleBn: "ব্যবসা পরামর্শ",
        list: [
          {
            title: "Industry",
            titleBn: "শিল্প/কারখানা",
            data: BusinessOptions.BusinessConsulting.Industry,
          },
          {
            title: "Purpose",
            titleBn: "উদ্দেশ্য",
            data: BusinessOptions.BusinessConsulting.Purpose,
          },
        ],
      },
      {
        title: "Business Plans",
        titleBn: "ব্যবসা পরিকল্পনা",
        list: [
          {
            title: "Business Type",
            titleBn: "ব্যবসার ধরন",
            data: BusinessOptions.BusinessPlans.BusinessType,
          },
          {
            title: "Plan Format",
            titleBn: "পরিকল্পনার ফরমেট",
            data: BusinessOptions.BusinessPlans.PlanFormat,
          },
          {
            title: "Plan Purpose",
            titleBn: "পরিকল্পনার উদ্দেশ্য",
            data: BusinessOptions.BusinessPlans.PlanPurpose,
          },
        ],
      },
      {
        title: "Career Counseling",
        titleBn: "কেরিয়ার পরামর্শ",
        list: [
          {
            title: "Career Counseling",
            titleBn: "কেরিয়ার পরামর্শ",
            data: BusinessOptions.CAREERCOUNSELING,
          },
        ],
      },
      {
        title: "Customer Care",
        titleBn: "গ্রাহক সেবা",
        list: [
          {
            title: "Timezone",
            titleBn: "সময়ক্ষেত্র",
            data: BusinessOptions.CustomerCare.Timezone,
          },
          {
            title: "Support Software",
            titleBn: "সফ্টওয়্যার সহায়তা",
            data: BusinessOptions.CustomerCare.SupportSoftware,
          },
          {
            title: "Knowledgebase Software",
            data: BusinessOptions.CustomerCare.KnowledgebaseSoftware,
          },
          {
            title: "Social Media Platform",
            data: BusinessOptions.CustomerCare.SocialMediaPlatform,
          },
          {
            title: "Service Type",
            data: BusinessOptions.CustomerCare.ServiceType_2,
          },
          {
            title: "Industry",
            data: BusinessOptions.CustomerCare.Industry,
          },
        ],
      },
      {
        title: "Data Entry",
        titleBn: "ডেটা এন্ট্রি",
        list: [
          {
            title: "Service Type",
            data: BusinessOptions.DataEntry.ServiceType,
          },
          {
            title: "Tool",
            data: BusinessOptions.DataEntry.Tool,
          },
        ],
      },
      {
        title: "E-Commerce Management",
        titleBn: "ই-কমার্স পরিচালনা",
        list: [
          {
            title: "Service Type",
            data: BusinessOptions.ECommerceManagement.ServiceType,
          },
          {
            title: "Industry",
            data: BusinessOptions.ECommerceManagement.Industry,
          },
          {
            title: "Platform",
            data: BusinessOptions.ECommerceManagement.Platform,
          },
        ],
      },
      {
        title: "Financial Consulting",
        titleBn: "আর্থিক পরামর্শ",
        list: [
          {
            title: "Service Type",
            data: BusinessOptions.FinancialConsulting.ServiceType,
          },
          {
            title: "Industry",
            data: BusinessOptions.FinancialConsulting.Industry,
          },
        ],
      },
      {
        title: "Game Concept Design",
        titleBn: "গেম ধারণা ডিজাইন",
        list: [
          {
            title: "Genre",
            data: BusinessOptions.GameConceptDesign.Genre,
          },
          {
            title: "Game Type",
            data: BusinessOptions.GameConceptDesign.GameType,
          },
          {
            title: "Platform Type",
            data: BusinessOptions.GameConceptDesign.PlatformType,
          },
          {
            title: "Monetization Model",
            data: BusinessOptions.GameConceptDesign.MonetizationModel,
          },
          {
            title: "Purpose",
            data: BusinessOptions.GameConceptDesign.Purpose,
          },
        ],
      },
      {
        title: "Hr Consulting",
        titleBn: "মানব সম্প্রসারণ পরামর্শ",
        list: [
          {
            title: "Service Type",
            data: BusinessOptions.HrConsulting.ServiceType,
          },
          {
            title: "Industry",
            data: BusinessOptions.HrConsulting.Industry,
          },
        ],
      },
      {
        title: "Lead Generation",
        titleBn: "লিড জেনারেশন",
        list: [
          {
            title: "Lead Generation",
            titleBn: "লিড জেনারেশন",
            data: BusinessOptions.LEADGENERATION,
          },
        ],
      },
      {
        title: "Legal Consulting",
        titleBn: "আইনি পরামর্শ",
        list: [
          {
            title: "Service Type",
            data: BusinessOptions.LegalConsulting.ServiceType,
          },
          {
            title: "Field Of Law",
            data: BusinessOptions.LegalConsulting.FieldOfLaw,
          },
          {
            title: "Document Type",
            data: BusinessOptions.LegalConsulting.DocumentType,
          },
          {
            title: "Agreement Type",
            data: BusinessOptions.LegalConsulting.AgreementType,
          },
        ],
      },
      {
        title: "Market Research",
        titleBn: "বাজার গবেষণা",
        list: [
          {
            title: "Market Research",
            titleBn: "বাজার গবেষণা",
            data: [],
          },
        ],
      },
      {
        title: "Presentations",
        list: [
          {
            title: "Service Type",
            data: BusinessOptions.PRESENTATIONS.ServiceType,
          },
          {
            title: "Presentation Type",
            data: BusinessOptions.PRESENTATIONS.PresentationType,
          },
          {
            title: "Industry",
            data: BusinessOptions.PRESENTATIONS.Industry,
          },
        ],
      },
      {
        title: "Printer",
        titleBn: "প্রিন্টার",
        list: [
          {
            title: "Printer",
            titleBn: "প্রিন্টার",
            data: [],
          },
        ],
      },
      {
        title: "Project Management",
        titleBn: "প্রকল্প ব্যবস্থাপনা",
        list: [
          {
            title: "Project Management",
            titleBn: "প্রকল্প ব্যবস্থাপনা",
            data: BusinessOptions.PROJECTMANAGEMENT,
          },
        ],
      },
      {
        title: "Supply Chain Management",
        titleBn: "সাপ্লাই চেইন ব্যবস্থাপনা",
        list: [
          {
            title: "Service Type",
            data: BusinessOptions.SupplyChainManagement.ServiceType,
          },
          {
            title: "Product Type",
            data: BusinessOptions.SupplyChainManagement.ProductType,
          },
        ],
      },
      {
        title: "Virtual Assistant",
        titleBn: "ভার্চুয়াল সহায়ক",
        list: [
          {
            title: "Service Type",
            data: BusinessOptions.VIRTUALASSISTANT.ServiceType,
          },
          {
            title: "Purpose",
            data: BusinessOptions.VIRTUALASSISTANT.Purpose,
          },
          {
            title: "Industry",
            data: BusinessOptions.VIRTUALASSISTANT.Industry,
          },
        ],
      },
    ],
  },
  {
    title: "Cooker Service",
    titleBn: "রান্না সেবা",
    icon: CookerIcon,
    color: "#ED488B",
    image: builder_1,
    picture: ck,
    key: "COOKER",
    data: [
      {
        title: "Dinner & lunch",
        titleBn: "ডিনার এবং লাঞ্চ",
        list: [
          {
            title: "Charcoal Choice",
            data: CookerOptions.Dinner_Lunch.CharcoalChoice,
          },
          {
            title: "Soups",
            data: CookerOptions.Dinner_Lunch.Soups,
          },
          {
            title: "Sandwich",
            data: CookerOptions.Dinner_Lunch.Sandwich,
          },
          {
            title: "Pizzas",
            data: CookerOptions.Dinner_Lunch.Pizzas,
          },
          {
            title: "Pasta",
            data: CookerOptions.Dinner_Lunch.Pasta,
          },
          {
            title: "Set Menu",
            data: CookerOptions.Dinner_Lunch.setmenu,
          },
          {
            title: "Desserts",
            data: CookerOptions.Dinner_Lunch.Desserts,
          },
        ],
      },
      {
        title: "Events Items",
        titleBn: "সন্ধ্যার আইটেমস",
        list: [
          {
            title: "Birthday",
            data: CookerOptions.eventitems.birthday,
          },
          {
            title: "Picnic Anniversary",
            data: CookerOptions.eventitems.Picnic_Anniversary,
          },
        ],
      },
      {
        title: "Hotel / Restaurant Items",
        titleBn: "হোটেল / রেস্টুরেন্ট আইটেমস",
        list: [
          {
            title: "Restaurant",
            data: CookerOptions.hotelrestaurentitems.Restaurant,
          },
          {
            title: "Hotel",
            data: CookerOptions.hotelrestaurentitems.Hotel,
          },
          {
            title: "Breakfast",
            data: CookerOptions.hotelrestaurentitems.breakfast,
          },
          {
            title: "Beverages",
            data: CookerOptions.hotelrestaurentitems.Beverages,
          },
          {
            title: "Snacks",
            data: CookerOptions.hotelrestaurentitems.Snacks,
          },
        ],
      },
      {
        title: "Wedding Items",
        titleBn: "বিয়ের আইটেমস",
        list: [
          {
            title: "Wedding",
            data: CookerOptions.WeddingItems.Wedding,
          },
          {
            title: "Rice Items",
            data: CookerOptions.WeddingItems.RiceItems,
          },
          {
            title: "Curry Items",
            data: CookerOptions.WeddingItems.CurryItems,
          },
          {
            title: "Cutlet Items",
            data: CookerOptions.WeddingItems.CutletItems,
          },
          {
            title: "Kebab Items",
            data: CookerOptions.WeddingItems.KebabItems,
          },
          {
            title: "Fish Items",
            data: CookerOptions.WeddingItems.FishItems,
          },
          {
            title: "Chicken Items",
            data: CookerOptions.WeddingItems.ChickenItems,
          },
          {
            title: "Beef Items",
            data: CookerOptions.WeddingItems.BeefItems,
          },
          {
            title: "Dessert Items",
            data: CookerOptions.WeddingItems.DessertItems,
          },
        ],
      },
    ],
  },
  {
    title: "Electrician & Mechanician",
    titleBn: "ইলেকট্রিশিয়ান এবং মেকানিশিয়ান",
    icon: ElectricIcon,
    color: "#FFB800",
    image: electrician,
    picture: en,
    key: "ELECTRICIAN",
    data: [
      {
        title: "Ac",
        titleBn: "এসি",
        list: [
          {
            title: "Ac",
            titleBn: "এসি",
            data: ElectricianOptions.Ac,
          },
        ],
      },
      {
        title: "Bicycle",
        titleBn: "সাইকেল",
        list: [
          {
            title: "Bicycle",
            titleBn: "সাইকেল",
            data: ElectricianOptions.Bicycle,
          },
        ],
      },
      {
        title: "Car",
        titleBn: "গাড়ি",
        list: [
          {
            title: "Car",
            titleBn: "গাড়ি",
            data: ElectricianOptions.Car,
          },
        ],
      },
      {
        title: "Camera",
        titleBn: "ক্যামেরা",
        list: [
          {
            title: "Camera",
            titleBn: "ক্যামেরা",
            data: ElectricianOptions.Camera,
          },
        ],
      },
      {
        title: "Refrigerator",
        titleBn: "রেফ্রিজারেটর",
        list: [
          {
            title: "Refrigerator",
            titleBn: "রেফ্রিজারেটর",
            data: ElectricianOptions.Refrigerator,
          },
        ],
      },
      {
        title: "Mobile",
        titleBn: "মোবাইল",
        list: [
          {
            title: "Mobile",
            titleBn: "মোবাইল",
            data: ElectricianOptions.Mobile,
          },
        ],
      },
      {
        title: "Pc",
        titleBn: "পিসি",
        list: [
          {
            title: "Pc",
            titleBn: "পিসি",
            data: ElectricianOptions.Pc,
          },
        ],
      },
      {
        title: "Printer",
        titleBn: "প্রিন্টার",
        list: [
          {
            title: "Printer",
            titleBn: "প্রিন্টার",
            data: ElectricianOptions.Printer,
          },
        ],
      },
      {
        title: "Bike",
        titleBn: "বাইক",
        list: [
          {
            title: "Tyres Wheel",
            data: ElectricianOptions.Bike.Tyres_Wheel,
          },
          {
            title: "Gear",
            data: ElectricianOptions.Bike.Gear,
          },
          {
            title: "Genaral",
            data: ElectricianOptions.Bike.Genaral,
          },
          {
            title: "Safety Check",
            data: ElectricianOptions.Bike.SafetyCheck,
          },
        ],
      },
    ],
  },
  {
    title: "Entertainment",
    titleBn: "বিনোদন",
    icon: EntertainmentIcon,
    color: "#8E4DD5",
    image: entertainment,
    picture: ent,
    key: "ENTERTAINMENT",
    data: [
      {
        title: "Videographer Services",
        titleBn: "ভিডিওগ্রাফার সেবাসমূহ",
        list: [
          {
            title: "Services",
            data: EntertainmentOptions.VideographerServices.Services,
          },
          {
            title: "Video Shoot",
            titleBn: "ভিডিও শুট",
            data: EntertainmentOptions.VideographerServices.VideoShoot,
          },
        ],
      },
      {
        title: "Photographer Services",
        titleBn: "ফটোগ্রাফার সেবাসমূহ",
        list: [
          {
            title: "Sessions",
            titleBn: "সেশনস",
            data: EntertainmentOptions.photographer_services.Sessions,
          },
          {
            title: "Photography Style",
            titleBn: "ছবির স্টাইল",
            data: EntertainmentOptions.photographer_services.photography_style,
          },
        ],
      },
      {
        title: "Picnic",
        titleBn: "পিকনিক",
        list: [
          {
            title: "All City Picnic Spot",
            titleBn: "সব শহরের পিকনিক স্পট",
            data: EntertainmentOptions.picnic.all_city_picnic_spot,
          },
          {
            title: "Vehicles",
            titleBn: "যানবাহন",
            data: EntertainmentOptions.picnic.Vehicles,
          },
        ],
      },
      {
        title: "Birthday",
        titleBn: "জন্মদিন",
        list: [
          {
            title: "Birthday",
            titleBn: "জন্মদিন",
            data: EntertainmentOptions.Birthday,
          },
        ],
      },
      {
        title: "Wedding",
        titleBn: "বিবাহ",
        list: [
          {
            title: "Wedding",
            titleBn: "বিবাহ",
            data: EntertainmentOptions.wedding,
          },
        ],
      },
    ],
  },
  {
    title: "House Keeper",
    titleBn: "বাড়ির কাজের লোক",
    icon: HouseKeeperIcon,
    color: "#FF4155",
    image: entertainment,
    picture: hc,
    key: "HOUSEKEEPER",
    list: [
      {
        title: "House Keeper",
        titleBn: "বাড়ির কাজের লোক",
        data: MainHouseKeeper,
      },
    ],
  },
  {
    title: "It & Technology",
    titleBn: "আইটি এবং প্রযুক্তি",
    icon: ItIcon,
    color: "#2381FF",
    image: it,
    picture: its,
    key: "IT",
    data: [
      {
        title: "Data",
        titleBn: "ডেটা",
        image: it,
        data: [
          {
            title: "Database",
            titleBn: "ডেটাবেস",
            list: [
              {
                title: "Category",
                data: ItOptions.Data.Databases.Category,
              },
              {
                title: "Database Type",
                data: ItOptions.Data.Databases.DatabaseType,
              },
              {
                title: "Platform",
                data: ItOptions.Data.Databases.Platform,
              },
              {
                title: "Cloud Platform",
                data: ItOptions.Data.Databases.CloudPlatform,
              },
              {
                title: "Expertise",
                data: ItOptions.Data.Databases.Expertise,
              },
            ],
          },
          {
            title: "Data Processing",
            titleBn: "ডেটা প্রক্রিয়াকরণ",
            list: [
              {
                title: "Service Type",
                data: ItOptions.Data.DataProcessing.ServiceType,
              },
              {
                title: "Technology",
                data: ItOptions.Data.DataProcessing.Technology,
              },
              {
                title: "ScrapingTechnique",
                data: ItOptions.Data.DataProcessing.ScrapingTechnique,
              },
              {
                title: "Information Type",
                data: ItOptions.Data.DataProcessing.InformationType,
              },
              {
                title: "Expertise",
                data: ItOptions.Data.DataProcessing.Expertis,
              },
            ],
          },
          {
            title: "Data Analytics",
            titleBn: "ডেটা বিশ্লেষণ",
            list: [
              {
                title: "Service Type",
                data: ItOptions.Data.DataAnalytics.ServiceType,
              },
              {
                title: "Technology",
                data: ItOptions.Data.DataAnalytics.Technology,
              },
              {
                title: "Analysis Type",
                data: ItOptions.Data.DataAnalytics.AnalysisType,
              },
              {
                title: "Expertise",
                data: ItOptions.Data.DataAnalytics.Expertise,
              },
            ],
          },
          {
            title: "Data Visualization",
            titleBn: "ডেটা ভিজ্যুয়ালাইজেশন",
            list: [
              {
                title: "Service Type",
                data: ItOptions.Data.DataVisualization.ServiceType,
              },
              {
                title: "Tool",
                data: ItOptions.Data.DataVisualization.Tool,
              },
              {
                title: "Chart Type",
                data: ItOptions.Data.DataVisualization.ChartType,
              },
            ],
          },
          {
            title: "Data Science",
            titleBn: "ডেটা সায়েন্স",
            list: [
              {
                title: "Service Type",
                data: ItOptions.Data.DataScience.ServiceType,
              },
              {
                title: "Models & Methods",
                data: ItOptions.Data.DataScience.Models_Methods,
              },
              {
                title: "Technology",
                data: ItOptions.Data.DataScience.Technology,
              },
              {
                title: "Expertise",
                data: ItOptions.Data.DataScience.Expertise,
              },
            ],
          },
          {
            title: "Data Entry",
            titleBn: "ডেটা এন্ট্রি",
            list: [
              {
                title: "Type",
                data: ItOptions.Data.DataEntry.Type,
              },
              {
                title: "Tool",
                data: ItOptions.Data.DataEntry.Tool,
              },
            ],
          },
        ],
      },
      {
        title: "Graphic",
        titleBn: "গ্রাফিক",
        image: it,
        data: [
          {
            title: "Graphics For Streamers",
            list: [
              {
                title: "Asset Type",
                data: ItOptions.Graphic.GraphicsForStreamers.AssetType,
              },
              {
                title: "Streaming Platform",
                data: ItOptions.Graphic.GraphicsForStreamers.StreamingPlatform,
              },
            ],
          },
          {
            title: "Business Cards",
            titleBn: "ব্যবসা কার্ড",
            list: [
              {
                title: "Main Type",
                data: ItOptions.Graphic.BusinessCards.MainType,
              },
              {
                title: "Image File Format",
                data: ItOptions.Graphic.BusinessCards.ImageFileFormat,
              },
            ],
          },
          {
            title: "Illustration",
            titleBn: "ইলাস্ট্রেশন",
            list: [
              {
                title: "Artistic Technique",
                data: ItOptions.Graphic.Illustration.ArtisticTechnique,
              },
              {
                title: "Style",
                data: ItOptions.Graphic.Illustration.Style,
              },
              {
                title: "Theme",
                data: ItOptions.Graphic.Illustration.Theme,
              },
              {
                title: "Subject",
                data: ItOptions.Graphic.Illustration.Subject,
              },
            ],
          },
          {
            title: "Pattern Design",
            titleBn: "প্যাটার্ন ডিজাইন",
            list: [
              {
                title: "Design Technique",
                data: ItOptions.Graphic.PatternDesign.DesignTechnique,
              },
              {
                title: "Design Style",
                data: ItOptions.Graphic.PatternDesign.DesignStyle,
              },
              {
                title: "Purpose",
                data: ItOptions.Graphic.PatternDesign.Purpose,
              },
              {
                title: "Pattern Theme",
                data: ItOptions.Graphic.PatternDesign.PatternTheme,
              },
            ],
          },
          {
            title: "Flyer Design",
            titleBn: "ফ্লায়ার ডিজাইন",
            list: [
              {
                title: "Format Type",
                data: ItOptions.Graphic.FlyerDesign.FormatType,
              },
              {
                title: "Image File Format",
                data: ItOptions.Graphic.FlyerDesign.ImageFileFormat,
              },
            ],
          },
          {
            title: "Book Design",
            titleBn: "বই ডিজাইন",
            list: [
              {
                title: "Design Style",
                data: ItOptions.Graphic.BookDesign.DesignStyle,
              },
              {
                title: "Genre",
                data: ItOptions.Graphic.BookDesign.Genre,
              },
              {
                title: "File Format",
                data: ItOptions.Graphic.BookDesign.FileFormat,
              },
            ],
          },
          {
            title: "Album Cover Design",
            titleBn: "অ্যালবাম কভার ডিজাইন",
            list: [
              {
                title: "Design Style",
                data: ItOptions.Graphic.AlbumCoverDesign.DesignStyle,
              },
              {
                title: "Musical Genre",
                data: ItOptions.Graphic.AlbumCoverDesign.MesicalGenre,
              },
              {
                title: "Album Type",
                data: ItOptions.Graphic.AlbumCoverDesign.AlbumType,
              },
            ],
          },
          {
            title: "Packaging Design",
            titleBn: "প্যাকেজিং ডিজাইন",
            list: [
              {
                title: "Product Type",
                data: ItOptions.Graphic.PackagingDesign.ProductType,
              },
              {
                title: "File Format",
                data: ItOptions.Graphic.PackagingDesign.FileFormat,
              },
            ],
          },
          {
            title: "Ar Filters & Lenses",
            titleBn: "AR ফিল্টার এবং লেন্স",
            list: [
              {
                title: "Platform",
                data: ItOptions.Graphic.ArFiltersLenses.Platform,
              },
              {
                title: "Filter Type",
                data: ItOptions.Graphic.ArFiltersLenses.FilterType,
              },
            ],
          },
          {
            title: "Web & Mobile Design",
            titleBn: "ওয়েব এবং মোবাইল ডিজাইন",
            list: [
              {
                title: "Main Type",
                data: ItOptions.Graphic.WebMobileDesign.MainType,
              },
              {
                title: "Image File Format",
                data: ItOptions.Graphic.WebMobileDesign.ImageFileFormat,
              },
            ],
          },
          {
            title: "Social Media Design",
            titleBn: "সোশ্যাল মিডিয়া ডিজাইন",
            list: [
              {
                title: "Platform",
                data: ItOptions.Graphic.SocialMediaDesign.Platform,
              },
              {
                title: "Image File Format",
                data: ItOptions.Graphic.SocialMediaDesign.ImageFileFormat,
              },
            ],
          },
          {
            title: "Menu Design",
            titleBn: "মেনু ডিজাইন",
            list: [
              {
                title: "Pourpose",
                data: ItOptions.Graphic.MenuDesign.Pourpose,
              },
              {
                title: "Style",
                data: ItOptions.Graphic.MenuDesign.Style,
              },
            ],
          },
          {
            title: "Invitation Design",
            titleBn: "আমন্ত্রণ ডিজাইন",
            list: [
              {
                title: "Main Type",
                data: ItOptions.Graphic.InvitationDesign.MainType,
              },
              {
                title: "Image File Format",
                data: ItOptions.Graphic.InvitationDesign.ImageFileFormat,
              },
            ],
          },
          {
            title: "Portraits Caricatures",
            titleBn: "পোর্ট্রেট ক্যারিকেচার",
            list: [
              {
                title: "Illustration Type",
                data: ItOptions.Graphic.PortraitsCaricatures.IllustrationType,
              },
              {
                title: "Illustration Style",
                data: ItOptions.Graphic.PortraitsCaricatures.IllustrationStyle,
              },
            ],
          },
          {
            title: "Cartoons Comics",
            titleBn: "কার্টুন কমিক্স",
            list: [
              {
                title: "Main Type",
                data: ItOptions.Graphic.CartoonsComics.MainType,
              },
              {
                title: "Illustration Style",
                data: ItOptions.Graphic.CartoonsComics.IllustrationStyle,
              },
              {
                title: "Image File Format",
                data: ItOptions.Graphic.CartoonsComics.ImageFileFormat,
              },
            ],
          },
          {
            title: "Web Banners",
            titleBn: "ওয়েব ব্যানার",
            list: [
              {
                title: "Main Type",
                data: ItOptions.Graphic.WebBanners.MainType,
              },
              {
                title: "Image File Format",
                data: ItOptions.Graphic.WebBanners.ImageFileFormat,
              },
            ],
          },
          {
            title: "Photoshop Editing",
            titleBn: "ফটোশপ এডিটিং",
            list: [
              {
                title: "Editing Type",
                data: ItOptions.Graphic.PhotoshopEditing.EditingType,
              },
              {
                title: "File Format",
                data: ItOptions.Graphic.PhotoshopEditing.FileFormat,
              },
            ],
          },
          {
            title: "Architecture & Interior Design",
            titleBn: "স্থপত্য এবং অভ্যন্তর ডিজাইন",
            list: [
              {
                title: "Service Type",
                data: ItOptions.Graphic.ArchitectureInteriorDesign.servicetype,
              },
              {
                title: "Project Scale",
                data: ItOptions.Graphic.ArchitectureInteriorDesign.ProjectScale,
              },
              {
                title: "Building Type",
                data: ItOptions.Graphic.ArchitectureInteriorDesign.BuildingType,
              },
              {
                title: "Image File Format",
                data: ItOptions.Graphic.ArchitectureInteriorDesign
                  .ImagefileFormat,
              },
            ],
          },
          {
            title: "Landscape Design",
            titleBn: "ল্যান্ডস্কেপ ডিজাইন",
            list: [
              {
                title: "Service Type",
                data: ItOptions.Graphic.LandscapeDesign.servicetype,
              },
              {
                title: "Software",
                data: ItOptions.Graphic.LandscapeDesign.Software,
              },
              {
                title: "File Format",
                data: ItOptions.Graphic.LandscapeDesign.FileFormat,
              },
            ],
          },
          {
            title: "Character Modeling",
            titleBn: "চরিত্র মডেলিং",
            list: [
              {
                title: "Purpose",
                data: ItOptions.Graphic.CharacterModeling.Purpose,
              },
              {
                title: "Style",
                data: ItOptions.Graphic.CharacterModeling.Style,
              },
              {
                title: "File Format",
                data: ItOptions.Graphic.CharacterModeling.FileFormat,
              },
            ],
          },
          {
            title: "Industrial product Design",
            titleBn: "শিল্প পণ্য ডিজাইন",
            list: [
              {
                title: "Service type",
                data: ItOptions.Graphic.IndustrialproductDesign.Servicetype,
              },
              {
                title: "Field Of expetise",
                data: ItOptions.Graphic.IndustrialproductDesign.FieldOfexpetise,
              },
              {
                title: "Design Software",
                data: ItOptions.Graphic.IndustrialproductDesign.DesignSoftware,
              },
              {
                title: "FileFormat",
                data: ItOptions.Graphic.IndustrialproductDesign.FileFormat,
              },
            ],
          },
          {
            title: "Booth Trade Design",
            titleBn: "বুথ ট্রেড ডিজাইন",
            list: [
              {
                title: "Booth Type",
                data: ItOptions.Graphic.TradeBoothTrade.BoothType,
              },
              {
                title: "Booth Layout",
                data: ItOptions.Graphic.TradeBoothTrade.BoothLayout,
              },
              {
                title: "Industry",
                data: ItOptions.Graphic.TradeBoothTrade.Industry,
              },
            ],
          },
          {
            title: "Fashion Design",
            titleBn: "ফ্যাশন ডিজাইন",
            list: [
              {
                title: "Service Type",
                data: ItOptions.Graphic.FashionDesign.ServiceType,
              },
              {
                title: "Item Type",
                data: ItOptions.Graphic.FashionDesign.ItemType,
              },
              {
                title: "Gender And Group",
                data: ItOptions.Graphic.FashionDesign.GenderAndGroup,
              },
              {
                title: "Illustration Purpose",
                data: ItOptions.Graphic.FashionDesign.IllustrationPurpose,
              },
              {
                title: "Design Expertise",
                data: ItOptions.Graphic.FashionDesign.DesignExpertise,
              },
              {
                title: "Tailoring Method",
                data: ItOptions.Graphic.FashionDesign.TailoringMethod,
              },
              {
                title: "File Format",
                data: ItOptions.Graphic.FashionDesign.FileFormat,
              },
            ],
          },
          {
            title: "Jewelry Design",
            titleBn: "জুয়েলারি ডিজাইন",
            list: [
              {
                title: "Service Type",
                data: ItOptions.Graphic.JewelryDesign.ServiceType,
              },
              {
                title: "Software",
                data: ItOptions.Graphic.JewelryDesign.Software,
              },
              {
                title: "Jewelry Type",
                data: ItOptions.Graphic.JewelryDesign.JewelryType,
              },
            ],
          },
          {
            title: "Presentation Design",
            titleBn: "প্রেজেন্টেশন ডিজাইন",
            list: [
              {
                title: "Service Type",
                data: ItOptions.Graphic.ResentationDesign.ServiceType,
              },
              {
                title: "Purpose",
                data: ItOptions.Graphic.ResentationDesign.Purpose,
              },
              {
                title: "Presentation Software",
                data: ItOptions.Graphic.ResentationDesign.PresentationSoftware,
              },
              {
                title: "Industry",
                data: ItOptions.Graphic.ResentationDesign.Industry,
              },
              {
                title: "Image File format",
                data: ItOptions.Graphic.ResentationDesign.ImageFileformat,
              },
            ],
          },
          {
            title: "Car Wraps",
            titleBn: "কার র‍্যাপ",
            list: [
              {
                title: "Vehicle Type",
                data: ItOptions.Graphic.CarWraps.VehicleType,
              },
              {
                title: "File format",
                data: ItOptions.Graphic.CarWraps.Fileformat,
              },
            ],
          },
          {
            title: "Tattoo Design",
            titleBn: "ট্যাটু ডিজাইন",
            list: [
              {
                title: "Tattoo Style",
                data: ItOptions.Graphic.TattooDesign.TattooStyle,
              },
              {
                title: "Color Type",
                data: ItOptions.Graphic.TattooDesign.ColorType,
              },
            ],
          },
          {
            title: "Brand Style Guide",
            titleBn: "ব্র্যান্ড স্টাইল গাইড",
            list: [
              {
                title: "Brand Style Guide",
                data: ItOptions.Graphic.BrandStyleGuide,
              },
            ],
          },
          {
            title: "Game Category",
            titleBn: "গেম বিভাগ",
            list: [
              {
                title: "Game Category",
                data: ItOptions.Graphic.GameCategory,
              },
            ],
          },
          {
            title: "Infographic",
            titleBn: "ইনফোগ্রাফিক",
            list: [
              {
                title: "Infographic",
                titleBn: "ইনফোগ্রাফিক",
                data: ItOptions.Graphic.Infographic,
              },
            ],
          },
          {
            title: "Logo Design",
            titleBn: "লোগো ডিজাইন",
            list: [
              {
                title: "Logo Design",
                titleBn: "লোগো ডিজাইন",
                data: ItOptions.Graphic.LogoDesign,
              },
            ],
          },
          {
            title: "Podcast Design",
            titleBn: "পডকাস্ট ডিজাইন",
            list: [
              {
                title: "Podcast Design",
                titleBn: "পডকাস্ট ডিজাইন",
                data: ItOptions.Graphic.PodcastDesign,
              },
            ],
          },
          {
            title: "Postcard Design",
            titleBn: "পোস্টকার্ড ডিজাইন",
            list: [
              {
                title: "Postcard Design",
                titleBn: "পোস্টকার্ড ডিজাইন",
                data: ItOptions.Graphic.PostcardDesign,
              },
            ],
          },
          {
            title: "Signage Design",
            titleBn: "সাইনেজ ডিজাইন",
            list: [
              {
                title: "Signage Design",
                titleBn: "সাইনেজ ডিজাইন",
                data: ItOptions.Graphic.SignageDesign,
              },
            ],
          },
          {
            title: "Story Boards",
            titleBn: "স্টোরি বোর্ড",
            list: [
              {
                title: "Story Boards",
                titleBn: "স্টোরি বোর্ড",
                data: ItOptions.Graphic.StoryBoards,
              },
            ],
          },
          {
            title: "T shirt",
            titleBn: "টি-শার্ট",
            list: [
              {
                title: "T shirt",
                titleBn: "টি-শার্ট",
                data: ItOptions.Graphic.Tshirt,
              },
            ],
          },
          {
            title: "Catalog Design",
            titleBn: "ক্যাটালগ ডিজাইন",
            list: [
              {
                title: "Catalog Design",
                titleBn: "ক্যাটালগ ডিজাইন",
                data: ItOptions.Graphic.CatalogDesign,
              },
            ],
          },
        ],
      },
      {
        title: "Digital Marketing",
        titleBn: "ডিজিটাল মার্কেটিং",
        image: it,
        data: [
          {
            title: "Social Media Marketing",
            titleBn: "সোশ্যাল মিডিয়া মার্কেটিং",
            list: [
              {
                title: "Service Type",
                data: ItOptions.DigitalMarketing.SocialMediaMarketing
                  .ServiceType,
              },
              {
                title: "Platform Type",
                data: ItOptions.DigitalMarketing.SocialMediaMarketing
                  .PlatformType,
              },
              {
                title: "Content Type",
                data: ItOptions.DigitalMarketing.SocialMediaMarketing
                  .ContentType,
              },
              {
                title: "Management Tools",
                data: ItOptions.DigitalMarketing.SocialMediaMarketing
                  .ManagementTools,
              },
            ],
          },
          {
            title: "Podcast Marketing",
            titleBn: "পডকাস্ট মার্কেটিং",
            list: [
              {
                title: "Service Type",
                data: ItOptions.DigitalMarketing.PodcastMarketing.ServiceType,
              },
              {
                title: "Podcast Category",
                data: ItOptions.DigitalMarketing.PodcastMarketing
                  .PodcastCategory,
              },
              {
                title: "Podcast Aggregator",
                data: ItOptions.DigitalMarketing.PodcastMarketing
                  .PodcastAggregator,
              },
            ],
          },
          {
            title: "Social Media Advertising",
            titleBn: "সোশ্যাল মিডিয়া বিজ্ঞাপন",
            list: [
              {
                title: "Service Type",
                data: ItOptions.DigitalMarketing.SOCIALMEDIAADVERTISING
                  .ServiceType,
              },
              {
                title: "Platform Type",
                data: ItOptions.DigitalMarketing.SOCIALMEDIAADVERTISING
                  .PlatformType,
              },
            ],
          },
          {
            title: "Seo",
            titleBn: "এসইও",
            list: [
              {
                title: "Service Type",
                data: ItOptions.DigitalMarketing.Seo.ServiceType,
              },
              {
                title: "Industry Expertise",
                data: ItOptions.DigitalMarketing.Seo.IndustryExpertise,
              },
            ],
          },
          {
            title: "Email Marketing",
            titleBn: "ইমেল মার্কেটিং",
            list: [
              {
                title: "Service Type",
                data: ItOptions.DigitalMarketing.EmailMarketing.ServiceType,
              },
              {
                title: "Email Platform",
                data: ItOptions.DigitalMarketing.EmailMarketing.EmailPlatform,
              },
              {
                title: "Method",
                data: ItOptions.DigitalMarketing.EmailMarketing.Method,
              },
              {
                title: "Tools",
                data: ItOptions.DigitalMarketing.EmailMarketing.Tools,
              },
            ],
          },
          {
            title: "Text Message Marketing",
            titleBn: "টেক্সট মেসেজ মার্কেটিং",
            list: [
              {
                title: "Platform",
                data: ItOptions.DigitalMarketing.TextMessageMarketing.Platform,
              },
              {
                title: "Messaging Type",
                data: ItOptions.DigitalMarketing.TextMessageMarketing
                  .MessagingType,
              },
            ],
          },
          {
            title: "Sem",
            titleBn: "সেম",
            list: [
              {
                title: "Service Type",
                data: ItOptions.DigitalMarketing.Sem.ServiceType,
              },
              {
                title: "Industry",
                data: ItOptions.DigitalMarketing.Sem.Industry,
              },
              {
                title: "Method",
                data: ItOptions.DigitalMarketing.Sem.Method,
              },
              {
                title: "Tools",
                data: ItOptions.DigitalMarketing.Sem.Tools,
              },
            ],
          },
          {
            title: "Crowdfunding",
            titleBn: "ক্রাউডফান্ডিং",
            list: [
              {
                title: "Service Type",
                data: ItOptions.DigitalMarketing.Crowdfunding.ServiceType,
              },
              {
                title: "Platform Type",
                data: ItOptions.DigitalMarketing.Crowdfunding.PlatformType,
              },
            ],
          },
          {
            title: "Display Advertising",
            titleBn: "ডিসপ্লে বিজ্ঞাপন",
            list: [
              {
                title: "Service Type",
                data: ItOptions.DigitalMarketing.DisplayAdvertising.ServiceType,
              },
              {
                title: "Add Network",
                data: ItOptions.DigitalMarketing.DisplayAdvertising.AdNetwork,
              },
              {
                title: "Placement",
                data: ItOptions.DigitalMarketing.DisplayAdvertising.Placement,
              },
              {
                title: "Add Format",
                data: ItOptions.DigitalMarketing.DisplayAdvertising.AdFormat,
              },
              {
                title: "Industry",
                data: ItOptions.DigitalMarketing.DisplayAdvertising.Industry,
              },
            ],
          },
          {
            title: "Surveys",
            titleBn: "জরিপ",
            list: [
              {
                title: "Service Type",
                data: ItOptions.DigitalMarketing.Surveys.ServiceType,
              },
              {
                title: "Survey Platform",
                data: ItOptions.DigitalMarketing.Surveys.SurveyPlatform,
              },
              {
                title: "Survey Type",
                data: ItOptions.DigitalMarketing.Surveys.SurveyType,
              },
            ],
          },
          {
            title: "Marketing Strategy",
            titleBn: "মার্কেটিং কৌশল",
            list: [
              {
                title: "Consulting",
                data: ItOptions.DigitalMarketing.MarketingStrategy.Consulting,
              },
              {
                title: "Strategy Purpose",
                data: ItOptions.DigitalMarketing.MarketingStrategy
                  .StrategyPurpose,
              },
              {
                title: "Business stage",
                data: ItOptions.DigitalMarketing.MarketingStrategy
                  .Businessstage,
              },
              {
                title: "Business Type",
                data: ItOptions.DigitalMarketing.MarketingStrategy.BusinessType,
              },
            ],
          },
          {
            title: "E-Commerce Marketing",
            titleBn: "ই-কমার্স মার্কেটিং",
            list: [
              {
                title: "Service Type",
                data: ItOptions.DigitalMarketing.ECommerceMarketing.ServiceType,
              },
              {
                title: "Platform Type",
                data: ItOptions.DigitalMarketing.ECommerceMarketing
                  .PlatformType,
              },
              {
                title: "Industry",
                data: ItOptions.DigitalMarketing.ECommerceMarketing.Industry,
              },
              {
                title: "Promotion Method",
                data: ItOptions.DigitalMarketing.ECommerceMarketing
                  .PromotionMethod,
              },
            ],
          },
          {
            title: "Influencer Marketing",
            titleBn: "ইনফ্লুয়েন্সার মার্কেটিং",
            list: [
              {
                title: "Strategy Research",
                data: ItOptions.DigitalMarketing.InfluencerMarketing
                  .StrategyResearch,
              },
              {
                title: "Target Audience",
                data: ItOptions.DigitalMarketing.InfluencerMarketing
                  .TargetAudience,
              },
              {
                title: "Platform Type",
                data: ItOptions.DigitalMarketing.InfluencerMarketing
                  .PlatformType,
              },
            ],
          },
          {
            title: "Community Management",
            titleBn: "কমিউনিটি ম্যানেজমেন্ট",
            list: [
              {
                title: "Service Type",
                data: ItOptions.DigitalMarketing.CommunityManagement
                  .ServiceType,
              },
              {
                title: "Industry",
                data: ItOptions.DigitalMarketing.CommunityManagement.Industry,
              },
              {
                title: "Community Presence",
                data: ItOptions.DigitalMarketing.CommunityManagement
                  .CommunityPresence,
              },
            ],
          },
          {
            title: "Affilate Markting",
            titleBn: "অ্যাফিলিয়েট মার্কেটিং",
            list: [
              {
                title: "Service Type",
                data: ItOptions.DigitalMarketing.AffilateMarkting.ServiceType,
              },
              {
                title: "Affiliate Networks",
                data: ItOptions.DigitalMarketing.AffilateMarkting
                  .AffiliateNetworks,
              },
              {
                title: "Affiliate Networks/ Programs",
                data: ItOptions.DigitalMarketing.AffilateMarkting
                  .AffiliateNetworksPrograms,
              },
            ],
          },
          {
            title: "MobileApp Marketing",
            titleBn: "মোবাইল অ্যাপ মার্কেটিং",
            list: [
              {
                title: "Service Type",
                data: ItOptions.DigitalMarketing.MobileAppMarketing.ServiceType,
              },
              {
                title: "Application Store",
                data: ItOptions.DigitalMarketing.MobileAppMarketing
                  .ApplicationStore,
              },
              {
                title: "Industry",
                data: ItOptions.DigitalMarketing.MobileAppMarketing.Industry,
              },
            ],
          },
          {
            title: "Music Promotion",
            titleBn: "সঙ্গীত প্রচার",
            list: [
              {
                title: "Service Type",
                data: ItOptions.DigitalMarketing.MusicPromotion.ServiceType,
              },
              {
                title: "Music Platform",
                data: ItOptions.DigitalMarketing.MusicPromotion.MusicPlatform,
              },
              {
                title: "Musical Genre",
                data: ItOptions.DigitalMarketing.MusicPromotion.MusicalGenre,
              },
              {
                title: "Platform Type",
                data: ItOptions.DigitalMarketing.MusicPromotion.PlatformType,
              },
              {
                title: "Channel",
                data: ItOptions.DigitalMarketing.MusicPromotion.Channel,
              },
            ],
          },
          {
            title: "Domain Research",
            titleBn: "ডোমেইন গবেষণা",
            list: [
              {
                title: "Domain Research",
                data: ItOptions.DigitalMarketing.DomainResearch,
              },
            ],
          },
          {
            title: "Local Seo",
            titleBn: "লোকাল এসইও",
            list: [
              {
                title: "Local Seo",
                titleBn: "লোকাল এসইও",
                data: ItOptions.DigitalMarketing.LocalSeo,
              },
            ],
          },
          {
            title: "VideoMarketing",
            titleBn: "ভিডিও মার্কেটিং",
            list: [
              {
                title: "Video Marketing",
                titleBn: "ভিডিও মার্কেটিং",
                data: ItOptions.DigitalMarketing.VideoMarketing,
              },
            ],
          },
          {
            title: "WebAnalytics",
            titleBn: "ওয়েব এনালাইসিস",
            list: [
              {
                title: "Web Analytics",
                titleBn: "ওয়েব এনালাইসিস",
                data: ItOptions.DigitalMarketing.WebAnalytics,
              },
            ],
          },
        ],
      },
      {
        title: "Programing & Teach",
        titleBn: "প্রোগ্রামিং এবং টেক",
        image: it,
        data: [
          {
            title: "Website Builders Cms",
            titleBn: "ওয়েবসাইট বিল্ডার সিএমএস",
            list: [
              {
                title: "Service Type",
                data: ItOptions.ProgramingTeach.WebsiteBuildersCms.ServiceType,
              },
              {
                title: "Platform",
                data: ItOptions.ProgramingTeach.WebsiteBuildersCms.Platform,
              },
              {
                title: "Specialization",
                data: ItOptions.ProgramingTeach.WebsiteBuildersCms
                  .Specialization,
              },
              {
                title: "Supported Plugin Types",
                data: ItOptions.ProgramingTeach.WebsiteBuildersCms
                  .SupportedPluginTypes,
              },
            ],
          },
          {
            title: "Word press",
            titleBn: "ওয়ার্ডপ্রেস",
            list: [
              {
                title: "Service Type",
                data: ItOptions.ProgramingTeach.Wordpress.ServiceType,
              },
              {
                title: "Specialization",
                data: ItOptions.ProgramingTeach.Wordpress.Specialization,
              },
              {
                title: "Supported Plugin Types",
                data: ItOptions.ProgramingTeach.Wordpress.SupportedPluginTypes,
              },
              {
                title: "Integrating Plugins",
                data: ItOptions.ProgramingTeach.Wordpress.IntegratingPlugins,
              },
            ],
          },
          {
            title: "Game Development",
            titleBn: "গেম ডেভলপমেন্ট",
            list: [
              {
                title: "Service Type",
                data: ItOptions.ProgramingTeach.GameDevelopment.ServiceType,
              },
              {
                title: "Game Type",
                data: ItOptions.ProgramingTeach.GameDevelopment.GameType,
              },
              {
                title: "Platform Type",
                data: ItOptions.ProgramingTeach.GameDevelopment.PlatformType,
              },
              {
                title: "Genree",
                data: ItOptions.ProgramingTeach.GameDevelopment.Genree,
              },
              {
                title: "Plugins",
                data: ItOptions.ProgramingTeach.GameDevelopment.Plugins,
              },
              {
                title: "Customization Type",
                data: ItOptions.ProgramingTeach.GameDevelopment
                  .CustomizationType,
              },
              {
                title: "Game Name",
                data: ItOptions.ProgramingTeach.GameDevelopment.GameName,
              },
            ],
          },
          {
            title: "Development For Streamers",
            titleBn: "স্ট্রিমারদের জন্য ডেভলপমেন্ট",
            list: [
              {
                title: "Service Type",
                data: ItOptions.ProgramingTeach.DevelopmentForStreamers
                  .ServiceType,
              },
              {
                title: "Software",
                data: ItOptions.ProgramingTeach.DevelopmentForStreamers
                  .Software,
              },
              {
                title: "Platform",
                data: ItOptions.ProgramingTeach.DevelopmentForStreamers
                  .Platform,
              },
              {
                title: "Purpose",
                data: ItOptions.ProgramingTeach.DevelopmentForStreamers.Purpose,
              },
            ],
          },
          {
            title: "Online Coding Lessons",
            titleBn: "অনলাইন কোডিং লেসন",
            list: [
              {
                title: "Lesson Purpose",
                data: ItOptions.ProgramingTeach.OnlineCodingLessons
                  .LessonPurpose,
              },
              {
                title: "Development Techonlogy",
                data: ItOptions.ProgramingTeach.OnlineCodingLessons
                  .DevelopmentTechonlogy,
              },
            ],
          },
          {
            title: "Support It",
            titleBn: "সাপোর্ট আইটি",
            list: [
              {
                title: "Device",
                data: ItOptions.ProgramingTeach.SupportIt.Device,
              },
              {
                title: "Operating System",
                data: ItOptions.ProgramingTeach.SupportIt.OperatingSystem,
              },
              {
                title: "Also Delivering",
                data: ItOptions.ProgramingTeach.SupportIt.AlsoDelivering,
              },
            ],
          },
          {
            title: "Chatbots",
            titleBn: "চ্যাটবট",
            list: [
              {
                title: "Messaging Platform",
                data: ItOptions.ProgramingTeach.Chatbots.MessagingPlatform,
              },
              {
                title: "Bot Type",
                data: ItOptions.ProgramingTeach.Chatbots.BotType,
              },
              {
                title: "Development Technology",
                data: ItOptions.ProgramingTeach.Chatbots.DevelopmentTechnology,
              },
            ],
          },
          {
            title: "Data Analysis Reports",
            titleBn: "ডেটা বিশ্লেষণ রিপোর্ট",
            list: [
              {
                title: "Service Type",
                data: ItOptions.ProgramingTeach.DataAnalysisReports.ServiceType,
              },
              {
                title: "Tool",
                data: ItOptions.ProgramingTeach.DataAnalysisReports.Tool,
              },
            ],
          },
          {
            title: "Convert Files",
            titleBn: "ফাইল কনভার্ট",
            list: [
              {
                title: "Service Type",
                data: ItOptions.ProgramingTeach.ConvertFiles.ServiceType,
              },
              {
                title: "Convert From",
                data: ItOptions.ProgramingTeach.ConvertFiles.ConvertFrom,
              },
              {
                title: "Convert To",
                data: ItOptions.ProgramingTeach.ConvertFiles.ConvertTo,
              },
            ],
          },
          {
            title: "Data bases",
            titleBn: "ডাটাবেস",
            list: [
              {
                title: "Service Type",
                data: ItOptions.ProgramingTeach.Databases.ServiceType,
              },
              {
                title: "Databases Type",
                data: ItOptions.ProgramingTeach.Databases.DatabasesType,
              },
            ],
          },
          {
            title: "Qa Review",
            titleBn: "কিউএ পর্যালোচনা",
            list: [
              {
                title: "Service Type",
                data: ItOptions.ProgramingTeach.QaReview.ServiceType,
              },
              {
                title: "Development Technology",
                data: ItOptions.ProgramingTeach.QaReview.DevelopmentTechnology,
              },
              {
                title: "Testing Application",
                data: ItOptions.ProgramingTeach.QaReview.TestingApplication,
              },
              {
                title: "Device",
                data: ItOptions.ProgramingTeach.QaReview.Device,
              },
              {
                title: "Expertise",
                data: ItOptions.ProgramingTeach.QaReview.Expertise,
              },
            ],
          },
          {
            title: "User Testing",
            titleBn: "ব্যবহারকারী পরীক্ষা",
            list: [
              {
                title: "Testing Platform",
                data: ItOptions.ProgramingTeach.UserTesting.TestingPlatform,
              },
              {
                title: "Testing Application",
                data: ItOptions.ProgramingTeach.UserTesting.Device,
              },
            ],
          },
          {
            title: "Web Programming",
            titleBn: "ওয়েব প্রোগ্রামিং",
            list: [
              {
                title: "Service Type",
                data: ItOptions.ProgramingTeach.WebProgramming.ServiceType,
              },
              {
                title: "Programming Language",
                data: ItOptions.ProgramingTeach.WebProgramming
                  .ProgrammingLanguage,
              },
              {
                title: "Expertise",
                data: ItOptions.ProgramingTeach.WebProgramming.Expertise,
              },
            ],
          },
          {
            title: "Desktop Applications",
            titleBn: "ডেস্কটপ অ্যাপ্লিকেশন",
            list: [
              {
                title: "Service Type",
                data: ItOptions.ProgramingTeach.DesktopApplications.ServiceType,
              },
              {
                title: "Programming Language",
                data: ItOptions.ProgramingTeach.DesktopApplications
                  .ProgrammingLanguage,
              },
              {
                title: "Operating System",
                data: ItOptions.ProgramingTeach.DesktopApplications
                  .OperatingSystem,
              },
              {
                title: "Expertise",
                data: ItOptions.ProgramingTeach.DesktopApplications.Expertise,
              },
              {
                title: "Application",
                data: ItOptions.ProgramingTeach.DesktopApplications.Application,
              },
            ],
          },
          {
            title: "E-Commerce Development",
            titleBn: "ই-কমার্স ডেভলপমেন্ট",
            list: [
              {
                title: "Service Type",
                data: ItOptions.ProgramingTeach.ECommerceDevelopment
                  .ServiceType,
              },
              {
                title: "Platform",
                data: ItOptions.ProgramingTeach.ECommerceDevelopment.Platform,
              },
              {
                title: "Supported Plugin Types",
                data: ItOptions.ProgramingTeach.ECommerceDevelopment
                  .SupportedPluginTypes,
              },
            ],
          },
          {
            title: "Mobile Apps",
            titleBn: "মোবাইল অ্যাপ্লিকেশন",
            list: [
              {
                title: "Service Type",
                data: ItOptions.ProgramingTeach.MobileApps.ServiceType,
              },
              {
                title: "Platform",
                data: ItOptions.ProgramingTeach.MobileApps.Platform,
              },
              {
                title: "Development Technology",
                data: ItOptions.ProgramingTeach.MobileApps
                  .DevelopmentTechnology,
              },
              {
                title: "Purpose",
                data: ItOptions.ProgramingTeach.MobileApps.Purpose,
              },
              {
                title: "Expertise",
                data: ItOptions.ProgramingTeach.MobileApps.Expertise,
              },
            ],
          },
        ],
      },
      {
        title: "Video & Animation",
        titleBn: "ভিডিও এবং অ্যানিমেশন",
        image: it,
        data: [
          {
            title: "Whiteboard animated Explainers",
            titleBn: "হোয়াইটবোর্ড এনিমেটেড এক্সপ্লেনার",
            list: [
              {
                title: "Service Type",
                data: ItOptions.VideoAnimation.WhiteboardanimatedExplainers
                  .ServiceType,
              },
              {
                title: "Explanier Type",
                data: ItOptions.VideoAnimation.WhiteboardanimatedExplainers
                  .ExplanierType,
              },
              {
                title: "Purpose",
                data: ItOptions.VideoAnimation.WhiteboardanimatedExplainers
                  .Purpose,
              },
              {
                title: "Tool Expertise",
                data: ItOptions.VideoAnimation.WhiteboardanimatedExplainers
                  .ToolExpertise,
              },
              {
                title: "Software Expertise",
                data: ItOptions.VideoAnimation.WhiteboardanimatedExplainers
                  .SoftwareExpertise,
              },
            ],
          },
          {
            title: "Animated Gifs",
            titleBn: "এনিমেটেড জিফ",
            list: [
              {
                title: "Purpose",
                data: ItOptions.VideoAnimation.AnimatedGifs.Purpose,
              },
              {
                title: "File Format",
                data: ItOptions.VideoAnimation.AnimatedGifs.FileFormat,
              },
            ],
          },
          {
            title: "Intros Outros",
            titleBn: "ইন্ট্রো আউট্রো",
            list: [
              {
                title: "Intro/Outro Type",
                data: ItOptions.VideoAnimation.IntrosOutros.IntroOutroType,
              },
              {
                title: "Video File Format",
                data: ItOptions.VideoAnimation.IntrosOutros.VideoFileFormat,
              },
            ],
          },
          {
            title: "Short Video Ads",
            titleBn: "সংক্ষিপ্ত ভিডিও বিজ্ঞাপন",
            list: [
              {
                title: "Platform",
                data: ItOptions.VideoAnimation.ShortVideoAds.Platform,
              },
              {
                title: "Video Type",
                data: ItOptions.VideoAnimation.ShortVideoAds.VideoType,
              },
            ],
          },
          {
            title: "Character Animation",
            titleBn: "চরিত্র অ্যানিমেশন",
            list: [
              {
                title: "Animation Type",
                data: ItOptions.VideoAnimation.CharacterAnimation.AnimationType,
              },
              {
                title: "Industry",
                data: ItOptions.VideoAnimation.CharacterAnimation.Industry,
              },
            ],
          },
          {
            title: "3D Product Animation",
            titleBn: "3D পণ্য অ্যানিমেশন",
            list: [
              {
                title: "Industry",
                data: ItOptions.VideoAnimation.dProductAnimation.Industry,
              },
              {
                title: "Environment",
                data: ItOptions.VideoAnimation.dProductAnimation.Environment,
              },
              {
                title: "file format",
                data: ItOptions.VideoAnimation.dProductAnimation.fileformat,
              },
            ],
          },
          {
            title: "Lyric & Music Videos",
            titleBn: "গানের লিরিক এবং মিউজিক ভিডিও",
            list: [
              {
                title: "Service Type",
                data: ItOptions.VideoAnimation.LyricMusicVideos.ServiceType,
              },
              {
                title: "Video Type",
                data: ItOptions.VideoAnimation.LyricMusicVideos.VideoType,
              },
            ],
          },
          {
            title: "Animation For Kids",
            titleBn: "শিশুদের জন্য অ্যানিমেশন",
            list: [
              {
                title: "Animation Style",
                data: ItOptions.VideoAnimation.AnimationForKids.AnimationStyle,
              },
              {
                title: "Video Type",
                data: ItOptions.VideoAnimation.AnimationForKids.VideoType,
              },
            ],
          },
          {
            title: "Animation For Streamers",
            titleBn: "স্ট্রিমারদের জন্য অ্যানিমেশন",
            list: [
              {
                title: "Column1",
                data: ItOptions.VideoAnimation.AnimationForStreamers.Column1,
              },
              {
                title: "Asset Type",
                data: ItOptions.VideoAnimation.AnimationForStreamers.AssetType,
              },
            ],
          },
          {
            title: "Live Action Explainers",
            titleBn: "লাইভ অ্যাকশন এক্সপ্লেনার",
            list: [
              {
                title: "Setting",
                data: ItOptions.VideoAnimation.LiveActionExplainers.Setting,
              },
              {
                title: "Video File format",
                data: ItOptions.VideoAnimation.LiveActionExplainers
                  .VideoFileformat,
              },
            ],
          },
          {
            title: "Unboxing Videos",
            titleBn: "আনবক্সিং ভিডিও",
            list: [
              {
                title: "vedio type",
                data: ItOptions.VideoAnimation.UnboxingVideos.vediotype,
              },
              {
                title: "product Type",
                data: ItOptions.VideoAnimation.UnboxingVideos.productType,
              },
            ],
          },
          {
            title: "Drone Video graphy",
            titleBn: "ড্রোন ভিডিওগ্রাফি",
            list: [
              {
                title: "Media type",
                data: ItOptions.VideoAnimation.DroneVideography.Mediatype,
              },
              {
                title: "Themes",
                data: ItOptions.VideoAnimation.DroneVideography.Themes,
              },
              {
                title: "Drone Type",
                data: ItOptions.VideoAnimation.DroneVideography.DroneType,
              },
            ],
          },
          {
            title: "product Photography",
            titleBn: "পণ্য ফটোগ্রাফি",
            list: [
              {
                title: "file Format",
                data: ItOptions.VideoAnimation.productPhotography.fileFormat,
              },
              {
                title: "Photo Setting",
                data: ItOptions.VideoAnimation.productPhotography.PhotoSetting,
              },
              {
                title: "ProductType",
                data: ItOptions.VideoAnimation.productPhotography.ProductType,
              },
            ],
          },
          {
            title: "App Website Previews",
            titleBn: "অ্যাপ ওয়েবসাইট প্রিভিউ",
            list: [
              {
                title: "App Website Previews",
                titleBn: "অ্যাপ ওয়েবসাইট প্রিভিউ",
                data: ItOptions.VideoAnimation.AppWebsitePreviews,
              },
            ],
          },
          {
            title: "E-learing Video Production",
            titleBn: "ই-লার্নিং ভিডিও প্রোডাকশন",
            list: [
              {
                title: "E-learing Video Production",
                titleBn: "ই-লার্নিং ভিডিও প্রোডাকশন",
                data: ItOptions.VideoAnimation.ElearingVideoProduction,
              },
            ],
          },
          {
            title: "Lottie Website Animation",
            titleBn: "লটি ওয়েবসাইট অ্যানিমেশন",
            list: [
              {
                title: "Lottie Website Animation",
                titleBn: "লটি ওয়েবসাইট অ্যানিমেশন",
                data: ItOptions.VideoAnimation.LottieWebsiteAnimation,
              },
            ],
          },
          {
            title: "Screen casting Videos",
            titleBn: "স্ক্রিনকাস্টিং ভিডিও",
            list: [
              {
                title: "Screen casting Videos",
                titleBn: "স্ক্রিনকাস্টিং ভিডিও",
                data: ItOptions.VideoAnimation.ScreencastingVideos,
              },
            ],
          },
          {
            title: "Slide Show Videos",
            titleBn: "স্লাইড শো ভিডিও",
            list: [
              {
                title: "Slide Show Videos",
                titleBn: "স্লাইড শো ভিডিও",
                data: ItOptions.VideoAnimation.SlideShowVideos,
              },
            ],
          },
          {
            title: "Sub title Captions",
            titleBn: "সাবটাইটেল ক্যাপশন",
            list: [
              {
                title: "Sub title Captions",
                titleBn: "সাবটাইটেল ক্যাপশন",
                data: ItOptions.VideoAnimation.SubtitleCaptions,
              },
            ],
          },
          {
            title: "Video Editing",
            titleBn: "ভিডিও সম্পাদনা",
            list: [
              {
                title: "Video Editing",
                titleBn: "ভিডিও সম্পাদনা",
                data: ItOptions.VideoAnimation.VideoEditing,
              },
            ],
          },
          {
            title: "Visual Effect",
            titleBn: "ভিজুয়াল ইফেক্ট",
            list: [
              {
                title: "Visual Effect",
                titleBn: "ভিজুয়াল ইফেক্ট",
                data: ItOptions.VideoAnimation.VisualEffect,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Lawyer Service",
    titleBn: "আইনজীবী সেবা",
    icon: lawyer,
    color: "#FF4155",
    image: head,
    picture: law,
    key: "LAWYER",
    data: [
      {
        title: "Bankruptcy Lawyers",
        titleBn: "দেউলিয়া আইনজীবী",
        list: [
          {
            title: "Bankruptcy Lawyers",
            titleBn: "দেউলিয়া আইনজীবী",
            data: LawyerOptions.Bankruptcy,
          },
        ],
      },
      {
        title: "Business Lawyers",
        titleBn: "ব্যবসায়িক আইনজীবী",
        list: [
          {
            title: "Business Lawyers",
            titleBn: "ব্যবসায়িক আইনজীবী",
            data: LawyerOptions.Business,
          },
        ],
      },
      {
        title: "Civil Lawyers Service",
        titleBn: "নাগরিক আইনজীবী সেবা",
        list: [
          {
            title: "Civil Lawyers",
            titleBn: "নাগরিক আইনজীবী সেবা",
            data: LawyerOptions.Civil,
          },
        ],
      },
      {
        title: "Constitutional Lawyers",
        titleBn: "সংবিধানিক আইনজীবী",
        list: [
          {
            title: "Constitutional Lawyers",
            titleBn: "সংবিধানিক আইনজীবী",
            data: LawyerOptions.Constitutional,
          },
        ],
      },
      {
        title: "Criminal Defense Lawyers",
        titleBn: "অপরাধ প্রতিরক্ষা আইনজীবী",
        list: [
          {
            title: "Criminal Defense Lawyers",
            titleBn: "অপরাধ প্রতিরক্ষা আইনজীবী",
            data: LawyerOptions.Criminal,
          },
        ],
      },
      {
        title: "Environmental Lawyers",
        titleBn: "পরিবেশ আইনজীবী",
        list: [
          {
            title: "Environmental Lawyers",
            titleBn: "পরিবেশ আইনজীবী",
            data: LawyerOptions.Environmental,
          },
        ],
      },
      {
        title: "Estate Planning Lawyers",
        titleBn: "সম্পত্তি পরিকল্পনা আইনজীবী",
        list: [
          {
            title: "Estate Lawyers",
            titleBn: "উত্থান/এস্টেট আইনজীবী",
            data: LawyerOptions.Estate,
          },
        ],
      },
      {
        title: "Family Lawyers",
        titleBn: "পরিবার আইনজীবী",
        list: [
          {
            title: "Family Lawyers",
            titleBn: "পরিবার আইনজীবী",
            data: LawyerOptions.Family,
          },
        ],
      },
      {
        title: "Immigration Lawyers",
        titleBn: "ইমিগ্রেশন আইনজীবী",
        list: [
          {
            title: "Immigration Lawyers",
            titleBn: "ইমিগ্রেশন আইনজীবী",
            data: LawyerOptions.Immigration,
          },
        ],
      },
      {
        title: "Intellectual Property Lawyers",
        titleBn: "বুদ্ধিমত্তা সম্পত্তি আইনজীবী",
        list: [
          {
            title: "Intellectual Lawyers",
            titleBn: "বুদ্ধিমত্তা আইনজীবী",
            data: LawyerOptions.Intellectual,
          },
        ],
      },
      {
        title: "Labor Lawyers",
        titleBn: "শ্রম আইনজীবী",
        list: [
          {
            title: "Labor Lawyers",
            titleBn: "শ্রম আইনজীবী",
            data: LawyerOptions.Labor,
          },
        ],
      },
      {
        title: "Medical Malpractice Lawyers",
        titleBn: "চিকিৎসা দোষ আইনজীবী",
        list: [
          {
            title: "Medical Malpractice Lawyers",
            titleBn: "চিকিৎসা দোষ আইনজীবী",
            data: LawyerOptions.Medical,
          },
        ],
      },
      {
        title: "Personal Injury Lawyers",
        titleBn: "ব্যক্তিগত আঘাতের আইনজীবী",
        list: [
          {
            title: "Personal Injury Lawyers",
            titleBn: "ব্যক্তিগত আঘাতের আইনজীবী",
            data: LawyerOptions.Personal,
          },
        ],
      },
      {
        title: "Real State Lawyers",
        titleBn: "রিয়েল এস্টেট আইনজীবী",
        list: [
          {
            title: "Real State Lawyers",
            titleBn: "রিয়েল এস্টেট আইনজীবী",
            data: LawyerOptions.Real,
          },
        ],
      },
      {
        title: "Tax Lawyers",
        titleBn: "কর আইনজীবী",
        list: [
          {
            title: "Tax Lawyers",
            titleBn: "কর আইনজীবী",
            data: LawyerOptions.Tax,
          },
        ],
      },
    ],
  },
  {
    title: "Music & Audio Service",
    titleBn: "সঙ্গীত এবং অডিও সেবা",
    icon: MusicIcon,
    color: "#FEB944",
    image: musicaudio,
    picture: music,
    key: "MUSIC",
    data: [
      {
        title: "Producers & Composers",
        titleBn: "প্রযোজক এবং সুরকার",
        list: [
          {
            title: "Service Type",
            data: MusicAudioOptions.ProducersComposers.ServiceType,
          },
          {
            title: "Genre",
            data: MusicAudioOptions.ProducersComposers.Genre,
          },
          {
            title: "Purpose",
            data: MusicAudioOptions.ProducersComposers.Purpose,
          },
        ],
      },
      {
        title: "Session Musicians",
        titleBn: "সেশন মিউজিশিয়ানস",
        list: [
          {
            title: "Instrument",
            data: MusicAudioOptions.SessionMusicians.Instrument,
          },
          {
            title: "Genre",
            data: MusicAudioOptions.SessionMusicians.Genre,
          },
        ],
      },
      {
        title: "Singers Concert",
        titleBn: "গায়কের কনসার্ট",
        list: [
          {
            title: "Singer Type",
            data: MusicAudioOptions.SingersConcert.SingerType,
          },
          {
            title: "Service type",
            data: MusicAudioOptions.SingersConcert.Servicetype,
          },
        ],
      },
      {
        title: "Voice Over",
        titleBn: "ভয়েস ওভার",
        list: [
          {
            title: "Gender",
            data: MusicAudioOptions.VoiceOver.Gender,
          },
          {
            title: "Purpose",
            data: MusicAudioOptions.VoiceOver.Purpose,
          },
          {
            title: "Tone",
            data: MusicAudioOptions.VoiceOver.Tone,
          },
        ],
      },
      {
        title: "Beat Making",
        titleBn: "বিট তৈরি",
        list: [
          {
            title: "Service Type",
            data: MusicAudioOptions.BeatMaking.ServiceType,
          },
          {
            title: "Genre",
            data: MusicAudioOptions.BeatMaking.Genre,
          },
          {
            title: "Beat Type",
            data: MusicAudioOptions.BeatMaking.BeatType,
          },
          {
            title: "Beat Mood",
            data: MusicAudioOptions.BeatMaking.BeatMood,
          },
          {
            title: "Loops & Kits",
            data: MusicAudioOptions.BeatMaking.LoopsKits,
          },
        ],
      },
      {
        title: "Online Music Lessons",
        titleBn: "অনলাইন সঙ্গীত পাঠ",
        list: [
          {
            title: "Instrument",
            data: MusicAudioOptions.OnlineMusicLessons.Instrument,
          },
          {
            title: "Production/Software",
            data: MusicAudioOptions.OnlineMusicLessons.ProductionSoftware,
          },
        ],
      },
      {
        title: "Sound Design",
        titleBn: "সাউন্ড ডিজাইন",
        list: [
          {
            title: "Service Type",
            data: MusicAudioOptions.SoundDesign.ServiceType,
          },
          {
            title: "Purpose",
            data: MusicAudioOptions.SoundDesign.Purpose,
          },
          {
            title: "Mixing Type",
            data: MusicAudioOptions.SoundDesign.MixingType,
          },
          {
            title: "Effect Type",
            data: MusicAudioOptions.SoundDesign.EffectType,
          },
        ],
      },
      {
        title: "Music Transcription",
        titleBn: "মিউজিক ট্রান্সক্রিপশন",
        list: [
          {
            title: "Instruments",
            data: MusicAudioOptions.MusicTranscription.Instruments,
          },
          {
            title: "File Format",
            data: MusicAudioOptions.MusicTranscription.FileFormat,
          },
        ],
      },
      {
        title: "Singers & Vocalists",
        titleBn: "গায়ক এবং কণ্ঠশিল্পী",
        list: [
          {
            title: "Singers Type",
            data: MusicAudioOptions.SingersVocalists.SingersType,
          },
          {
            title: "Services Type",
            data: MusicAudioOptions.SingersVocalists.ServicesType,
          },
        ],
      },
      {
        title: "Jingles & Intros",
        titleBn: "জিংলস এবং ইন্ট্রোস",
        list: [
          {
            title: "Service Type",
            data: MusicAudioOptions.JinglesIntros.ServiceType,
          },
          {
            title: "Purpose",
            data: MusicAudioOptions.JinglesIntros.Purpose,
          },
          {
            title: "Style",
            data: MusicAudioOptions.JinglesIntros.Style,
          },
        ],
      },
      {
        title: "Dj Drops & Tags",
        titleBn: "ডিজে ড্রপস এবং ট্যাগস",
        list: [
          {
            title: "Genre",
            data: MusicAudioOptions.DjDropsTags.Genre,
          },
          {
            title: "Tone",
            data: MusicAudioOptions.DjDropsTags.Tone,
          },
        ],
      },
      {
        title: "Remixing & Mashups",
        titleBn: "রিমিক্সিং এবং ম্যাশআপস",
        list: [
          {
            title: "Service Type",
            data: MusicAudioOptions.RemixingMashups.ServiceType,
          },
          {
            title: "Gener",
            data: MusicAudioOptions.RemixingMashups.Gener,
          },
        ],
      },
      {
        title: "Synth Presets",
        titleBn: "সিন্থ প্রিসেট",
        list: [
          {
            title: "Gener",
            data: MusicAudioOptions.SynthPresets.Gener,
          },
          {
            title: "Synthesizer Type",
            data: MusicAudioOptions.SynthPresets.SynthesizerType,
          },
          {
            title: "Vst Synthesizer Type",
            data: MusicAudioOptions.SynthPresets.VstSynthesizerType,
          },
        ],
      },
      {
        title: "Music Instrument Teaching",
        titleBn: "সঙ্গীত যন্ত্র শেখানো",
        list: [
          {
            title: "Music Instrument Teaching",
            titleBn: "সঙ্গীত যন্ত্র শেখানো",
            data: MusicAudioOptions.MusicInstrumentTeaching,
          },
        ],
      },
      {
        title: "Teaching Song",
        titleBn: "গান শেখানো",
        list: [
          {
            title: "TeachingSong",
            titleBn: "গান শেখানো",
            data: MusicAudioOptions.TeachingSong,
          },
        ],
      },
      {
        title: "Mixing & Mastering",
        titleBn: "মিক্সিং এবং মাস্টারিং",
        list: [
          {
            title: "Mixing Mastering",
            titleBn: "মিক্সিং এবং মাস্টারিং",
            data: MusicAudioOptions.MixingMastering,
          },
        ],
      },
      {
        title: "Song writers",
        titleBn: "গান লেখক",
        list: [
          {
            title: "Song writers",
            titleBn: "গান লেখক",
            data: MusicAudioOptions.Songwriters,
          },
        ],
      },
      {
        title: "Dj Mixing",
        titleBn: "ডিজে মিক্সিং",
        list: [
          {
            title: "Dj Mixing",
            titleBn: "ডিজে মিক্সিং",
            data: MusicAudioOptions.DjMixing,
          },
        ],
      },
      {
        title: "Dialogue Editing",
        title: "ডায়লগ এডিটিং",
        list: [
          {
            title: "Dialouge Editing",
            title: "ডায়লগ এডিটিং",
            data: MusicAudioOptions.DialougeEditing,
          },
        ],
      },
      {
        title: "Audio Ads Production",
        titleBn: "অডিও বিজ্ঞাপন প্রোডাকশন",
        list: [
          {
            title: "Audio Ads Production",
            titleBn: "অডিও বিজ্ঞাপন প্রোডাকশন",
            data: [],
          },
        ],
      },
      {
        title: "Audiobook Production",
        titleBn: "অডিওবুক প্রোডাকশন",
        list: [
          {
            title: "Audiobook Production",
            titleBn: "অডিওবুক প্রোডাকশন",
            data: [],
          },
        ],
      },
      {
        title: "Podcast Editing",
        titleBn: "পডকাস্ট সম্পাদন",
        list: [
          {
            title: "Podcast Editing",
            titleBn: "পডকাস্ট সম্পাদন",
            data: [],
          },
        ],
      },
      {
        title: "Vocal Tuning",
        titleBn: "ভোকাল টিউনিং",
        list: [
          {
            title: "Vocal Tuning",
            titleBn: "ভোকাল টিউনিং",
            data: [],
          },
        ],
      },
    ],
  },
  {
    title: "Painter",
    titleBn: "পেইন্টার",
    icon: PainterIcon,
    color: "#D934BF",
    image: entertainment,
    picture: ppt,
    key: "PAINTER",
    list: [
      {
        title: "Painter",
        titleBn: "পেইন্টার",
        data: MainPainter,
      },
    ],
  },
  {
    title: "Online Tution",
    titleBn: "অনলাইন টিউশন",
    icon: OnlineTutionIcon,
    color: "#FBB540",
    image: onlinetution,
    picture: tutor,
    key: "ONLINETUTION",
    data: [
      {
        title: "Language Tutoring",
        titleBn: "অনলাইন টিউশন",
        list: [
          {
            title: "Language Tutoring",
            titleBn: "ভাষা টিউটরিং",
            data: OnlineTutionOptions.LANGUAGETUTORING,
          },
        ],
      },
      {
        title: "Math Tutoring",
        titleBn: "গণিত টিউটরিং",
        list: [
          {
            title: "Math Tutoring",
            titleBn: "গণিত টিউটরিং",
            data: OnlineTutionOptions.MATHTUTORING,
          },
        ],
      },
      {
        title: "Online Music Lessons",
        titleBn: "অনলাইন সঙ্গীত পাঠ",
        list: [
          {
            title: "Instrument",
            data: OnlineTutionOptions.OnlineMusicLessons.Instrument,
          },
          {
            title: "Production/Software",
            data: OnlineTutionOptions.OnlineMusicLessons.Production_Software,
          },
        ],
      },
      {
        title: "Online Coding Lessons",
        titleBn: "অনলাইন কোডিং পাঠ",
        list: [
          {
            title: "Lesson Purpose",
            data: OnlineTutionOptions.OnlineCodingLessons.LessonPurpose,
          },
          {
            title: "Development Techonlogy",
            data: OnlineTutionOptions.OnlineCodingLessons.DevelopmentTechonlogy,
          },
        ],
      },
      {
        title: "Science Tutoring",
        titleBn: "বিজ্ঞান টিউটরিং",
        list: [
          {
            title: "Science Tutoring",
            titleBn: "বিজ্ঞান টিউটরিং",
            data: OnlineTutionOptions.SCIENCETUTORING,
          },
        ],
      },
      {
        title: "Social Science Tutoring",
        titleBn: "সামাজিক বিজ্ঞান টিউটরিং",
        list: [
          {
            title: "Social Science Tutoring",
            titleBn: "সামাজিক বিজ্ঞান টিউটরিং",
            data: OnlineTutionOptions.SOCIALSCIENCESTUTORING,
          },
        ],
      },
      {
        title: "Business Tutoring",
        titleBn: "ব্যবসা টিউটরিং",
        list: [
          {
            title: "Business Tutoring",
            titleBn: "ব্যবসা টিউটরিং",
            data: OnlineTutionOptions.BUSINESSTUTORING,
          },
        ],
      },
      {
        title: "Cooking Lessons",
        titleBn: "রান্না পাঠ",
        list: [
          {
            title: "Cooking Lessons",
            titleBn: "রান্না পাঠ",
            data: OnlineTutionOptions.CookingLessons,
          },
        ],
      },
      // {
      //   title: "Mobile",
      //   list: [
      //     {
      //       title: "Mobile",
      //       data: OnlineTutionOptions.Mobile,
      //     },
      //   ],
      // },
      // {
      //   title: "Pc",
      //   list: [
      //     {
      //       title: "Pc",
      //       data: OnlineTutionOptions.Pc,
      //     },
      //   ],
      // },
      // {
      //   title: "Printer",
      //   list: [
      //     {
      //       title: "Printer",
      //       data: OnlineTutionOptions.Printer,
      //     },
      //   ],
      // },
    ],
  },
  {
    title: "Parlour & Saloon",
    titleBn: "পার্লার এবং সেলুন",
    icon: SaloonIcon,
    color: "#FF5364",
    image: parlour,
    picture: salon,
    key: "PARLOUR",
    data: [
      {
        title: "Man",
        titleBn: "পুরুষ",
        image: parlour,
        data: [
          {
            title: "Hair Shaping & Styling",
            titleBn: "চুল আকার ও স্টাইলিং",
            list: [
              {
                title: "Hair Shaping & Styling",
                titleBn: "চুল আকার ও স্টাইলিং",
                data: ParlorOptions.Man.Hair,
              },
            ],
          },
          {
            title: "Color/Texturizing",
            titleBn: "কালার / টেক্সচারাইজিং",
            list: [
              {
                title: "Color/Texturizing",
                titleBn: "কালার / টেক্সচারাইজিং",
                data: ParlorOptions.Man.Color,
              },
            ],
          },
          {
            title: "Waxing Service",
            titleBn: "ওয়াক্সিং সেবা",
            list: [
              {
                title: "Waxing Service",
                titleBn: "ওয়াক্সিং সেবা",
                data: ParlorOptions.Man.Waxing,
              },
            ],
          },
          {
            title: "Nails",
            titleBn: "নখ",
            list: [
              {
                title: "Nails",
                titleBn: "নখ",
                data: ParlorOptions.Man.Nails,
              },
            ],
          },
          {
            title: "Facial",
            titleBn: "ফেসিয়াল",
            list: [
              {
                title: "Facial",
                titleBn: "ফেসিয়াল",
                data: ParlorOptions.Man.Facial,
              },
            ],
          },
          {
            title: "Extra",
            titleBn: "অতিরিক্ত",
            list: [
              {
                title: "Extra",
                titleBn: "অতিরিক্ত",
                data: ParlorOptions.Man.Extra,
              },
            ],
          },
        ],
      },
      {
        title: "Woman",
        titleBn: "মহিলা",
        image: parlour,
        data: [
          {
            title: "Facial Treatment",
            titleBn: "ফেসিয়াল চিকিৎসা",
            list: [
              {
                title: "Facial Treatment",
                titleBn: "ফেসিয়াল চিকিৎসা",
                data: ParlorOptions.Woman.Facial,
              },
            ],
          },
          {
            title: "Manicure",
            titleBn: "ম্যানিকিউর",
            list: [
              {
                title: "Manicure",
                titleBn: "ম্যানিকিউর",
                data: ParlorOptions.Woman.Manicure,
              },
            ],
          },
          {
            title: "Padicure",
            titleBn: "পেডিকিউর",
            list: [
              {
                title: "Padicure",
                titleBn: "পেডিকিউর",
                data: ParlorOptions.Woman.Padicure,
              },
            ],
          },
          {
            title: "Hair Cut",
            titleBn: "চুল কাটা",
            list: [
              {
                title: "Hair Cut",
                titleBn: "চুল কাটা",
                data: ParlorOptions.Woman.Hair,
              },
            ],
          },
          {
            title: "Hair Color",
            titleBn: "চুল রং",
            list: [
              {
                title: "Hair Color",
                titleBn: "চুল রং",
                data: ParlorOptions.Woman.HairColor,
              },
            ],
          },
          {
            title: "Hair Straightener",
            titleBn: "চুল সোজা করার",
            list: [
              {
                title: "Hair Straightener",
                titleBn: "চুল সোজা করার",
                data: ParlorOptions.Woman.HairStraightener,
              },
            ],
          },
          {
            title: "Hair Spa",
            titleBn: "চুল স্পা",
            list: [
              {
                title: "Hair Spa",
                titleBn: "চুল স্পা",
                data: ParlorOptions.Woman.HairSpa,
              },
            ],
          },
          {
            title: "Head Massage & Body Polishing",
            titleBn: "মাথা মাসাজ এবং বডি পলিশিং",
            list: [
              {
                title: "Head Massage & Body Polishing",
                titleBn: "মাথা মাসাজ এবং বডি পলিশিং",
                data: ParlorOptions.Woman.Head,
              },
            ],
          },
          {
            title: "Skin Treatment",
            titleBn: "ত্বকের চিকিৎসা",
            list: [
              {
                title: "Skin Treatment",
                titleBn: "ত্বকের চিকিৎসা",
                data: ParlorOptions.Woman.Skin,
              },
            ],
          },
          {
            title: "Threading",
            titleBn: "থ্রেডিং",
            list: [
              {
                title: "Threading",
                titleBn: "থ্রেডিং",
                data: ParlorOptions.Woman.Threading,
              },
            ],
          },
          {
            title: "Bleach & Datan",
            titleBn: "ব্লিচ এবং ডিটান",
            list: [
              {
                title: "Bleach & Datan",
                titleBn: "ব্লিচ এবং ডিটান",
                data: ParlorOptions.Woman.Bleach,
              },
            ],
          },
          {
            title: "Cleanup",
            titleBn: "ক্লিনআপ",
            list: [
              {
                title: "Cleanup",
                titleBn: "ক্লিনআপ",
                data: ParlorOptions.Woman.Cleanup,
              },
            ],
          },
          {
            title: "Waxing",
            titleBn: "ওয়াক্সিং",
            list: [
              {
                title: "Waxing",
                titleBn: "ওয়াক্সিং",
                data: ParlorOptions.Woman.Waxing,
              },
            ],
          },
          {
            title: "Make Up",
            titleBn: "মেকআপ",
            list: [
              {
                title: "Make Up",
                titleBn: "মেকআপ",
                data: ParlorOptions.Woman.MakeUp,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: "Labor",
    titleBn: "শ্রমিক",
    icon: RentIcon,
    color: "#61AFF6",
    image: entertainment,
    picture: lb,
    key: "LABOR",
    list: [
      {
        title: "Labor",
        titleBn: "শ্রমিক",
        data: MainLabor,
      },
    ],
  },
  {
    title: "Life Style",
    titleBn: "জীবনযাপন",
    icon: lifeStyle,
    color: "#FF9C68",
    image: lifestyle,
    picture: life,
    key: "LIFESTYLE",
    data: [
      {
        title: "Cooking Lessons",
        titleBn: "রান্না পাঠ",
        list: [
          {
            title: "Breakfast",
            data: LifeStyleOptions.CookingLessons.breakfast,
          },
          {
            title: "Beverages",
            data: LifeStyleOptions.CookingLessons.Beverages,
          },
          {
            title: "Snacks",
            data: LifeStyleOptions.CookingLessons.Snacks,
          },
          {
            title: "Dinner & Lunch",
            data: LifeStyleOptions.CookingLessons.DinnerLunch,
          },
          {
            title: "Dessert",
            data: LifeStyleOptions.CookingLessons.Dessert,
          },
          {
            title: "Soups",
            data: LifeStyleOptions.CookingLessons.Soups,
          },
          {
            title: "Sandwich",
            data: LifeStyleOptions.CookingLessons.Sandwich,
          },
          {
            title: "Pizzas",
            data: LifeStyleOptions.CookingLessons.Pizzas,
          },
          {
            title: "Pasta",
            data: LifeStyleOptions.CookingLessons.Pasta,
          },
          {
            title: "Events",
            data: LifeStyleOptions.CookingLessons.Events,
          },
        ],
      },
      {
        title: "Craft Lessons",
        titleBn: "ক্রাফট পাঠ",
        list: [
          {
            title: "Craft Type",
            titleBn: "ক্রাফট পাঠ",
            data: LifeStyleOptions.CraftLessons.CraftType,
          },
          {
            title: "Difficulty",
            data: LifeStyleOptions.CraftLessons.Difficulty,
          },
        ],
      },
      {
        title: "Gym",
        titleBn: "জিম",
        list: [
          {
            title: "Compound Chest Exercises",
            data: LifeStyleOptions.Gym.CompoundChestExercises,
          },
          {
            title: "Compound Back Exercises",
            data: LifeStyleOptions.Gym.CompoundBackExercises,
          },
          {
            title: "Compound Ab Exercises",
            data: LifeStyleOptions.Gym.CompoundAbExercises,
          },
          {
            title: "Compound Shoulder Exercises",
            data: LifeStyleOptions.Gym.CompoundShoulderExercises,
          },
          {
            title: "Compound Leg Exercises",
            data: LifeStyleOptions.Gym.CompoundLegExercises,
          },
          {
            title: "Compound Bicep Exercises",
            data: LifeStyleOptions.Gym.CompoundBicepExercises,
          },
          {
            title: "Compound Tricep Exercises",
            data: LifeStyleOptions.Gym.CompoundTricepExercises,
          },
        ],
      },
      {
        title: "Life Coaching",
        titleBn: "লাইফ কোচিং",
        list: [
          {
            title: "Life Coaching",
            titleBn: "লাইফ কোচিং",
            data: LifeStyleOptions.LifeCoaching,
          },
        ],
      },
      {
        title: "Personal Stylists",
        titleBn: "ব্যক্তিগত স্টাইলিস্ট",
        list: [
          {
            title: "Purpose",
            data: LifeStyleOptions.PersonalStylists.Purpose,
          },
        ],
      },
      {
        title: "Fitness Lessons",
        titleBn: "ফিটনেস পাঠ",
        list: [
          {
            title: "Trainning Type",
            data: LifeStyleOptions.FitnessLessons.TrainningType,
          },
          {
            title: "Difficulty",
            data: LifeStyleOptions.FitnessLessons.Difficulty,
          },
        ],
      },
    ],
  },
];
