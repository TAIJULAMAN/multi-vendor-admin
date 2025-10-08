/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import img2 from "../../assets/ads2.png";
import PageHeading from "../../shared/PageHeading";
import { Modal } from "antd";
import { FaTrashAlt, FaUpload } from "react-icons/fa";
import { AdCard } from "./AdCard";
import { useGetAllAdsQuery, useCreateAdsMutation } from "../../Redux/api/ads/adsApi";

export default function AdPromotion() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("Electronics");
  const [uploadedImage, setUploadedImage] = useState({
    name: "",
    url: "",
    file: null,
  });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Fetch ads from API
  const { data: adsData, isLoading, error, isFetching } = useGetAllAdsQuery();
  const [createAds, { isLoading: isCreating }] = useCreateAdsMutation();
  console.log("ads data from ads promotion", adsData);

  const handleCancel2 = () => {
    setAddModalOpen(false);
  };
  const showModal2 = () => {
    setAddModalOpen(true);
  };
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage({
        name: file.name,
        url: URL.createObjectURL(file),
        file,
      });
    }
  };
  const handleRemoveImage = () => {
    setUploadedImage({ name: "", url: "", file: null });
  };
  // Normalize possible API response shapes
  const rawAds =
    adsData?.data?.ads ?? adsData?.data ?? adsData?.ads ?? adsData ?? [];
  const campaigns = Array.isArray(rawAds)
    ? rawAds.map((ad, idx) => ({
        id: ad?.id || ad?._id || idx,
        title: ad?.title || "Untitled Ad",
        image: ad?.image || "",
        startDate: ad?.startDate || "",
        endDate: ad?.endDate || "",
        status: ad?.status || "",
      }))
    : [];

  return (
    <div className="p-6 bg-neutral-100 min-h-screen">
      <div className="flex justify-between items-center text-center mb-5">
        <PageHeading title="Ads Promotion" />

        <div className="flex justify-end items-center">
          <button
            onClick={showModal2}
            className="bg-[#FF914C] text-white px-4 py-3 rounded-lg hover:bg-[#FF914C]/80"
          >
            + Add New Promotion
          </button>
        </div>
      </div>
      {/* Ads list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {campaigns.map((campaign) => (
          <AdCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
      <Modal
        open={addModalOpen}
        centered
        footer={null}
      >
        <div className="p-5">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Add New Ads</h2>
            <p className="text-gray-600">
              Fill out the details below to add a new ads. This will help users
              organize their listings effectively.
            </p>
          </div>

          {/* Upload Section - same behavior as Update Ads */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Upload Post Image
            </label>
            <div className="border border-gray-300 rounded-md p-4 flex items-center justify-between">
              {uploadedImage.name ? (
                <>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded overflow-hidden bg-gray-100">
                      <img
                        src={uploadedImage.url || img2}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <span className="text-gray-500">{uploadedImage.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleRemoveImage}
                      className="p-2 text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt size={18} className="text-red-500" />
                    </button>
                    <label className="cursor-pointer text-blue-600">
                      <div className="flex items-center gap-2">
                        <FaUpload className="h-5 w-5" />
                        <span>Change</span>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </>
              ) : (
                <label className="cursor-pointer text-gray-500 w-full flex items-center justify-center">
                  <div className="flex items-center gap-2">
                    <FaUpload className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-400">Upload Picture</span>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Category Name Input */}
          <div className="mb-6">
            <label className="block text-gray-800 mb-2">
              Advertisement Name
            </label>
            <input
              type="text"
              placeholder="Enter Name here"
              className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          {/* start date and end date */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col">
              <label className="block text-gray-800 mb-2">Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-800 mb-2">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* buttons */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              onClick={handleCancel2}
              className="py-2 px-4 rounded-lg border border-[#EF4444] bg-red-50"
            >
              Cancel
            </button>

            <button
              onClick={async () => {
                try {
                  if (!categoryName || !startDate || !endDate || !uploadedImage.file) return;
                  const formData = new FormData();
                  formData.append("title", categoryName);
                  formData.append("startDate", new Date(startDate).toISOString());
                  formData.append("endDate", new Date(endDate).toISOString());
                  formData.append("image", uploadedImage.file);
                  await createAds(formData).unwrap();
                  // reset and close
                  setAddModalOpen(false);
                  setCategoryName("");
                  setStartDate("");
                  setEndDate("");
                  setUploadedImage({ name: "", url: "", file: null });
                } catch (_) {
                  // optionally toast
                }
              }}
              disabled={isCreating}
              className={`py-2 px-4 rounded-lg bg-green-600 text-white ${isCreating ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {isCreating ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
