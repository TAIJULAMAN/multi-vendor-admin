import { useState, useEffect } from "react";
import {
  useGetAdminProfileQuery,
  useUpdateProfileMutation,
} from "../../Redux/api/profileApi";

export default function EditProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [language, setLanguage] = useState("");

  const { data: getAdminProfile } = useGetAdminProfileQuery();
  console.log("getAdminProfile", getAdminProfile);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  // Prefill form when profile loads
  useEffect(() => {
    const p = getAdminProfile?.data?.user|| getAdminProfile;
    if (p) {
      setName(p?.name || "");
      setEmail(p?.email || "");
      setPhone(p?.phone || "");
      setCountry(p?.country || "");
      setLanguage(p?.language || "");
    }
  }, [getAdminProfile]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    if (name) fd.append("name", name);
    if (phone) fd.append("phone", phone);
    if (country) fd.append("country", country);
    if (language) fd.append("language", language);

    await updateProfile(fd).unwrap();
  };
  return (
    <div className="bg-white px-20 w-[715px] py-5 rounded-md">
      <p className="text-[#0D0D0D] text-center font-bold text-2xl mb-5">
        Edit Your Profile
      </p>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="text-xl text-[#0D0D0D] mb-2 font-bold">
            User Name
          </label>
          <input
            type="text"
            name="fullName"
            className="w-full px-5 py-3 border-2 border-[#6A6D76] rounded-md outline-none mt-5 placeholder:text-xl"
            placeholder="Enter full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="text-xl text-[#0D0D0D] mb-2 font-bold">Email</label>
          <input
            type="email"
            name="email"
            className="w-full px-5 py-3 border-2 border-[#6A6D76] rounded-md outline-none mt-5 placeholder:text-xl bg-gray-100 text-gray-600"
            placeholder="Email"
            value={email}
            readOnly
            disabled
          />
        </div>

        <div>
          <label className="text-xl text-[#0D0D0D] mb-2 font-bold">
            Contact No
          </label>
          <input
            type="text"
            name="contactNo"
            className="w-full px-5 py-3 border-2 border-[#6A6D76] rounded-md outline-none mt-5 placeholder:text-xl"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xl text-[#0D0D0D] mb-2 font-bold">
              Country
            </label>
            <input
              type="text"
              name="country"
              className="w-full px-5 py-3 border-2 border-[#6A6D76] rounded-md outline-none mt-2 placeholder:text-xl"
              placeholder="Enter country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xl text-[#0D0D0D] mb-2 font-bold">
              Language
            </label>
            <input
              type="text"
              name="language"
              className="w-full px-5 py-3 border-2 border-[#6A6D76] rounded-md outline-none mt-2 placeholder:text-xl"
              placeholder="e.g., en"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </div>
        </div>

        {/* Image upload removed as requested */}

        <div className="text-center py-5">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#0B704E] text-white font-semibold w-full py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Saving..." : "Save & Change"}
          </button>
        </div>
      </form>
    </div>
  );
}
