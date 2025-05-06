import { useState } from "react";
import "antd/dist/reset.css";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import BrandLogo from "../shared/BrandLogo";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#ebfcf4] p-5">
      <div className="bg-white shadow-lg relative rounded-2xl p-6 w-full max-w-lg text-start">
        <BrandLogo
          status="Set a new password"
          information="Create a new password. Ensure it differs from previous ones for security."
        />
        <form className="space-y-5">
          <div className="w-full">
            <label className="text-xl text-gray-800 mb-2 flex justify-start text-start">
              New Password
            </label>
            <div className="w-full relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="**********"
                className="w-full px-5 py-3 bg-white text-gray-600 border-2 border-[#FF914C] rounded-md outline-none mt-5 placeholder:text-gray-600"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 bottom-4 flex items-center text-[#FF914C]"
              >
                {showPassword ? (
                  <IoEyeOffOutline className="w-5 h-5 [text-[#FF914C]" />
                ) : (
                  <IoEyeOutline className="w-5 h-5 text-[#FF914C]" />
                )}
              </button>
            </div>
          </div>
          <div className="w-full">
            <label className="text-xl text-gray-800 mb-2 flex justify-start text-start">
              Confirm Password
            </label>
            <div className="w-full relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="**********"
                className="w-full px-5 py-3 bg-white text-gray-600 border-2 border-[#FF914C] rounded-md outline-none mt-5 placeholder:text-gray-600"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 bottom-4 flex items-center text-gray-400"
              >
                {showPassword ? (
                  <IoEyeOffOutline className="w-5 h-5 text-[#FF914C]" />
                ) : (
                  <IoEyeOutline className="w-5 h-5 text-[#FF914C]" />
                )}
              </button>
            </div>
          </div>

          <Link to="/login">
            <div className="flex justify-center items-center text-white">
              <button
                type="submit"
                className="w-full bg-[#FF914C] font-semibold py-3 px-6 rounded-lg shadow-lg cursor-pointer mt-5"
              >
                Sign In
              </button>
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
