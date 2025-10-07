import { Table, ConfigProvider, Tag, Modal } from "antd";
import PageHeading from "../../shared/PageHeading";
import { useLocation, useParams } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import {
  useGetAllSubCategoriesQuery,
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
} from "../../Redux/api/subcategory/subcategoryApi";

const SubCategory = () => {
  const { state } = useLocation();
  const { id } = useParams();
  console.log("state", state);

  const categoryId = state?.categoryId || id;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' | 'edit'
  const [currentValue, setCurrentValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Fetch subcategories from API for the given categoryId
  const { data, isLoading, isError, error } = useGetAllSubCategoriesQuery(
    { categoryId: categoryId || state?.categoryId || id },
    { skip: !categoryId && !state?.categoryId && !id }
  );
  console.log("subCategories of sub category", data);

  // Mutations
  const [createSubCategory, { isLoading: isCreating }] =
    useCreateSubCategoryMutation();
  const [updateSubCategory, { isLoading: isUpdating }] =
    useUpdateSubCategoryMutation();
  const [deleteSubCategory, { isLoading: isDeleting }] =
    useDeleteSubCategoryMutation();

  // const apiListRaw = data?.data?.subcategories ?? [];


  // Modal helpers
  const openAdd = () => {
    setModalMode("add");
    setCurrentValue("");
    setEditingIndex(null);
    setIsModalOpen(true);
  };

  const openEdit = (index, value, id) => {
    setModalMode("edit");
    setCurrentValue(value);
    setEditingIndex(id ?? index);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    const value = currentValue.trim();
    if (!value || !categoryId) {
      setIsModalOpen(false);
      return;
    }
    try {
      if (modalMode === "edit" && editingIndex) {
        await updateSubCategory({
          id: editingIndex,
          body: { name: value },
        }).unwrap();
      } else {
        await createSubCategory({ name: value, parent: categoryId }).unwrap();
      }
    } catch (_) {
      // optionally handle error UI
    } finally {
      setIsModalOpen(false);
      setCurrentValue("");
      setEditingIndex(null);
    }
  };

  // Delete flow
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const openDelete = (id) => {
    setPendingDeleteId(id);
    setIsDeleteOpen(true);
  };
  const handleConfirmDelete = async () => {
    try {
      if (pendingDeleteId) {
        await deleteSubCategory(pendingDeleteId).unwrap();
      }
    } catch (_) {
      // optionally handle error UI
    } finally {
      setIsDeleteOpen(false);
      setPendingDeleteId(null);
    }
  };
  const handleCancelDelete = () => {
    setIsDeleteOpen(false);
    setPendingDeleteId(null);
  };

  // Build table data from API
  const dataSource = data?.data?.subcategories?.map((item, index) => ({
    key: String(item?.id || item?._id || index + 1),
    no: String(index + 1),
    id: item?.id,
    subCategoryName: item?.name || "",
  }));

  const columns = [
    { title: "No", dataIndex: "no", key: "no", width: 80 },
    {
      title: "Sub Category",
      dataIndex: "subCategoryName",
      key: "subCategoryName",
      render: (text) => <Tag color="green">{text}</Tag>,
    },
    {
      title: "Action",
      key: "action",
      width: 160,
      render: (_, record) => (
        <div className="flex gap-2">
          <button
            // onClick={() => openEdit(null, record.subCategoryName, record.id)}
            disabled={isUpdating}
            className={`border border-[#14803c] rounded-lg p-2 bg-[#d3e8e6] text-[#14803c] hover:bg-[#b4d9d4] transition duration-200 ${
              isUpdating ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            <CiEdit className="w-6 h-6 text-[#14803c]" />
          </button>
          <button
            onClick={() => openDelete(record.id)}
            disabled={isDeleting}
            className={`border border-[#14803c] text-[#14803c] rounded-lg p-2 bg-[#d3e8e6] hover:bg-[#b4d9d4] transition duration-200 ${
              isDeleting ? "opacity-60 cursor-not-allowed" : ""
            }`}
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
        <PageHeading title={`Sub Categories`} />
        <div className="flex items-center gap-3">
          <button
            onClick={openAdd}
            disabled={isCreating || isUpdating}
            className={`bg-[#14803c] text-white px-4 py-3 rounded-lg hover:bg-[#14803c]/80 ${
              isCreating || isUpdating ? "opacity-60 cursor-not-allowed" : ""
            }`}
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
          loading={isLoading}
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
              <h2 className="text-2xl font-bold mb-2">
                {modalMode === "edit"
                  ? "Edit Sub Category"
                  : "Add Sub Category"}
              </h2>
              <p className="text-gray-600">
                {modalMode === "edit"
                  ? "Update the sub category name"
                  : "Enter a new sub category name"}
              </p>
            </div>
            <div className="mb-6">
              <label className="block text-gray-800 mb-2">
                Sub Category Name
              </label>
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
