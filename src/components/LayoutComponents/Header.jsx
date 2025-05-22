import { LuBell } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaFileAlt, FaUsers } from "react-icons/fa";
import { useRef, useState } from "react";
import { Drawer } from "antd";
import settings from "../../assets/routerImg/settings.png";
import logo from "../../assets/header/logo.png";
import { FaChevronRight } from "react-icons/fa";
import { IoIosLogIn } from "react-icons/io";
import { MdDashboard, MdManageAccounts } from "react-icons/md";
import { AdminItems } from "./SideBar";



const Header = () => {
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [expandedKeys, setExpandedKeys] = useState([]);
  const navigate = useNavigate();
  const contentRef = useRef({});
  const [open, setOpen] = useState(false);
  const [placement] = useState("left");

  const onParentClick = (key) => {
    setExpandedKeys((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="bg-[#FF914C] text-white px-5 py-4">
      <div className="flex justify-between items-center">
        <div className="lg:hidden">
          <button onClick={showDrawer} className="p-2">
            <FaBars size={24} />
          </button>
          <Drawer
            title={
              <div className="flex justify-center">
                <img src={logo} alt="Logo" className="md:w-[160px] w-[80px]" />
              </div>
            }
            placement={placement}
            width={300}
            onClose={onClose}
            open={open}
            className="custom-drawer"
          >
            <div className="menu-items">
              {AdminItems.map((item) => (
                <div key={item.key}>
                  <Link
                    to={item.link}
                    className={`menu-item my-4 mx-5 py-3 px-3 flex items-center cursor-pointer ${selectedKey === item.key
                      ? "bg-[#0B704E] text-white rounded-md"
                      : "bg-white rounded-md"
                      }`}
                    onClick={(e) => {
                      if (item.children) {
                        e.preventDefault();
                        onParentClick(item.key);
                      } else {
                        setSelectedKey(item.key);
                        onClose();
                      }
                    }}
                  >
                    {item?.icon()}
                    <span className="ml-3 text-base font-medium">
                      {item.label}
                    </span>
                    {item.children && (
                      <FaChevronRight
                        className={`ml-auto transform transition-all duration-300 ${expandedKeys.includes(item.key) ? "rotate-90" : ""
                          }`}
                      />
                    )}
                  </Link>

                  {item.children && (
                    <div
                      className={`children-menu bg-white -my-2 mx-5 text-black transition-all duration-300 ${expandedKeys.includes(item.key) ? "expanded" : ""
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
                          className={`menu-item p-4 flex items-center cursor-pointer ${selectedKey === child.key
                            ? "bg-[#0B704E] text-white"
                            : ""
                            }`}
                          onClick={() => {
                            setSelectedKey(child.key);
                            setExpandedKeys([]);
                            onClose();
                          }}
                        >
                          <span className="ml-8">{child.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="custom-sidebar-footer absolute bottom-0 w-full p-4">
              <button
                onClick={handleLogout}
                className="w-full flex bg-[#0B704E] text-white text-start rounded-md p-3 mt-10"
              >
                <span className="text-2xl">
                  <IoIosLogIn />
                </span>
                <span className="ml-3">Logout</span>
              </button>
            </div>
          </Drawer>
        </div>

        <div className="ml-auto flex items-center justify-center gap-5">
          <div className="relative">
            <Link to={"/dashboard/Settings/notification"}>
              <LuBell className="text-2xl text-[#0B704E] w-[40px] h-[40px]" />
            </Link>
            <span className="absolute -top-2 -right-2 bg-[#0B704E] text-xs rounded-full w-6 h-6 flex items-center justify-center">
              10
            </span>
          </div>
          <div className="pl-5 border-gray-600">
            <Link to={"/dashboard/Settings/profile"}>
              <div className="flex items-center gap-3">
                <img
                  src="https://avatar.iran.liara.run/public/44"
                  className="w-[40px] h-[40px] object-cover rounded-full border-2 border-[#0B704E]"
                  alt="User Avatar"
                />
                <div className="hidden md:flex flex-col items-start">
                  <h3 className="text-gray-800 text-sm">Shah Aman</h3>
                  <p className="text-xs px-2 py-1 bg-[#ebfcf4] text-[#15803D] rounded">
                    Admin
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
