import { ConfigProvider, Modal, Table, Tag } from "antd";
import { IoSearch } from "react-icons/io5";
import PageHeading from "../../shared/PageHeading";
import { CiEdit } from "react-icons/ci";
import { AiOutlineEye } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../Redux/api/category/categoryApi";

const CategoryManagement = () => {
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [editingRecord, setEditingRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingRecord, setDeletingRecord] = useState(null);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [blockMessage, setBlockMessage] = useState("");

  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const handleOk = async () => {
    if (!deletingRecord?.id) {
      setIsModalOpen(false);
      return;
    }
    try {
      await deleteCategory(deletingRecord.id).unwrap();
    } catch (_) {
      // optionally handle error UI
    } finally {
      setIsModalOpen(false);
      setDeletingRecord(null);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal = (record) => {
    if ((record?.subCategories ?? record?.totalSubCategories ?? 0) > 0) {
      setBlockMessage("Please delete all associated subcategories first.");
      setIsBlockModalOpen(true);
      return;
    }
    setDeletingRecord(record);
    setIsModalOpen(true);
  };
  const handleCancel2 = () => {
    setAddModalOpen(false);
  };

  const { data: categoriesData } = useGetAllCategoriesQuery();
  console.log("categories from CategoryManagement", categoriesData);
  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();

  const dataSource = categoriesData?.data?.categories?.map((item, index) => ({
    key: index,
    no: index + 1,
    id: item?._id || item?.id,
    categoryName: item?.name,
    totalSubCategories: item?.subCategories?.length,
    description: item?.description,
    createdAt: item?.createdAt,
    updatedAt: item?.updatedAt,
    subCategories: item?.subCategories?.length,
  }));
  console.log("dataSource of CategoryManagement", dataSource);

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: 200,
      align: "center",
      ellipsis: true,
    },
    {
      title: "Category Name",
      key: "categoryName",
      width: 500,
      dataIndex: "categoryName",

      ellipsis: true,
      render: (text) => (
        <span className="truncate block" title={text}>
          {text}
        </span>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 500,
      align: "center",
      ellipsis: true,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 500,
      align: "center",
      ellipsis: true,
      render: (value) => {
        if (!value) return "-";
        try {
          const d = new Date(value);
          return d.toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "2-digit",
          });
        } catch {
          return String(value);
        }
      },
    },
    {
      title: "Total Sub Categories",
      dataIndex: "totalSubCategories",
      key: "totalSubCategories",
      width: 500,
      align: "center",
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      width: 200,
      render: (_, record) => {
        return (
          <div className="flex gap-2">
            <button
              onClick={() =>
                navigate(`/category-management/${record.id}/sub-categories`, {
                  state: {
                    categoryId: record.id
                  },
                })
              }
              className="border border-[#14803c] rounded-lg p-2 bg-[#d3e8e6] text-[#14803c] hover:bg-[#b4d9d4] transition duration-200"
            >
              <AiOutlineEye className="w-6 h-6 text-[#14803c]" />
            </button>
            <button
              onClick={() => openEdit(record)}
              className="border border-[#14803c] rounded-lg p-2 bg-[#d3e8e6] text-[#14803c] hover:bg-[#b4d9d4] transition duration-200"
            >
              <CiEdit className="w-6 h-6 text-[#14803c]" />
            </button>
            <button
              onClick={() => showModal(record)}
              className="border border-[#14803c] text-[#14803c] rounded-lg p-2 bg-[#d3e8e6] hover:bg-[#b4d9d4] transition duration-200"
            >
              <RiDeleteBin6Line className="w-6 h-6 text-[#14803c]" />
            </button>
          </div>
        );
      },
    },
  ];

  // Open modals
  const openAdd = () => {
    setModalMode("add");
    setEditingRecord(null);
    setCategoryName("");
    setCategoryDescription("");
    setAddModalOpen(true);
  };

  const openEdit = (record) => {
    setModalMode("edit");
    setEditingRecord(record);
    setCategoryName(record.categoryName || "");
    setCategoryDescription(record.description || "");
    setAddModalOpen(true);
  };

  const handleSaveCategory = async () => {
    if (!categoryName?.trim()) {
      return; // optionally show validation message
    }
    try {
      if (modalMode === "edit" && editingRecord?.id) {
        await updateCategory({
          id: editingRecord.id,
          body: {
            name: categoryName.trim(),
            description: categoryDescription?.trim() || "",
          },
        }).unwrap();
      } else {
        await createCategory({
          name: categoryName.trim(),
          description: categoryDescription?.trim() || "",
        }).unwrap();
      }
      setAddModalOpen(false);
      setCategoryName("");
      setCategoryDescription("");
    } catch (e) {
      // optionally handle error UI
    }
  };

  return (
    <>
      <div className="my-5 md:my-10 flex flex-col md:flex-row gap-5 justify-between items-center">
        <PageHeading title="Category Management" />
        <div className="flex flex-col md:flex-row gap-5 justify-between items-center">
          <div className="relative w-full sm:w-[300px] mt-5 md:mt-0 lg:mt-0">
            <input
              type="text"
              placeholder="Search..."
              className="border-2 border-[#14803c] py-3 pl-12 pr-[65px] outline-none w-full rounded-md"
            />
            <span className=" text-gray-600 absolute top-0 left-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer">
              <IoSearch className="text-[1.3rem]" />
            </span>
          </div>
          <div>
            <button
              onClick={openAdd}
              className="bg-[#14803c] text-white px-4 py-3 rounded-lg hover:bg-[#14803c]/80"
            >
              + Add Category
            </button>
          </div>
        </div>
      </div>
      <ConfigProvider
        theme={{
          components: {
            InputNumber: {
              activeBorderColor: "#14803c",
            },
            Pagination: {
              colorPrimaryBorder: "rgb(82,196,26))",
              colorBorder: "rgb(82,196,26)",
              colorTextPlaceholder: "rgb(82,196,26)",
              colorTextDisabled: "rgb(82,196,26)",
              colorBgTextActive: "rgb(82,196,26)",
              itemActiveBgDisabled: "rgb(82,196,26)",
              itemActiveColorDisabled: "rgb(0,0,0)",
              itemBg: "rgb(82,196,26)",
              colorBgTextHover: "rgb(82,196,26)",
              colorPrimary: "rgb(82,196,26)",
              colorPrimaryHover: "rgb(82,196,26)",
            },
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
          tableLayout="fixed"
          scroll={{ x: true }}
        />
        <Modal
          open={addModalOpen}
          centered
          onCancel={handleCancel2}
          footer={null}
        >
          <div className="p-5">
            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">
                {modalMode === "edit" ? "Edit Category" : "Add Category"}
              </h2>
              <p className="text-gray-600">
                {modalMode === "edit"
                  ? "Edit the category details below"
                  : "Add a new category below"}
              </p>
            </div>

            {/* Category Name Input */}
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
            {/* buttons */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <button
                onClick={handleCancel2}
                className="py-2 px-4 rounded-lg border border-[#EF4444] bg-red-50"
              >
                Cancel
              </button>

              <button
                onClick={handleSaveCategory}
                disabled={isCreating || isUpdating}
                className={`py-2 px-4 rounded-lg bg-green-600 text-white ${
                  isCreating || isUpdating
                    ? "opacity-60 cursor-not-allowed"
                    : ""
                }`}
              >
                {isCreating || isUpdating ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </Modal>
        <Modal
          open={isBlockModalOpen}
          centered
          onCancel={() => setIsBlockModalOpen(false)}
          footer={null}
        >
          <div className="p-5">
            <h1 className="text-4xl text-center text-[#0D0D0D]">
              {blockMessage ||
                "Please delete all associated subcategories first."}
            </h1>
            <div className="text-center py-5">
              <button
                onClick={() => setIsBlockModalOpen(false)}
                className="bg-[#14803c] text-white font-semibold w-full py-2 rounded transition duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
        <Modal
          open={isModalOpen}
          centered
          onCancel={handleCancel}
          footer={null}
        >
          <div className="p-5">
            <h1 className="text-4xl text-center text-[#0D0D0D]">
              Are you sure you want to Delete ?
            </h1>

            <div className="text-center py-5">
              <button
                onClick={handleOk}
                disabled={isDeleting}
                className={`bg-[#14803c] text-white font-semibold w-full py-2 rounded transition duration-200 ${
                  isDeleting ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
            <div className="text-center pb-5">
              <button
                onClick={handleCancel}
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

export default CategoryManagement;
