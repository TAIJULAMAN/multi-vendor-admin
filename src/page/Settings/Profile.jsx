import { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import EditProfile from "./EditProfile";
import ChangePass from "./ChangePass";
import PageHeading from "../../shared/PageHeading";
import {
  useGetAdminProfileQuery,
  useUpdateProfileMutation,
} from "../../Redux/api/profileApi";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("editProfile");
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const { data: getAdminProfile } = useGetAdminProfileQuery();
  console.log("getAdminProfile", getAdminProfile);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  // Prefill form when profile loads
  useEffect(() => {
    const p = getAdminProfile?.data?.user || getAdminProfile;
    if (p) {
      setImage(p?.image || "");
      setName(p?.name || "");
    }
  }, [getAdminProfile]);

  // Build preview URL when a new file is selected
  useEffect(() => {
    if (image && typeof image !== "string") {
      const url = URL.createObjectURL(image);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreviewUrl(null);
  }, [image]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    if (image) fd.append("image", image);
    if (name) fd.append("name", name);

    await updateProfile(fd).unwrap();
  };

  // Auto-upload image when changed (no button needed)
  const handleImageChange = async (e) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;
    setImage(file);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await updateProfile(fd).unwrap();
      // Try to use returned image URL immediately to avoid cache issues
      const updated = res?.data?.user || res?.user || res;
      const newUrl = updated?.image?.url || updated?.image;
      if (typeof newUrl === "string") {
        setImage(newUrl);
        setPreviewUrl(null);
      }
      // Ensure fresh data is pulled
      await refetch();
    } catch (_) {
      // Optionally handle error UI here
    }
    // allow re-selecting the same file by clearing the input value
    e.target.value = "";
  };

  // Helper to break cache when server returns same URL
  const cacheBust = (url) => {
    if (!url || typeof url !== "string") return url;
    const sep = url.includes("?") ? "&" : "?";
    return `${url}${sep}t=${Date.now()}`;
  };

  return (
    <div className="overflow-y-auto">
      <div className="px-5 pb-5 h-full">
        <PageHeading title=" Admin Profile" />
        <div className="mx-auto flex flex-col justify-center items-center">
          {/* Profile Picture Section */}
          <div className="flex flex-col justify-center items-center mt-5 text-gray-800 w-[900px] mx-auto p-5 gap-5 rounded-lg">
            <div className="relative">
              <div className="w-[122px] h-[122px] bg-gray-300 rounded-full border-4 border-white shadow-xl flex justify-center items-center overflow-hidden">
                <img
                  src={
                    previewUrl ||
                    cacheBust(typeof image === "string" ? image : getAdminProfile?.data?.user?.image) ||
                    "https://avatar.iran.liara.run/public/44"
                  }
                  alt="profile"
                  className="h-full w-full object-cover"
                />
                {/* Upload Icon */}
                <div className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer">
                  <label htmlFor="profilePicUpload" className="cursor-pointer">
                    <FaCamera className="text-[#FF914C]" />
                  </label>
                  <input
                    type="file"
                    id="profilePicUpload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <p className="text-xl md:text-3xl font-bold text-center">{name || "-"}</p>
            </div>
          </div>

          {/* Tab Navigation Section */}
          <div className="flex justify-center items-center gap-5 text-md md:text-xl font-semibold my-5">
            <p
              onClick={() => setActiveTab("editProfile")}
              className={`cursor-pointer pb-1 ${
                activeTab === "editProfile"
                  ? "text-[#0B704E] border-b-2 border-[#0B704E]"
                  : "text-[#6A6D76]"
              }`}
            >
              Edit Profile
            </p>
            <p
              onClick={() => setActiveTab("changePassword")}
              className={`cursor-pointer pb-1 ${
                activeTab === "changePassword"
                  ? "text-[#0B704E] border-b-2 border-[#0B704E]"
                  : "text-[#6A6D76]"
              }`}
            >
              Change Password
            </p>
          </div>

          {/* Tab Content Section */}
          <div className="flex justify-center items-center p-5 rounded-md">
            <div className="w-full max-w-3xl">
              {activeTab === "editProfile" && <EditProfile />}
              {activeTab === "changePassword" && <ChangePass />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
