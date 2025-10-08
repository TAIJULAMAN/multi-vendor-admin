import { Modal } from "antd";
import { FaTrashAlt, FaUpload } from "react-icons/fa";

export default function EditAdModal({
  open,
  onCancel,
  title,
  setTitle,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  uploadedImage,
  onImageUpload,
  onRemoveImage,
  onSave,
  loading,
}) {
  return (
    <Modal open={open} centered onCancel={onCancel} footer={null}>
      <div className="p-5">
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

        {/* Title */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Advertisement Name
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex flex-col">
            <label className="block text-gray-700 font-medium mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="block text-gray-700 font-medium mb-2">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-red-200 bg-red-50 text-red-500 rounded-md hover:bg-red-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={loading}
            className={`px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors ${
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
