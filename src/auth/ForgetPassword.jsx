import { useNavigate } from "react-router-dom";
import BrandLogo from "../shared/BrandLogo";
import { useForgotPasswordMutation } from "../Redux/api/authApi";
import Swal from "sweetalert2";
import { useState } from "react";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const handleSendCode = (e) => {
    e.preventDefault();
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter your email!",
      });
      return;
    }

    forgotPassword({ email })
      .unwrap()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "OTP Sent",
          text: "The OTP has been sent to your email successfully!",
        });
        navigate(`/verify-mail?email=${email}`);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error?.data?.message,
        });
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-5">
      <div className="bg-white relative shadow-lg rounded-2xl px-5 py-20 w-full max-w-xl text-center">
        <BrandLogo
          status=" Forgot password?"
          information=" Please enter your email to get verification code."
        />
        <form className="space-y-5">
          <div>
            <label className="text-xl text-gray-800 mb-2 flex justify-start text-start">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gmail.com"
              className="w-full px-5 py-3 bg-white text-gray-600 border-2 border-[#FF914C] rounded-md outline-none mt-5 placeholder:text-gray-600"
              required
            />
          </div>

          <div className="flex justify-center items-center text-white">
            <button
              onClick={handleSendCode}
              disabled={isLoading}
              type="button"
              className="whitespace-nowrap w-full bg-[#FF914C] text-white font-semibold py-3 rounded-lg shadow-lg cursor-pointer mt-5"
            >
              {isLoading ? "Sending..." : "Continue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
