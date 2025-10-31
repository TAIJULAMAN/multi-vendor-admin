import { ConfigProvider, Table, Modal } from "antd";
import { BsPatchCheckFill } from "react-icons/bs";
import { MdBlockFlipped } from "react-icons/md";
import PageHeading from "../../shared/PageHeading";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useApproveSellerMutation,
} from "../../Redux/api/seller/sellerApi";
import { IoSearch, IoChatbubbleEllipsesOutline } from "react-icons/io5";
import Loader from "../../components/common/Loader";
import { useBlockUserMutation, useGetAllUsersQuery } from "../../Redux/api/user/userApi";

const SellerManagement = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { data: users, isFetching } = useGetAllUsersQuery({
    page: 1,
    limit: 100000,
  });
  console.log("users", users);
  const sellerList =
    users?.data?.users?.filter((u) => {
      const role = (u?.role || u?.userRole || u?.type || "")
        .toString()
        .toLowerCase()
        .trim();
      return role === "seller";
    }) || [];
  const [blockUser, { isLoading: isBlocking }] = useBlockUserMutation();

  const [approveSeller, { isLoading: isApproving }] =
    useApproveSellerMutation();

  const handleApprove = async (userId) => {
    try {
      if (!userId) return;
      const response = await approveSeller(userId).unwrap();
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: response?.message || "Seller approved successfully",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Approval Failed",
        text: error?.data?.message || "Failed to approve seller",
      });
    }
  };



  // Block modal handlers
  const showModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    try {
      if (!selectedUser?.id) return;
      await blockUser({
        id: selectedUser.id,
        isBlocked: !selectedUser.isBlocked,
      }).unwrap();
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: selectedUser.isBlocked ? "Seller unblocked successfully" : "Seller blocked successfully",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Block Failed",
        text: error?.data?.message || "Failed to block/unblock seller",
      });
    } finally {
      setIsModalOpen(false);
      setSelectedUser(null);
    }
  };

  const searchTerm = search.trim().toLowerCase();
  const filteredSellers = (sellerList || []).filter((seller) => {
    if (!searchTerm) return true;
    const sellerName = (seller?.name || "").toString().toLowerCase();
    return sellerName.includes(searchTerm);
  });

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedSellers = filteredSellers.slice(startIndex, endIndex);
  const totalItems = filteredSellers.length;

  const dataSource = paginatedSellers?.map((seller, index) => ({
    key: startIndex + index + 1,
    no: startIndex + index + 1,
    id: seller?._id,
    email: seller?.email,
    userName: seller?.name,
    phone: seller?.phone,
    country: seller?.country,
    isBlocked: seller?.isBlocked,
    shopName: seller?.sellerProfile?.shopName || "N/A",
    businessType: seller?.businessType || "N/A",
    distribution: seller?.distributionType || "N/A",
    businessAddress: seller?.businessAddress || seller?.country || "N/A",
    status: seller?.sellerProfile?.status || "N/A",
  }));

  useEffect(() => {
    setPage(1);
  }, [search]);

  if (isFetching || isApproving || isBlocking) {
    return <Loader />
  }

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
      dataIndex: "businessAddress",
      key: "businessAddress",
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
              onClick={() => handleApprove(record.id)}
              disabled={isApproving || record.status === "approved"}
              className={`rounded-lg p-2 transition duration-200 ${record.status === "approved"
                ? "border border-[#14803c] bg-[#d3e8e6] text-[#14803c]"
                : "border border-[#EF4444] bg-[#FEE2E2] text-[#EF4444]"
                } ${record.status === "approved" ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              <BsPatchCheckFill
                className={`w-6 h-6 ${record.status === "approved"
                  ? "text-[#14803c]"
                  : "text-[#EF4444]"
                  }`}
              />
            </button>

            <Link to="/chat">
              <button className="border border-[#14803c] rounded-lg p-2 bg-[#d3e8e6] text-[#14803c] hover:bg-[#b4d9d4] transition duration-200">
                <IoChatbubbleEllipsesOutline className="w-6 h-6 text-[#14803c]" />
              </button>
            </Link>
            <button
              onClick={() => showModal(record)}
              disabled={isBlocking}
              className={`rounded-lg p-2 transition duration-200 ${
                record.isBlocked
                  ? "border border-[#EF4444] bg-[#FEE2E2] text-[#EF4444]"
                  : "border border-[#14803c] bg-[#d3e8e6] text-[#14803c]"
              } ${isBlocking ? "opacity-60 cursor-not-allowed" : "hover:bg-[#b4d9d4]"}`}
            >
              <MdBlockFlipped className={`w-6 h-6 ${
                record.isBlocked ? "text-[#EF4444]" : "text-[#14803c]"
              }`} />
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
          pagination={{
            current: page,
            pageSize,
            total: totalItems,
            showSizeChanger: false,
            onChange: (p) => setPage(p),
          }}
          tableLayout="fixed"
          scroll={{ x: true }}
        />
        {/* Block Modal */}
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
              Are you sure you want to {selectedUser?.isBlocked ? "unblock" : "block"} this seller?
            </h1>

            <div className="text-center py-5">
              <button
                onClick={handleOk}
                className="bg-[#14803c] text-white font-semibold w-full py-2 rounded transition duration-200"
              >
                Yes, {selectedUser?.isBlocked ? "Unblock" : "Block"}
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
                No, Don't {selectedUser?.isBlocked ? "Unblock" : "Block"}
              </button>
            </div>
          </div>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default SellerManagement;
