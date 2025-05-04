import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BrandLogo from "../shared/BrandLogo";

function VerificationCode() {
  const [code, setCode] = useState(new Array(5).fill(""));
  const navigate = useNavigate();

  const handleChange = (value, index) => {
    if (!isNaN(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`).focus();
      }
    }
  };

  const handleVerifyCode = async () => {
    navigate("/reset-password");
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
            <p className="text-gray-600 text-center mt-10">
              You have not received the email?{" "}
              <span className="text-[#FF914C]"> Resend</span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VerificationCode;
