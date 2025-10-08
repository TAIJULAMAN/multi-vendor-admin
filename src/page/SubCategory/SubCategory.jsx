import { Table, ConfigProvider, Modal } from "antd";
import PageHeading from "../../shared/PageHeading";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import {
  useGetAllSubCategoriesQuery,
  useCreateSubCategoryMutation,
} from "../../Redux/api/subcategory/subcategoryApi";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";

const SubCategory = () => {
  const { state } = useLocation();
  // console.log("state", state);

  const categoryId = state?.categoryId;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentValue, setCurrentValue] = useState("");

  // Fetch subcategories from API for the given categoryId
  const { data, isLoading } = useGetAllSubCategoriesQuery({
    categoryId: categoryId,
  });
  // console.log("subCategories of sub category", data);

  const [createSubCategory, { isLoading: isCreating }] =
    useCreateSubCategoryMutation();

  // Modal helpers
  const openAdd = () => {
    setCurrentValue("");
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    const value = currentValue.trim();
    if (!value || !categoryId) {
      setIsModalOpen(false);
      return;
    }
    try {
      await createSubCategory({ name: value, parent: categoryId }).unwrap();
    } catch (_) {
      // optionally handle error UI
    } finally {
      setIsModalOpen(false);
      setCurrentValue("");
    }
  };

  // Build table data from API
  const dataSource =
    data?.data?.subCategories?.map((item, index) => ({
      key: index,
      no: index + 1,
      subCategoryName: item?.name || "No Name",
      id: item?._id,
      categoryId: item?._id,
    })) || [];

  const columns = [
    { title: "No", dataIndex: "no", key: "no", width: 80 },
    {
      title: "Sub Category",
      dataIndex: "subCategoryName",
      key: "subCategoryName",
    },
    {
      title: "Action",
      key: "action",
      width: 160,
      render: (_, record) => (
        <div className="flex gap-2">
          <button
            // onClick={() => openEdit(null, record.subCategoryName, record.id)}
            // disabled={isUpdating}
            className={`border border-[#14803c] rounded-lg p-2 bg-[#d3e8e6] text-[#14803c] hover:bg-[#b4d9d4] transition duration-200 `}
          >
            <CiEdit className="w-6 h-6 text-[#14803c]" />
          </button>
          <button
            onClick={() => openDelete(record.id)}
            // disabled={isDeleting}
            className={`border border-[#14803c] text-[#14803c] rounded-lg p-2 bg-[#d3e8e6] hover:bg-[#b4d9d4] transition duration-200 `}
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
            disabled={isCreating}
            className={`bg-[#14803c] text-white px-4 py-3 rounded-lg hover:bg-[#14803c]/80 ${
              isCreating ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {isCreating ? "Adding..." : "+ Add Sub Category"}
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
        {/* Add Modal */}
        <Modal
          open={isModalOpen}
          centered
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <div className="p-5">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">Add Sub Category</h2>
              <p className="text-gray-600">Enter a new sub category name</p>
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
      </ConfigProvider>
    </>
  );
};

export default SubCategory;
