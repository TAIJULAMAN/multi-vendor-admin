import { Modal } from "antd";

export default function AddEditCategoryModal({
  open,
  mode = "add",
  categoryName,
  setCategoryName,
  categoryDescription,
  setCategoryDescription,
  onCancel,
  onSave,
  loading,
}) {
  const isEdit = mode === "edit";
  return (
    <Modal open={open} centered onCancel={onCancel} footer={null}>
      <div className="p-5">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">
            {isEdit ? "Edit Category" : "Add Category"}
          </h2>
          <p className="text-gray-600">
            {isEdit ? "Edit the category details below" : "Add a new category below"}
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-gray-800 mb-2">Catagory Name</label>
          <input
            type="text"
            placeholder="Enter Name here"
            className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-800 mb-2">Description</label>
          <textarea
            rows={4}
            placeholder="Enter Description here"
            className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
          />
        </div>

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
