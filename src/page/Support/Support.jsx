import { ConfigProvider, Modal, Table } from "antd";
import { IoSearch } from "react-icons/io5";
import PageHeading from "../../shared/PageHeading";
import { FaEye, FaReply } from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";

const Support = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const dataSource = [
    {
      key: "1",
      no: "1",
      sellerName: "Shah Aman",
      Date: "2025-05-01",
      Description: "No-show at scheduled pickup time",
    },
    {
      key: "2",
      no: "2",
      sellerName: "John Doe",
      Date: "2025-05-02",
      Description: "Late delivery of goods",
    },
    {
      key: "3",
      no: "3",
      sellerName: "Alice Johnson",
      Date: "2025-05-03",
      Description: "Product out of stock",
    },
    {
      key: "4",
      no: "4",
      sellerName: "Bob Smith",
      Date: "2025-05-04",
      Description: "Damaged item received",
    },
    {
      key: "5",
      no: "5",
      sellerName: "Emma Brown",
      Date: "2025-05-05",
      Description: "Delayed shipment",
    },
    {
      key: "6",
      no: "6",
      sellerName: "Chris Williams",
      Date: "2025-05-06",
      Description: "Wrong item sent",
    },
    {
      key: "7",
      no: "7",
      sellerName: "David Lee",
      Date: "2025-05-07",
      Description: "Unresponsive customer service",
    },
    {
      key: "8",
      no: "8",
      sellerName: "Sophia Wilson",
      Date: "2025-05-08",
      Description: "Incorrect order details",
    },
    {
      key: "9",
      no: "9",
      sellerName: "James Miller",
      Date: "2025-05-09",
      Description: "Late refund process",
    },
    {
      key: "10",
      no: "10",
      sellerName: "Olivia Moore",
      Date: "2025-05-10",
      Description: "Item not as described",
    },
    {
      key: "11",
      no: "11",
      sellerName: "Liam Taylor",
      Date: "2025-05-11",
      Description: "Packaging issues",
    },
    {
      key: "12",
      no: "12",
      sellerName: "Amelia Anderson",
      Date: "2025-05-12",
      Description: "Order cancellation confusion",
    },
    {
      key: "13",
      no: "13",
      sellerName: "William Jackson",
      Date: "2025-05-13",
      Description: "Poor product quality",
    },
    {
      key: "14",
      no: "14",
      sellerName: "Mia Harris",
      Date: "2025-05-14",
      Description: "Delayed communication on tracking",
    },
    {
      key: "15",
      no: "15",
      sellerName: "Benjamin Clark",
      Date: "2025-05-15",
      Description: "Missing items from order",
    },
    {
      key: "16",
      no: "16",
      sellerName: "Charlotte Lewis",
      Date: "2025-05-16",
      Description: "Wrong billing address",
    },
    {
      key: "17",
      no: "17",
      sellerName: "Elijah Robinson",
      Date: "2025-05-17",
      Description: "No receipt provided",
    },
    {
      key: "18",
      no: "18",
      sellerName: "Harper Walker",
      Date: "2025-05-18",
      Description: "Item failed to arrive",
    },
    {
      key: "19",
      no: "19",
      sellerName: "Henry Hall",
      Date: "2025-05-19",
      Description: "Product mismatch with website",
    },
    {
      key: "20",
      no: "20",
      sellerName: "Evelyn Allen",
      Date: "2025-05-20",
      Description: "Late notification of shipping delay",
    },
  ];

  const columns = [
    { title: "No", dataIndex: "no", key: "no" },
    {
      title: "User Name",
      key: "sellerName",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={`https://avatar.iran.liara.run/public/${record.no}`}
            className="w-10 h-10 object-cover rounded-full"
            alt="User Avatar"
          />
          <span>{record.sellerName}</span>
        </div>
      ),
    },
    { title: "Date", dataIndex: "Date", key: "Date" },
    { title: "Description", dataIndex: "Description", key: "Description" },
    {
      title: "Action",
      key: "action",
      render: () => {
        return (
          <div className="flex gap-2">
            <button
              onClick={showModal}
              className="border border-[#14803c] rounded-lg p-2 bg-[#d3e8e6] text-[#14803c] hover:bg-[#b4d9d4] transition duration-200"
            >
              <FaEye className="w-6 h-6 text-[#14803c]" />
            </button>
            <Link to="/chat">
              <button className="border border-[#14803c] text-[#14803c] rounded-lg p-2 bg-[#d3e8e6] hover:bg-[#b4d9d4] transition duration-200">
                <FaReply className="w-6 h-6 text-[#14803c]" />
              </button>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="my-5 md:my-10 flex flex-col md:flex-row gap-5 justify-between items-center">
        <PageHeading title="Support" />
        <div className="relative w-full sm:w-[300px] mt-5 md:mt-0 lg:mt-0">
          <input
            type="text"
            placeholder="Search..."
            className="border-2 border-orange-500 py-3 pl-12 pr-[65px] outline-none w-full rounded-md"
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
            <h1 className="text-xl text-center text-[#0D0D0D]">Description</h1>

            <p className="text-center text-[#0D0D0D] mt-5">
              Sell Products – List and manage your products seamlessly. Track
              Orders – Get instant notifications for each new order. Access
              Features – Utilize all system features to enhance sales.
            </p>
          </div>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default Support;
