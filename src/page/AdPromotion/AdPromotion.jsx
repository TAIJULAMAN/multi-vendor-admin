/* eslint-disable react/prop-types */
import { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import img1 from "../../assets/ads.png";
import img2 from "../../assets/ads2.png";
import img3 from "../../assets/ads3.png";
import PageHeading from "../../shared/PageHeading";
import { Modal } from "antd";
import { FaTrashAlt, FaUpload } from "react-icons/fa";

export default function AdPromotion() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [categoryName, setCategoryName] = useState("Electronics");

  const handleCancel2 = () => {
    setAddModalOpen(false);
  };
  const showModal2 = () => {
    setAddModalOpen(true);
  };
  const campaigns = [
    {
      id: 1,
      title: "Advertisement 1",
      image: img1,
      startDate: "05/4/25",
      endDate: "05/4/25",
    },
    {
      id: 3,
      title: "Advertisement 3",
      image: img2,
      startDate: "05/4/25",
      endDate: "05/4/25",
    },
    {
      id: 2,
      title: "Advertisement 2",
      image: img3,
      startDate: "05/4/25",
      endDate: "05/4/25",
    },
  ];
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {campaigns.map((campaign) => (
          <AdCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
      <Modal
        open={addModalOpen}
        centered
        onCancel={handleCancel2}
        footer={null}
      >
        <div className="p-5">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Add New Category</h2>
            <p className="text-gray-600">
              Fill out the details below to add a new category. This will help
              users organize their listings effectively.
            </p>
          </div>

          {/* Upload Section */}
          <div className="mb-6">
            <label className="block text-gray-800 mb-2">
              Upload Category Image
            </label>
            <label className="border border-gray-300 rounded flex items-center justify-center p-4 cursor-pointer hover:bg-gray-50">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <div className="flex items-center text-gray-500">
                <FaUpload className="w-5 h-5 mr-2 text-gray-400" />
                <span>
                  {selectedImage ? selectedImage.name : "Upload Picture"}
                </span>
              </div>
            </label>
            {selectedImage && (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Preview"
                className="mt-2 max-h-40 object-contain rounded"
              />
            )}
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
                className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-800 mb-2">End Date</label>
              <input
                type="date"
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
              onClick={handleCancel2}
              className="py-2 px-4 rounded-lg bg-green-600 text-white"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function AdCard({ campaign }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("Electronics");

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
    name: "Category Image.Png",
    url: "/placeholder.svg",
  });
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage({
        name: file.name,
        url: "/placeholder.svg",
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

        <img
          src={campaign.image}
          alt={campaign.title}
          className="w-full rounded-lg"
        />
      </div>

      <div className="grid grid-cols-2 text-center p-5 mt-5">
        <div className="flex flex-col">
          <span className="text-xl text-gray-800 mb-2 flex justify-start text-start">
            Start day
          </span>
          <span className="text-lg text-gray-800 flex justify-start text-start">
            {campaign.startDate}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl text-gray-800 mb-2 flex justify-end text-end">
            End day
          </span>
          <span className="text-lg text-gray-800 flex justify-end text-end">
            {campaign.endDate}
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
          <h2 className="text-2xl font-bold text-center mb-2">
            Update Category
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Edit the category information as needed. Your changes will reflect
            across all associated listings.
          </p>

          {/* Upload section */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Upload Post Image
            </label>
            <div className="border border-gray-300 rounded-md p-4 flex items-center justify-center">
              <label className="cursor-pointer text-gray-400">
                <div className="flex items-center gap-2 text-blue-500">
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
            </div>
          </div>

          {/* Image preview */}
          {uploadedImage.name && (
            <div className="border border-gray-300 rounded-md p-2 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded overflow-hidden bg-gray-100">
                  <img
                    src={img2}
                    alt="Category"
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-gray-400">{uploadedImage.name}</span>
              </div>

              <button
                onClick={handleRemoveImage}
                className="p-2 text-red-500 hover:text-red-700"
              >
                <FaTrashAlt size={18} className="text-red-500" />
              </button>
            </div>
          )}

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
