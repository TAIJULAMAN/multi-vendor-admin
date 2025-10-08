import { ConfigProvider, Modal, Table } from "antd";
import { BsPatchCheckFill } from "react-icons/bs";
import { MdBlockFlipped, MdEdit } from "react-icons/md";
import PageHeading from "../../shared/PageHeading";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useGetAllSellersQuery,
  useApproveSellerMutation,
  useBlockSellerMutation,
  useUpdateSellerProfileMutation,
} from "../../Redux/api/seller/sellerApi";
import { IoSearch, IoChatbubbleEllipsesOutline } from "react-icons/io5";

const SellerManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    shopName: "",
    businessType: "",
    distribution: "",
    description: "",
    country: "",
  });

  const { data: sellers, isLoading } = useGetAllSellersQuery();
  console.log("sellers of sellerManagement",sellers );

  const [approveSeller, { isLoading: isApproving }] =
    useApproveSellerMutation();
  const [blockSeller, { isLoading: isBlocking }] = useBlockSellerMutation();
  const [updateSellerProfile, { isLoading: isUpdating }] =
    useUpdateSellerProfileMutation();

  // Approve handler
  const handleApprove = async (userId) => {
    try {
      if (!userId) return;
      await approveSeller(userId).unwrap();
    } catch (_) {
      // optionally toast
    }
  };

  // Block modal handlers
  const handleOk = async () => {
    try {
      if (!selectedUser) return;
      await blockSeller({
        id: selectedUser.id,
        isBlocked: !selectedUser.isBlocked,
      }).unwrap();
    } catch (_) {
      // optionally toast
    } finally {
      setIsModalOpen(false);
      setSelectedUser(null);
    }
  };

  const showModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Edit seller
  const openEdit = (record) => {
    setSelectedUser(record);
    setEditForm({
      shopName: record?.shopName || "",
      businessType: record?.businessType || "",
      distribution: record?.distribution || "",
      description: record?.description || "",
      country: record?.country || "",
    });
    setIsEditOpen(true);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
    setSelectedUser(null);
  };

  const handleEditSave = async () => {
    try {
      if (!selectedUser?.userId) return;
      const payload = {
        userId: selectedUser.userId,
        shopName: editForm.shopName,
        businessType: editForm.businessType,
        distributionType: editForm.distribution,
        description: editForm.description,
        country: editForm.country,
      };
      await updateSellerProfile(payload).unwrap();
      setIsEditOpen(false);
      setSelectedUser(null);
    } catch (_) {
      // optionally toast
    }
  };

  const dataSource = sellers?.data?.sellers?.map((seller, index) => ({
    key: index + 1,
    no: index + 1,
    businessType: seller?.businessType,
    logo: seller?.logoUrl,
    shopName: seller?.shopName,
    email: seller?.email,
    distribution: seller?.distributionType,
    description: seller?.description,
    status: seller?.status,
    country: seller?.user?.country,
    email: seller?.user?.email,
    userImage: seller?.user?.image,
    userName: seller?.user?.name,
    userId: seller?.user?.id || seller?.user?._id,
    isBlocked: seller?.isBlocked,
  }));

  const columns = [
    { title: "No", dataIndex: "no", key: "no", width: 60, ellipsis: true },
    {
      title: "Seller Name",
      key: "sellerName",
      width: 200,
      ellipsis: true,
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <span className="truncate max-w-[140px]" title={record.userName}>
            {record.userName}
          </span>
        </div>
      ),
    },
    {
      title: "Shop Name",
      dataIndex: "shopName",
      key: "shopName",
      width: 150,
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 220,
      ellipsis: true,
    },
    {
      title: "Distribution",
      dataIndex: "distribution",
      key: "distribution",
      width: 180,
      ellipsis: true,
    },
    {
      title: "Location",
      dataIndex: "country",
      key: "country",
      width: 240,
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 120,
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      width: 180,
      render: (_, record) => {
        return (
          <div className="flex gap-2">
            <button
              onClick={() => handleApprove(record.userId)}
              disabled={isApproving}
              className={`rounded-lg p-2 transition duration-200 ${
                record.status === "approved"
                  ? "border border-[#14803c] bg-[#d3e8e6] text-[#14803c]"
                  : "border border-[#EF4444] bg-[#EF4444] text-[#EF4444]"
              }`}
            >
              <BsPatchCheckFill
                className={`w-6 h-6 ${
                  record.status === "approved"
                    ? "text-[#14803c]"
                    : "text-[#EF4444]"
                }`}
              />
            </button>
            <button
              onClick={() => openEdit(record)}
              className="border border-[#14803c] rounded-lg p-2 bg-[#d3e8e6] text-[#14803c] hover:bg-[#b4d9d4] transition duration-200"
            >
              <MdEdit className="w-6 h-6 text-[#14803c]" />
            </button>
            <Link to="/chat">
              <button className="border border-[#14803c] rounded-lg p-2 bg-[#d3e8e6] text-[#14803c] hover:bg-[#b4d9d4] transition duration-200">
                <IoChatbubbleEllipsesOutline className="w-6 h-6 text-[#14803c]" />
              </button>
            </Link>
            <button
              onClick={() => showModal(record)}
              disabled={isBlocking}
              className={`border border-[#14803c] text-[#14803c] rounded-lg p-2 bg-[#d3e8e6] hover:bg-[#b4d9d4] transition duration-200 ${
                isBlocking ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              <MdBlockFlipped className="w-6 h-6 text-[#14803c]" />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="my-5 md:my-10 flex flex-col md:flex-row gap-5 justify-between items-center">
        <PageHeading title="Seller Management" />
        <div className="flex flex-col md:flex-row gap-5 items-center justify-between">
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
        </div>
      </div>
      <ConfigProvider
        theme={{
          components: {
            InputNumber: {
              activeBorderColor: "#14803c",
            },
            Pagination: {
              colorPrimaryBorder: "rgb(19,194,194)",
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
          loading={isLoading || isApproving || isBlocking || isUpdating}
          pagination={{ pageSize: 10 }}
          tableLayout="fixed"
          scroll={{ x: true }}
        />
        <Modal
          open={isModalOpen}
          centered
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedUser(null);
          }}
          footer={null}
        >
          <div className="p-5">
            <h1 className="text-4xl text-center text-[#0D0D0D]">
              Are you sure you want to block ?
            </h1>

            <div className="text-center py-5">
              <button
                onClick={handleOk}
                className="bg-[#14803c] text-white font-semibold w-full py-2 rounded transition duration-200"
              >
                Yes,Block
              </button>
            </div>
            <div className="text-center pb-5">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedUser(null);
                }}
                className="text-[#14803c] border-2 border-green-600 bg-white font-semibold w-full py-2 rounded transition duration-200"
              >
                No,Don’t Block
              </button>
            </div>
          </div>
        </Modal>
        {/* Edit Modal */}
        <Modal open={isEditOpen} centered onCancel={closeEdit} footer={null}>
          <div className="p-5">
            <h2 className="text-2xl font-bold mb-4">Edit Seller Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Shop Name</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={editForm.shopName}
                  onChange={(e) =>
                    setEditForm({ ...editForm, shopName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Business Type</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={editForm.businessType}
                  onChange={(e) =>
                    setEditForm({ ...editForm, businessType: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Distribution Type</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={editForm.distribution}
                  onChange={(e) =>
                    setEditForm({ ...editForm, distribution: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Location</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={editForm.country}
                  onChange={(e) =>
                    setEditForm({ ...editForm, country: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Description</label>
                <textarea
                  className="w-full border rounded p-2"
                  rows={4}
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <button
                onClick={closeEdit}
                className="py-2 px-4 rounded-lg border border-[#EF4444] bg-red-50"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                disabled={isUpdating}
                className={`py-2 px-4 rounded-lg bg-green-600 text-white ${
                  isUpdating ? "opacity-60 cursor-not-allowed" : ""
                }`}
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

export default SellerManagement;
