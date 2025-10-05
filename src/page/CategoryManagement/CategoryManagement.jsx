import { ConfigProvider, Modal, Table, Tag } from "antd";
import { IoSearch } from "react-icons/io5";
import PageHeading from "../../shared/PageHeading";
import { CiEdit } from "react-icons/ci";
import { AiOutlineEye } from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { GoPlus } from "react-icons/go";

const CategoryManagement = () => {
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' | 'edit'
  const [editingRecord, setEditingRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel2 = () => {
    setAddModalOpen(false);
  };
  const showModal3 = () => {
    setAddModalOpen(true);
  };

  const [cities, setCities] = useState([{ id: 1, name: "", features: "" }]);

  const handleAddCity = () => {
    const newId =
      cities.length > 0 ? Math.max(...cities.map((city) => city.id)) + 1 : 1;
    setCities([...cities, { id: newId, name: "", features: "" }]);
  };

  const handleClearCity = (id) => {
    setCities(cities.filter((city) => city.id !== id));
  };

  // Open modals
  const openAdd = () => {
    setModalMode("add");
    setEditingRecord(null);
    setCategoryName("");
    setCities([{ id: 1, name: "", features: "" }]);
    setAddModalOpen(true);
  };

  const openEdit = (record) => {
    setModalMode("edit");
    setEditingRecord(record);
    setCategoryName(record.categoryName || "");
    const subs = parseSubCategories(record.subCategoriesName || "");
    const mapped = subs.length
      ? subs.map((s, idx) => ({ id: idx + 1, name: "", features: s }))
      : [{ id: 1, name: "", features: "" }];
    setCities(mapped);
    setAddModalOpen(true);
  };

  const handleSaveCategory = () => {
    const subNames = cities.map((c) => c.features.trim()).filter(Boolean);
    const total = String(subNames.length);
    const subCSV = subNames.join(", ");

    if (modalMode === "edit" && editingRecord) {
      setCategories((prev) =>
        prev.map((item) =>
          item.no === editingRecord.no
            ? {
                ...item,
                categoryName,
                subCategoriesName: subCSV,
                totalSubCategories: total,
              }
            : item
        )
      );
    } else {
      setCategories((prev) => {
        const nextNo = String(
          prev.length > 0 ? Math.max(...prev.map((p) => Number(p.no))) + 1 : 1
        );
        const nextKey = nextNo;
        return [
          ...prev,
          {
            key: nextKey,
            no: nextNo,
            categoryName,
            totalSubCategories: total,
            subCategoriesName: subCSV,
          },
        ];
      });
    }

    setAddModalOpen(false);
  };

  const [categories, setCategories] = useState([
    {
      key: "1",
      no: "1",
      categoryName: "Women",
      totalSubCategories: "7",

      subCategoriesName:
        "Clothing, Dresses, Top Brand, Pants & Jeans, Shoes & Accessories, Beauty, Accessories",
    },
    {
      key: "2",
      no: "2",
      categoryName: "Men",
      totalSubCategories: "7",
      subCategoriesName:
        "Clothing, Suits & Blazers, Jeans, Shoes, Accessories, Watches, Sportswear",
    },
    {
      key: "3",
      no: "3",
      categoryName: "Kids",
      totalSubCategories: "7",
      subCategoriesName:
        "Tops, Bottoms, Dresses, Shoes, Accessories, Outerwear, Toys & Games",
    },
    {
      key: "4",
      no: "4",
      categoryName: "Home",
      totalSubCategories: "7",
      subCategoriesName:
        "Furniture, Kitchen, Bedding, Decor, Lighting, Appliances, Storage",
    },
    {
      key: "5",
      no: "5",
      categoryName: "Electronics",
      totalSubCategories: "7",
      subCategoriesName:
        "Smartphones, Laptops, Tablets, Accessories, Wearables, Audio, Cameras",
    },
    {
      key: "6",
      no: "6",
      categoryName: "Beauty",
      totalSubCategories: "7",
      subCategoriesName:
        "Skincare, Makeup, Haircare, Fragrances, Tools & Brushes, Health & Wellness",
    },
    {
      key: "7",
      no: "7",
      categoryName: "Sports",
      totalSubCategories: "7",
      subCategoriesName:
        "Clothing, Footwear, Accessories, Equipment, Outdoor, Fitness Gear",
    },
    {
      key: "8",
      no: "8",
      categoryName: "Toys & Games",
      totalSubCategories: "7",
      subCategoriesName:
        "Board Games, Action Figures, Dolls, Building Blocks, Educational Toys",
    },
    {
      key: "9",
      no: "9",
      categoryName: "Books",
      totalSubCategories: "7",
      subCategoriesName:
        "Fiction, Non-Fiction, Children's Books, Textbooks, E-books, Audiobooks",
    },
    {
      key: "10",
      no: "10",
      categoryName: "Food & Drink",
      totalSubCategories: "7",
      subCategoriesName:
        "Snacks, Beverages, Groceries, Organic, Gourmet, Health Foods",
    },
    {
      key: "11",
      no: "11",
      categoryName: "Health",
      totalSubCategories: "7",
      subCategoriesName:
        "Supplements, Wellness, Medical Equipment, Personal Care, Fitness",
    },
    {
      key: "12",
      no: "12",
      categoryName: "Automotive",
      totalSubCategories: "7",
      subCategoriesName:
        "Parts, Accessories, Tires, Tools, Car Electronics, Maintenance",
    },
    {
      key: "13",
      no: "13",
      categoryName: "Books",
      totalSubCategories: "7",
      subCategoriesName:
        "Cookbooks, Self-Help, Fiction, History, Science, Graphic Novels",
    },
    {
      key: "14",
      no: "14",
      categoryName: "Garden",
      totalSubCategories: "7",
      subCategoriesName:
        "Plants, Furniture, Outdoor Decor, Tools, Outdoor Lighting, Planters",
    },
    {
      key: "15",
      no: "15",
      categoryName: "Pets",
      totalSubCategories: "7",
      subCategoriesName:
        "Food, Accessories, Toys, Health, Bedding, Training, Grooming",
    },
    {
      key: "16",
      no: "16",
      categoryName: "Office Supplies",
      totalSubCategories: "6",
      subCategoriesName:
        "Furniture, Stationery, Printers, Organizers, Technology, Office Decor",
    },
    {
      key: "17",
      no: "17",
      categoryName: "Music",
      totalSubCategories: "5",
      subCategoriesName:
        "Instruments, Audio Equipment, Vinyl Records, Music Gear, Sheet Music",
    },
    {
      key: "18",
      no: "18",
      categoryName: "Travel",
      totalSubCategories: "5",
      subCategoriesName:
        "Luggage, Travel Accessories, Outdoor Gear, Maps, Vacation Packages",
    },
    {
      key: "19",
      no: "19",
      categoryName: "Art & Crafts",
      totalSubCategories: "6",
      subCategoriesName:
        "Painting, Drawing, DIY Kits, Sculpture, Craft Supplies, Fabric & Sewing",
    },
    {
      key: "20",
      no: "20",
      categoryName: "Technology",
      totalSubCategories: "6",
      subCategoriesName:
        "Computers, Smartphones, Gadgets, VR, Smart Home, 3D Printing",
    },
  ]);

  // Helpers
  const parseSubCategories = (csv) =>
    (csv || "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  const handleCityChange = (id, value) => {
    setCities((prev) =>
      prev.map((c) => (c.id === id ? { ...c, features: value } : c))
    );
  };

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
                navigate(`/category-management/${record.no}/sub-categories`, {
                  state: {
                    categoryId: record.no,
                    categoryName: record.categoryName,
                    subCategoriesName: record.subCategoriesName,
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
              onClick={showModal}
              className="border border-[#14803c] text-[#14803c] rounded-lg p-2 bg-[#d3e8e6] hover:bg-[#b4d9d4] transition duration-200"
            >
              <RiDeleteBin6Line className="w-6 h-6 text-[#14803c]" />
            </button>
          </div>
        );
      },
    },
  ];

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
          dataSource={categories}
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
            <div className="space-y-4">
              {cities.map((city, index) => (
                <div key={city.id} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="font-medium">
                      Sub Categories {String(index + 1).padStart(2, "0")}
                    </label>
                    <button
                      onClick={() => handleClearCity(city.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <RxCross2 className="h-4 w-4" />
                    </button>
                  </div>
                  <input
                    placeholder={`Features ${String(index + 1).padStart(
                      2,
                      "0"
                    )}`}
                    className="w-full border rounded-md p-2"
                    value={city.features}
                    onChange={(e) => handleCityChange(city.id, e.target.value)}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end items-center my-4 text-white">
              <div className="flex justify-center items-center text-center">
                <button
                  onClick={handleAddCity}
                  className="rounded-full bg-green-600  text-white p-2"
                >
                  <GoPlus className="h-5 w-5" />
                </button>
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
                onClick={handleSaveCategory}
                className="py-2 px-4 rounded-lg bg-green-600 text-white"
              >
                Save
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
                className="bg-[#14803c] text-white font-semibold w-full py-2 rounded transition duration-200"
              >
                Yes,Delete
              </button>
            </div>
            <div className="text-center pb-5">
              <button
                onClick={handleOk}
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
