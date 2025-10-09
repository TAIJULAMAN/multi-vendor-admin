import { IoIosLogIn } from "react-icons/io";
import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Redux/Slice/authSlice";
import { baseApi } from "../../Redux/api/baseApi";
import { persistor } from "../../Redux/store";

export default function LogoutButton() {
  const token = useSelector((state) => state.auth?.token);
  // console.log("token from logout", token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    Modal.confirm({
      title: "Confirm logout",
      content: "Are you sure you want to log out?",
      okText: "Logout",
      cancelText: "Cancel",
      okButtonProps: { danger: true },
      centered: true,
      onOk: async () => {
        dispatch(logout());
        dispatch(baseApi.util.resetApiState());
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        await persistor.purge();
        navigate("/login");
      },
    });
  };

  return (
    <div className="w-full p-4 px-5">
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
  );
}
