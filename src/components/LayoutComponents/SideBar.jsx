import {
  MdDashboard,
  MdManageAccounts,
  MdOutlineCategory,
} from "react-icons/md";
import { FaUsers, FaChevronRight, FaCog } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import logo from "../../assets/header/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { TbHomeDollar } from "react-icons/tb";
import { LuBadgeCheck } from "react-icons/lu";
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
    key: "subscription",
    label: "Subscription",
    icon: LuBadgeCheck,
    link: "/dashboard/subscription",
  },
  {
    key: "categorymanagement",
    label: "Category Management",
    icon: MdOutlineCategory,
    link: "/category-management",
  },
  {
    key: "premiumSubscribers",
    label: "Premium Subscribers",
    icon: MdManageAccounts,
    link: "/premium-subscribers",
  },
  {
    key: "englishAdPromotion",
    label: "English Ads Promotion",
    icon: BiCommand,
    link: "/ads-promotion",
  },
   {
    key: "arabicAdPromotion",
    label: "Arabic Ads Promotion",
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
    key: "vendorSupport",
    label: "Vendor Support",
    icon: BiCheckShield,
    link: "/support",
  },
  {
    key: "customerChat",
    label: "Customer Chat",
    icon: IoChatboxEllipsesOutline,
    link: "/chat",
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

const SideBar = () => {
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [expandedKeys, setExpandedKeys] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const contentRef = useRef({});

  useEffect(() => {
    const currentPath = location.pathname;

    let activeParent = null;

    AdminItems.forEach((item) => {
      if (item.link === currentPath) {
        activeParent = item;
      } else if (
        item.children &&
        item.children.some((child) => child.link === currentPath)
      ) {
        activeParent = item;
      }
    });

    if (activeParent) {
      setSelectedKey(
        activeParent.children
          ? activeParent.children.find((child) => child.link === currentPath)
              ?.key || activeParent.key
          : activeParent.key
      );

      if (activeParent.children && !expandedKeys.includes(activeParent.key)) {
        setExpandedKeys([...expandedKeys, activeParent.key]);
      }
    }
  }, []);

  const onParentClick = (key) => {
    setExpandedKeys((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-[100vh] bg-[#FF914C]">
      <div className="custom-sidebar-logo flex justify-center bg-gray-600">
        <img src={logo} alt="Logo" className="w-[95px]" />
      </div>
      <div className="menu-items">
        <div>
          {AdminItems.map((item) => {
            const isSettingsActive =
              item.key === "settings" &&
              item.children.some((child) => child.link === location.pathname);

            const isCreatorActive =
              item.key === "creatorManagement" &&
              item.children.some((child) => child.link === location.pathname);

            const isCategoriesActive =
              item.key === "categoriesManagement" &&
              item.children.some((child) => child.link === location.pathname);

            return (
              <div key={item.key}>
                <Link
                  to={item.link}
                  className={`menu-item my-4 mx-5 py-3 px-3 flex items-center cursor-pointer ${
                    selectedKey === item.key ||
                    isSettingsActive ||
                    isCreatorActive ||
                    isCategoriesActive
                      ? "bg-[#0B704E] text-white rounded-md"
                      : "bg-white rounded-md hover:bg-[#B3D3C8]"
                  }`}
                  onClick={(e) => {
                    if (item.children) {
                      e.preventDefault();
                      onParentClick(item.key);
                    } else {
                      setSelectedKey(item.key);
                    }
                  }}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span className="block w-full ">{item.label}</span>

                  {/* Show dropdown arrow if children exist */}
                  {item.children && (
                    <FaChevronRight
                      className={`ml-auto transform transition-all duration-300 ${
                        expandedKeys.includes(item.key) ? "rotate-90" : ""
                      }`}
                    />
                  )}
                </Link>

                {/* Show children menu if expanded */}
                {item.children && (
                  <div
                    className={`children-menu bg-white -my-2 mx-5 transition-all duration-300 ${
                      expandedKeys.includes(item.key) ? "expanded" : ""
                    }`}
                    style={{
                      maxHeight: expandedKeys.includes(item.key)
                        ? `${contentRef.current[item.key]?.scrollHeight}px`
                        : "0",
                    }}
                    ref={(el) => (contentRef.current[item.key] = el)}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.key}
                        to={child.link}
                        className={`menu-item p-4 flex items-center cursor-pointer ${
                          selectedKey === child.key
                            ? "bg-[#0B704E] text-white"
                            : "hover:bg-[#B3D3C8]"
                        }`}
                        onClick={() => {
                          setSelectedKey(child.key); // Set the selected key for children
                          setExpandedKeys([]); // Close all expanded items
                        }}
                      >
                        <span className="block w-full ">{child.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Logout Button */}
      <div className="  w-full p-4 px-5">
        <button
          onClick={handleLogout}
          className="w-full flex bg-[#0B704E] text-white text-start rounded-md p-3 mt-10"
        >
          <span className="text-2xl">
            <IoIosLogIn />
          </span>
          <span className="ml-3">Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
