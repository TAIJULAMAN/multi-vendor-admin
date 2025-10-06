import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BrandLogo from "../shared/BrandLogo";
import { useVerifyEmailMutation } from "../Redux/api/authApi";
import Swal from "sweetalert2";

export default function VerificationCode() {
  const [code, setCode] = useState(new Array(6).fill(""));
  const [searchParams] = useSearchParams();
  const [verifyEmail] = useVerifyEmailMutation();

  const email = searchParams.get("email");
  console.log("email", email);
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (!isNaN(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 6) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };
  const enteredCode = code.join("");
  const otpData = {
    email,
    code: enteredCode,
  };

  const handleVerifyCode = async () => {
    if (enteredCode.length === 6) {
      await verifyEmail(otpData)
        .unwrap()
        .then((response) => {
          console.log("response from verify email", response);
          const resetToken = response?.data?.resetToken;
          console.log("resetToken from VerificationCode", resetToken);
          Swal.fire({
            icon: "success",
            title: "Verification successful!",
            text: "Your email has been successfully verified.",
          });
          // navigate(`/reset-password?email=${email}`);
          navigate("/reset-password", { state: { resetToken } });
        })
        .catch((err) => {
          console.error("Verification error:", err);
          const errorMessage =
            err?.data?.message ||
            err.message ||
            "Invalid code. Please try again.";
          Swal.fire({
            icon: "error",
            title: "Verification Failed",
            text: errorMessage,
          });
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a valid 6-digit code.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white p-5">
      <div className="bg-white relative shadow-lg rounded-2xl px-10 py-20 w-full max-w-xl text-center">
        <BrandLogo
          status=" Check your email"
          information=" Please enter your email to get verification code."
        />
        <form className="space-y-5">
          <div className="flex justify-center gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                className="shadow-xs w-12 h-12 text-2xl text-center border border-[#FF914C] text-[#FF914C] rounded-lg focus:outline-none"
              />
            ))}
          </div>

          <div className="flex flex-col gap-5 justify-center items-center text-white">
            <button
              onClick={handleVerifyCode}
              type="button"
              className="whitespace-nowrap w-full bg-[#FF914C] text-white font-semibold py-3 rounded-lg shadow-lg cursor-pointer my-5"
            >
              Continue
            </button>
            {/* <p className="text-gray-600 text-center mt-10">
              You have not received the email?{" "}
              <span className="text-[#FF914C]"> Resend</span>
            </p> */}
          </div>
        </form>
      </div>
    </div>
  );
}
