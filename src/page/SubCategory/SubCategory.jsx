import { Table, ConfigProvider, Tag, Modal } from "antd";
import PageHeading from "../../shared/PageHeading";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";

const SubCategory = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { id } = useParams();

  const categoryId = state?.categoryId || id;
  const categoryName = state?.categoryName || "Category";
  const subCategoriesName = state?.subCategoriesName || "";

  const initialSubCategories = subCategoriesName
    ? subCategoriesName.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  const [subCategories, setSubCategories] = useState(initialSubCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' | 'edit'
  const [currentValue, setCurrentValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [pendingDeleteIndex, setPendingDeleteIndex] = useState(null);

  const openAdd = () => {
    setModalMode("add");
    setCurrentValue("");
    setEditingIndex(null);
    setIsModalOpen(true);
  };

  const openEdit = (index, value) => {
    setModalMode("edit");
    setCurrentValue(value);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    const value = currentValue.trim();
    if (!value) {
      setIsModalOpen(false);
      return;
    }
    if (modalMode === "edit" && editingIndex !== null) {
      setSubCategories((prev) => prev.map((v, i) => (i === editingIndex ? value : v)));
    } else {
      setSubCategories((prev) => [...prev, value]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (index) => {
    setSubCategories((prev) => prev.filter((_, i) => i !== index));
  };

  const openDelete = (index) => {
    setPendingDeleteIndex(index);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (pendingDeleteIndex !== null) {
      handleDelete(pendingDeleteIndex);
    }
    setIsDeleteOpen(false);
    setPendingDeleteIndex(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteOpen(false);
    setPendingDeleteIndex(null);
  };

  const dataSource = subCategories.map((name, index) => ({
    key: String(index + 1),
    no: String(index + 1),
    subCategory: name,
    index,
  }));

  const columns = [
    { title: "No", dataIndex: "no", key: "no", width: 80 },
    {
      title: "Sub Category",
      dataIndex: "subCategory",
      key: "subCategory",
      render: (text) => <Tag color="green">{text}</Tag>,
    },
    {
      title: "Action",
      key: "action",
      width: 160,
      render: (_, record) => (
        <div className="flex gap-2">
          <button
            onClick={() => openEdit(record.index, record.subCategory)}
            className="border border-[#14803c] rounded-lg p-2 bg-[#d3e8e6] text-[#14803c] hover:bg-[#b4d9d4] transition duration-200"
          >
            <CiEdit className="w-6 h-6 text-[#14803c]" />
          </button>
          <button
            onClick={() => openDelete(record.index)}
            className="border border-[#14803c] text-[#14803c] rounded-lg p-2 bg-[#d3e8e6] hover:bg-[#b4d9d4] transition duration-200"
          >
            <RiDeleteBin6Line className="w-6 h-6 text-[#14803c]" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="my-5 md:my-10 flex flex-col md:flex-row gap-5 justify-between items-center">
        <PageHeading title={`Sub Categories - ${categoryName}`} />
        <div className="flex items-center gap-3">
          <button
            onClick={openAdd}
            className="bg-[#14803c] text-white px-4 py-3 rounded-lg hover:bg-[#14803c]/80"
          >
            + Add Sub Category
          </button>
        </div>
      </div>

      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#14803c",
              headerColor: "rgb(255,255,255)",
              cellFontSize: 16,
              headerSplitColor: "#14803c",
            },
          },
        }}
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 10 }}
          locale={{ emptyText: "No sub categories found" }}
        />
        {/* Add/Edit Modal */}
        <Modal
          open={isModalOpen}
          centered
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <div className="p-5">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">{modalMode === 'edit' ? 'Edit Sub Category' : 'Add Sub Category'}</h2>
              <p className="text-gray-600">{modalMode === 'edit' ? 'Update the sub category name' : 'Enter a new sub category name'}</p>
            </div>
            <div className="mb-6">
              <label className="block text-gray-800 mb-2">Sub Category Name</label>
              <input
                type="text"
                placeholder="e.g., Smartphones"
                className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={currentValue}
                onChange={(e) => setCurrentValue(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="py-2 px-4 rounded-lg border border-[#EF4444] bg-red-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="py-2 px-4 rounded-lg bg-green-600 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </Modal>
        {/* Delete Confirm Modal - match CategoryManagement style */}
        <Modal
          open={isDeleteOpen}
          centered
          onCancel={handleCancelDelete}
          footer={null}
        >
          <div className="p-5">
            <h1 className="text-4xl text-center text-[#0D0D0D]">
              Are you sure you want to Delete ?
            </h1>

            <div className="text-center py-5">
              <button
                onClick={handleConfirmDelete}
                className="bg-[#14803c] text-white font-semibold w-full py-2 rounded transition duration-200"
              >
                Yes,Delete
              </button>
            </div>
            <div className="text-center pb-5">
              <button
                onClick={handleCancelDelete}
                className="text-[#14803c] border-2 border-green-600 bg-white font-semibold w-full py-2 rounded transition duration-200"
              >
                No,Don’t Delete
              </button>
            </div>
          </div>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default SubCategory;
