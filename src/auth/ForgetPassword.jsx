import { useNavigate } from "react-router-dom";
import BrandLogo from "../shared/BrandLogo";

function ForgetPassword() {
  const navigate = useNavigate();

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
              placeholder="admin@gmail.com"
              className="w-full px-5 py-3 bg-white text-gray-600 border-2 border-[#FF914C] rounded-md outline-none mt-5 placeholder:text-gray-600"
              required
            />
          </div>

          <div className="flex justify-center items-center text-white">
            <button
              onClick={() => navigate("/verify-mail")}
              type="button"
              className="whitespace-nowrap w-full bg-[#FF914C] text-white font-semibold py-3 rounded-lg shadow-lg cursor-pointer mt-5"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgetPassword;
