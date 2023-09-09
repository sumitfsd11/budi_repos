import { RiDashboardFill, RiPriceTag2Fill, RiSettings5Fill } from 'react-icons/ri';
import { MdInsertComment, MdLocalOffer, MdCategory } from 'react-icons/md';
import { SiScrollreveal } from 'react-icons/si';
import { BsPeopleFill, BsFillBookmarkCheckFill } from "react-icons/bs";
import { FaIdeal } from "react-icons/fa";
import { MdPrivacyTip } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import {HiDocumentText} from "react-icons/hi";
export const SidebarContants = [
  {
    link: '/',
    key: '',
    title: 'Dashboard',
    permissionKey: '',
    tag: null,
    notification: 12,
    IconColor: 'blue',
    icon: <RiDashboardFill />,
    child: [],
  },
  {
    link: '',
    key: 'offer',
    title: 'Offer',
    tag: 'New',
    permissionKey: '',
    IconColor: '#2E72B9',
    notification: null,
    icon: <MdLocalOffer />,
    child: [],
  },
  {
    link: '',
    key: 'comment',
    title: 'Comment',
    tag: 'Comment',
    permissionKey: '',
    IconColor: 'pink',
    notification: null,
    icon: <MdInsertComment />,
    child: [],
  },
  {
    link: '/users',
    key: 'users',
    title: 'Users',
    tag: 'Offer',
    permissionKey: '',
    IconColor: 'blue',
    notification: null,
    icon: <BsPeopleFill />,
    child: [],
  },

  {
    link: '',
    key: 'Deals',
    title: 'Deals',
    tag: 'Offer',
    permissionKey: '',
    IconColor: '#F2994A',
    notification: null,
    icon: <FaIdeal />,
    child: [],
  },
  {
    link: '/dashboard-revenue',
    key: 'Revenue',
    title: 'Revenue',
    permissionKey: '',
    tag: null,
    notification: 12,
    IconColor: 'green',
    icon: <SiScrollreveal />,
  },
  {
    link: null,
    key: 'Document',
    title: 'Document',
    tag: 'Document',
    permissionKey: '',
    IconColor: '#F2994A',
    notification: null,
    icon: <HiDocumentText />,
    child: [
      {
        link: '/term-condition',
        key: 'Setting',
        title: 'Terms & Condition',
        permissionKey: '',
        tag: null,
        notification: null,
        IconColor: 'green',
        icon: <BsFillBookmarkCheckFill />,
      }
      ,
      {
        link: '/privacy',
        key: 'Privacy',
        title: 'Privacy',
        permissionKey: '',
        tag: null,
        notification: null,
        IconColor: 'pink',
        icon: <MdPrivacyTip />,
      }
    ],
  },

]

export const AgentRemainSideConstant = [
  {
    link: null,
    key: 'Categories',
    title: 'Categories',
    permissionKey: '',
    tag: null,
    notification: 12,
    IconColor: 'green',
    icon: <MdCategory />,
  }
  ,
  {
    link: null,
    key: 'Tags',
    title: 'Tags',
    permissionKey: '',
    tag: null,
    notification: 12,
    IconColor: '#FF6633',
    icon: <RiPriceTag2Fill />,
  },
  {
    link: '/support',
    key: 'Setting',
    title: 'support',
    permissionKey: '',
    tag: null,
    notification: 2,
    IconColor: '#FFCB33',
    icon: <BiSupport />,
  },
  {
    link: null,
    key: 'Setting',
    title: 'Setting',
    permissionKey: '',
    tag: null,
    notification: null,
    IconColor: '#FFCB33',
    icon: <RiSettings5Fill />,
  }



]


