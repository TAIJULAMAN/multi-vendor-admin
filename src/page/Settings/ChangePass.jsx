import { useState } from "react";
import Swal from "sweetalert2";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useChangeAdminPasswordMutation } from "../../Redux/api/profileApi";

function ChangePass() {
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePassword, { isLoading }] = useChangeAdminPasswordMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      Swal.fire({ icon: "error", title: "Validation error", text: "All fields are required" });
      return;
    }
    if (newPassword !== confirmPassword) {
      Swal.fire({ icon: "error", title: "Password mismatch", text: "New password and confirm password do not match" });
      return;
    }
    try {
      await changePassword({ currentPassword, newPassword }).unwrap();
      Swal.fire({ icon: "success", title: "Password changed", timer: 1500, showConfirmButton: false });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      Swal.fire({ icon: "error", title: "Failed to change password", text: err?.data?.message || "Something went wrong" });
    }
  };

  return (
    <div className="bg-white px-20 w-[715px] pt-10 py-5 rounded-md">
      <p className="text-primary text-center font-bold text-xl mb-5">
        Change Password
      </p>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="w-full">
          <label
            htmlFor="password"
            className="text-xl text-[#0D0D0D] mb-2 font-bold"
          >
            Current Password
          </label>
          <div className="w-full relative">
            <input
              type={showPassword ? "text" : "password"}
              name="currentPassword"
              placeholder="**********"
              className="w-full border-2 border-[#6A6D76] rounded-md outline-none px-5 py-3 mt-5 placeholder:text-xl"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 bottom-4 flex items-center text-[#6A6D76]"
            >
              {showPassword ? (
                <IoEyeOffOutline className="w-5 h-5" />
              ) : (
                <IoEyeOutline className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div className="w-full">
          <label
            htmlFor="password"
            className="text-xl text-[#0D0D0D] mb-2 font-bold"
          >
            New Password
          </label>
          <div className="w-full relative">
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              placeholder="**********"
              className="w-full border-2 border-[#6A6D76] rounded-md outline-none px-5 py-3 mt-5 placeholder:text-xl"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 bottom-4 flex items-center text-[#6A6D76]"
            >
              {showPassword ? (
                <IoEyeOffOutline className="w-5 h-5" />
              ) : (
                <IoEyeOutline className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div className="w-full">
          <label
            htmlFor="password"
            className="text-xl text-[#0D0D0D] mb-2 font-bold"
          >
            Confirm New Password
          </label>
          <div className="w-full relative">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="**********"
              className="w-full border-2 border-[#6A6D76] rounded-md outline-none px-5 py-3 mt-5 placeholder:text-xl"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 bottom-4 flex items-center text-[#6A6D76]"
            >
              {showPassword ? (
                <IoEyeOffOutline className="w-5 h-5" />
              ) : (
                <IoEyeOutline className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div className="text-center py-5">
          <button disabled={isLoading} className={`bg-[#0B704E] text-white font-semibold w-full py-3 rounded-md ${isLoading ? "opacity-60 cursor-not-allowed" : ""}`}>
            {isLoading ? "Saving..." : "Save & Change"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChangePass;
