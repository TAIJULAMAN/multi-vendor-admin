import { Modal } from "antd";
import { FaTrashAlt, FaUpload } from "react-icons/fa";
import img2 from "../../assets/ads2.png";

export default function AddAdModal({
  open,
  onCancel,
  categoryName,
  setCategoryName,
  uploadedImage,
  onImageUpload,
  onRemoveImage,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onSave,
  loading,
}) {
  return (
    <Modal open={open} centered footer={null} onCancel={onCancel}>
      <div className="p-5">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">Add New Ads</h2>
          <p className="text-gray-600">
            Fill out the details below to add a new ads. This will help users
            organize their listings effectively.
          </p>
        </div>

        {/* Upload Section */}
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
                    onClick={onRemoveImage}
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
                      onChange={onImageUpload}
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
                  onChange={onImageUpload}
                />
              </label>
            )}
          </div>
        </div>

        {/* Category Name Input */}
        <div className="mb-6">
          <label className="block text-gray-800 mb-2">Advertisement Name</label>
          <input
            type="text"
            placeholder="Enter Name here"
            className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>

        {/* Dates */}
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
            onClick={onCancel}
            className="py-2 px-4 rounded-lg border border-[#EF4444] bg-red-50"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            disabled={loading}
            className={`py-2 px-4 rounded-lg bg-green-600 text-white ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
