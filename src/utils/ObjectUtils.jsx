import { AiOutlineTwitter, AiFillFacebook , 
  AiFillInstagram ,AiOutlineCopy  , AiOutlineWhatsApp} from "react-icons/ai";

const ServiceCardData = [
  {
    bgColor: "#29CC39",
    dropShadow: "0px 2px 5px rgba(38, 51, 77, 0.03)",
    title: "Agents",
    btnBgColor: "#13BF24",
    btnText: "View All",
    link: ""
  },
  {
    bgColor: "#8833FF",
    dropShadow: "0px 2px 5px rgba(38, 51, 77, 0.03)",
    title: "Offers",
    btnBgColor: "#7919FF",
    btnText: "View All",
    link: ""
  },
  {
    bgColor: "#FF6633",
    dropShadow: "0px 2px 5px rgba(38, 51, 77, 0.03)",
    title: "Hotels",
    btnBgColor: "#E64B17",
    btnText: "View All",
    link: ""
  },
  {
    bgColor: "#33BFFF",
    dropShadow: "0px 2px 5px rgba(38, 51, 77, 0.03)",
    title: "Users",
    btnBgColor: "#17A5E6",
    btnText: "View All",
    link: ""
  },
  {
    bgColor: "#1A2233",
    dropShadow: "0px 2px 5px rgba(38, 51, 77, 0.03)",
    title: "Car Rentals",
    btnBgColor: "#26334D",
    btnText: "View All",
    link: ""
  },
  {
    bgColor: "#2B4C9B",
    dropShadow: "0px 2px 5px rgba(38, 51, 77, 0.03)",
    title: "Travel Insurance",
    btnBgColor: "#1D3369",
    btnText: "View All",
    link: ""
  },

]

// socila icon


const SocialShare = [
  {
    link: 'Twitter',
    icon: <AiOutlineTwitter />,
    color: 'white',
    bg: '#1DA1F2',
    title: 'Twitter',
    className:'text-[20px] pt-1'
  
  },
  {
    link: 'Facebook',
    icon: <AiFillFacebook />,
    color: 'white',
    bg: '#4267B2',
    title: 'Facebook',
    className:'text-[20px] pt-1'
  }
  ,
  {
    link: 'Instagram',
    icon: <AiFillInstagram />,
    color: 'white',
    bg: '#405DE6',
    title: 'Instagram',
    className:'text-[20px] pt-1'
  }
  ,
  {
    link: 'Telegram',
    icon: <AiOutlineWhatsApp />,
    color: 'white',
    bg: '#25D366',
    title: 'WhatSapp',
    className:'text-[20px] pt-1'
  },
  {
    link: 'Copy Link',
    icon: <AiOutlineCopy />,
    color: 'white',
    bg: '#25D366',
    title: 'Copy Link',
    className:'text-[20px] pt-1'
  }
]



export {
  ServiceCardData,
  SocialShare
}