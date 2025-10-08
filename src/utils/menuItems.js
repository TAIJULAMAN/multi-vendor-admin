import { MdDashboard, MdOutlineCategory } from "react-icons/md";
import { FaUsers, FaCog } from "react-icons/fa";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { TbHomeDollar } from "react-icons/tb";
import { BiCheckShield, BiCommand } from "react-icons/bi";

export const AdminItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: MdDashboard,
    link: "/",
  },
  {
    key: "userManagement",
    label: "User Management",
    icon: FaUsers,
    link: "/dashboard/user-management",
  },
  {
    key: "sellermanagement",
    label: "Seller Management",
    icon: TbHomeDollar,
    link: "/dashboard/seller-management",
  },
  {
    key: "categorymanagement",
    label: "Category Management",
    icon: MdOutlineCategory,
    link: "/category-management",
  },
  {
    key: "englishAdPromotion",
    label: "Ads Promotion",
    icon: BiCommand,
    link: "/ads-promotion",
  },
  {
    key: "customerSupport",
    label: "Customer Support",
    icon: BiCheckShield,
    link: "/support",
  },
  {
    key: "vendorChat",
    label: "Vendor Chat",
    icon: IoChatboxEllipsesOutline,
    link: "/chat",
  },
  {
    key: "settings",
    label: "Settings",
    icon: FaCog,
    link: "/dashboard/Settings/profile",
    children: [
      {
        key: "profile",
        label: "Profile",
        link: "/dashboard/Settings/profile",
      },
      {
        key: "terms",
        label: "Terms & Condition",
        link: "/dashboard/Settings/Terms&Condition",
      },
      {
        key: "privacy",
        label: "Privacy Policy",
        link: "/dashboard/Settings/PrivacyPolicy",
      },
      {
        key: "faq",
        label: "Faq",
        link: "/faq",
      },
    ],
  },
];
