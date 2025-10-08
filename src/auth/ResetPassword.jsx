import { useState } from "react";
import "antd/dist/reset.css";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import BrandLogo from "../shared/BrandLogo";
import { useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useResetPasswordMutation } from "../Redux/api/auth/authApi";

export default function ResetPassword() {
  const location = useLocation();
  const resetToken = location.state?.resetToken;
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const navigate = useNavigate();
  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "The passwords do not match. Please try again.",
      });
      return;
    }

    if (!newPassword || !confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Invalid Request",
        text: "Missing required fields.",
      });
      return;
    }
    try {
      await resetPassword({
        resetToken,
        newPassword,
      }).unwrap();

      Swal.fire({
        icon: "success",
        title: "Password Updated!",
        text: "Your password has been successfully updated.",
      });
      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Password Reset Failed",
        text: error?.message || "Please try again.",
      });
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#ebfcf4] p-5">
      <div className="bg-white shadow-lg relative rounded-2xl p-6 w-full max-w-lg text-start">
        <BrandLogo
          status="Set a new password"
          information="Create a new password. Ensure it differs from previous ones for security."
        />
        <form className="space-y-5" onSubmit={handleUpdatePassword}>
          <div className="w-full">
            <label className="text-xl text-gray-800 mb-2 flex justify-start text-start">
              New Password
            </label>
            <div className="w-full relative">
              <input
                type={showNewPassword ? "text" : "password"}
                name="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="**********"
                className="w-full px-5 py-3 bg-white text-gray-600 border-2 border-[#FF914C] rounded-md outline-none mt-5 placeholder:text-gray-600"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((s) => !s)}
                className="absolute right-3 bottom-4 flex items-center text-[#FF914C]"
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="w-full">
            <label className="text-xl text-gray-800 mb-2 flex justify-start text-start">
              Confirm Password
            </label>
            <div className="w-full relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="**********"
                className="w-full px-5 py-3 bg-white text-gray-600 border-2 border-[#FF914C] rounded-md outline-none mt-5 placeholder:text-gray-600"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((s) => !s)}
                className="absolute right-3 bottom-4 flex items-center text-gray-400"
              >
                {showConfirmPassword ? (
                  <IoEyeOffOutline className="w-5 h-5 text-[#FF914C]" />
                ) : (
                  <IoEyeOutline className="w-5 h-5 text-[#FF914C]" />
                )}
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center text-white">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#FF914C] font-semibold py-3 px-6 rounded-lg shadow-lg cursor-pointer mt-5 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
