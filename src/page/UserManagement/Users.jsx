import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdBlockFlipped } from "react-icons/md";
import PageHeading from "../../shared/PageHeading";
import { ConfigProvider, Modal, Table } from "antd";
import { useGetAllUsersQuery, useBlockUserMutation } from "../../Redux/api/user/userApi";

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  console.log("selectedUser", selectedUser);
  const [blockUser, { isLoading: isBlocking }] = useBlockUserMutation();

  const handleOk = async () => {
    if (!selectedUser?.id) {
      setIsModalOpen(false);
      return;
    }
    try {
      await blockUser({ id: selectedUser.id, isBlocked: !selectedUser.isBlocked }).unwrap();
    } catch (_) {
      // optionally handle error UI here
    } finally {
      setIsModalOpen(false);
      setSelectedUser(null);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };
  

  // Request only customers from API if supported
  const { data: users } = useGetAllUsersQuery({ role: "customer" });
  console.log("users from user page", users);

  // Fallback client-side filter to customers if API returns mixed roles
  const customerList = users?.data?.users?.filter((u) => {
    const role = (u?.role || u?.userRole || u?.type || "").toString().toLowerCase();
    return role === "customer";
  }) || users?.data?.users;

  const dataSource = customerList?.map((user, index) => ({
    key: index + 1,
    no: index + 1,
    id: user?.id || user?._id,
    country: user?.country,
    currency: user?.currency,
    email: user?.email,
    name: user?.name,
    phone: user?.phone,
    isBlocked: user?.isBlocked,
  }));

  const columns = [
    { title: "No", dataIndex: "no", key: "no" },
    {
      title: "User Name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          {/* <img
            src={`https://avatar.iran.liara.run/public/${record.no}`}
            className="w-10 h-10 object-cover rounded-full"
            alt="User Avatar"
          /> */}
          <span>{record.name}</span>
        </div>
      ),
    },
    { title: "Phone Number", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Country", dataIndex: "country", key: "country" },
    { title: "Currency", dataIndex: "currency", key: "currency" },
    {
      title: "Status",
      dataIndex: "isBlocked",
      key: "isBlocked",
      render: (v) => (
        <span className={v ? "text-red-600" : ""}>{v ? "Blocked" : "Active"}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <button
          onClick={() => showModal(record)}
          disabled={isBlocking}
          className={` rounded-lg p-2 bg-[#d3e8e6] transition duration-200 ${
            isBlocking ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          <MdBlockFlipped className={`w-6 h-6 ${record?.isBlocked ? "text-red-600 " : "text-[#14803c]"}`} />
        </button>
      ),
    },
  ];

  const showModal = (record) => {
    setSelectedUser(record);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="my-5 md:my-10 flex flex-col md:flex-row gap-5 justify-between items-center">
        <PageHeading title="User Management" />
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
      <ConfigProvider
        theme={{
          components: {
            InputNumber: {
              activeBorderColor: "#14803c",
            },
            Pagination: {
              colorPrimaryBorder: "rgb(82,196,26)",
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
          scroll={{ x: "max-content" }}
        />

        <Modal
          open={isModalOpen}
          centered
          onCancel={handleCancel}
          footer={null}
        >
          <div className="p-5">
            <h1 className="text-4xl text-center text-[#0D0D0D]">
              {selectedUser?.isBlocked ? "Unblock user?" : "Block user?"}
            </h1>

            <div className="text-center py-5">
              <button
                onClick={handleOk}
                disabled={isBlocking}
                className={`bg-[#14803c] text-white font-semibold w-full py-2 rounded transition duration-200 ${
                  isBlocking ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {selectedUser?.isBlocked ? "Yes, Unblock" : "Yes, Block"}
              </button>
            </div>
            <div className="text-center pb-5">
              <button
                onClick={handleCancel}
                className="text-[#14803c] border-2 border-green-600 bg-white font-semibold w-full py-2 rounded transition duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default Users;
