import { Modal } from "antd";
import { useEffect, useState } from "react";
import { FaTrashAlt, FaUpload } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import defaultAd from "../../assets/ads2.png";

export function AdCard({ campaign }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("Electronics");
  const [imageError, setImageError] = useState(false);

  // date formatter
  const formatDate = (value) => {
    if (!value) return "";
    const d = new Date(value);
    if (isNaN(d)) return String(value);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel3 = () => {
    setUpdateModalOpen(false);
  };
  const showModal3 = () => {
    setUpdateModalOpen(true);
  };
  const [uploadedImage, setUploadedImage] = useState({
    name: "",
    url: "",
  });

  // Initialize with existing campaign image when opening edit
  useEffect(() => {
    if (campaign?.image) {
      setUploadedImage({
        name: campaign.title || "Current Image",
        url: campaign.image,
      });
    }
    // reset error when campaign changes
    setImageError(false);
  }, [campaign]);
  useEffect(() => {
    if (updateModalOpen && campaign?.image) {
      setUploadedImage({
        name: campaign.title || "Current Image",
        url: campaign.image,
      });
    }
  }, [updateModalOpen, campaign]);
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage({
        name: file.name,
        url: URL.createObjectURL(file),
      });
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage({ name: "", url: "" });
  };
  return (
    <div className="bg-amber-200 rounded-lg overflow-hidden shadow-md">
      <div className="p-4 pb-0">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-lg">{campaign.title}</h2>

          {/* Dropdown Menu */}
          <div className="relative">
            <button
              className="p-1 rounded-full hover:bg-black/10 transition-colors"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <FiMoreVertical className="h-5 w-5" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg">
                <button
                  onClick={showModal3}
                  className="block px-4 py-2 text-sm text-gray-700"
                >
                  Edit
                </button>
                <button
                  onClick={showModal}
                  className="block px-4 py-2 text-sm text-red-500"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {campaign?.image && !imageError ? (
          <img
            src={campaign.image}
            alt={campaign.title}
            className="w-full h-48 md:h-56 object-cover rounded-lg"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-48 md:h-56 bg-gray-100 flex items-center justify-center rounded-lg text-gray-500 text-sm">
            Image is not available
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 text-center p-5 mt-5">
        <div className="flex flex-col">
          <span className="text-xl text-gray-800 mb-2 flex justify-start text-start">
            Start day
          </span>
          <span className="text-lg text-gray-800 flex justify-start text-start">
            {formatDate(campaign.startDate)}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl text-gray-800 mb-2 flex justify-end text-end">
            End day
          </span>
          <span className="text-lg text-gray-800 flex justify-end text-end">
            {formatDate(campaign.endDate)}
          </span>
        </div>
      </div>
      <Modal open={isModalOpen} centered onCancel={handleCancel} footer={null}>
        <div className="p-5">
          <h1 className="text-4xl text-center text-[#0D0D0D]">
            Are you sure you want to delete ?
          </h1>

          <div className="text-center py-5">
            <button
              onClick={handleOk}
              className="bg-[#14803c] text-white font-semibold w-full py-2 rounded transition duration-200"
            >
              YES,DELETE
            </button>
          </div>
          <div className="text-center pb-5">
            <button
              onClick={handleOk}
              className="text-[#14803c] border-2 border-green-600 bg-white font-semibold w-full py-2 rounded transition duration-200"
            >
              NO,DON’T DELETE
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        open={updateModalOpen}
        centered
        onCancel={handleCancel3}
        footer={null}
      >
        <div className="p-5">
          {/* Header */}
          <h2 className="text-2xl font-bold text-center mb-2">Update Ads</h2>
          <p className="text-center text-gray-600 mb-6">
            Edit the ads information as needed. Your changes will reflect across
            all associated listings.
          </p>

          {/* Upload section with inline preview */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Upload Post Image
            </label>
            <div className="border border-gray-300 rounded-md p-4 flex items-center justify-between">
              {uploadedImage.name ? (
                <>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded overflow-hidden bg-gray-100 flex items-center justify-center text-gray-500 text-[10px]">
                      {uploadedImage.url ? (
                        <img
                          src={uploadedImage.url}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span>No image</span>
                      )}
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

          {/* Category name input */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Advertisement Name
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Start and end date */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col">
              <label className="block text-gray-700 font-medium mb-2">
                Start Date
              </label>
              <input
                type="date"
                placeholder="02/02/2023"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700 font-medium mb-2">
                End Date
              </label>
              <input
                type="date"
                placeholder="02/02/2023"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleCancel3}
              className="px-4 py-2 border border-red-200 bg-red-50 text-red-500 rounded-md hover:bg-red-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCancel3}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
