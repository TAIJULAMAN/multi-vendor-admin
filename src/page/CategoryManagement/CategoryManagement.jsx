import { ConfigProvider, Table } from "antd";
import { IoSearch } from "react-icons/io5";
import PageHeading from "../../shared/PageHeading";
import { CiEdit } from "react-icons/ci";
import { AiOutlineEye } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddEditCategoryModal from "./CategoryModals/AddEditCategoryModal";
import BlockInfoModal from "./CategoryModals/BlockInfoModal";
import DeleteCategoryModal from "./CategoryModals/DeleteCategoryModal";

import {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../Redux/api/category/categoryApi";

export default function CategoryManagement() {
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
    } finally {
      setIsModalOpen(false);
      setDeletingRecord(null);
    }
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

  const { data: categoriesData } = useGetAllCategoriesQuery();
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
    categoryId: item?.categoryId,
  }));

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
                    categoryId: record.id,
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
      return;
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
    } catch (e) {}
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
        <AddEditCategoryModal
          open={addModalOpen}
          mode={modalMode}
          categoryName={categoryName}
          setCategoryName={setCategoryName}
          categoryDescription={categoryDescription}
          setCategoryDescription={setCategoryDescription}
          onCancel={() => setAddModalOpen(false)}
          onSave={handleSaveCategory}
          loading={isCreating || isUpdating}
        />
        <BlockInfoModal
          open={isBlockModalOpen}
          onClose={() => setIsBlockModalOpen(false)}
          message={blockMessage}
        />
        <DeleteCategoryModal
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onConfirm={handleOk}
          loading={isDeleting}
        />
      </ConfigProvider>
    </>
  );
}
