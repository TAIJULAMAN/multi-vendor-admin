/* eslint-disable react/prop-types */
import { ConfigProvider, Table } from "antd";
import { MdBlockFlipped } from "react-icons/md";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { BsPatchCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const RecentSellerRequests = ({ showModal }) => {
  const dataSource = [
    {
      key: "1",
      no: "1",
      sellerName: "Shah Aman",
      shopName: "Shop A",
      email: "johndoe@example.com",
      productCategory: "Electronics",
      phoneNumber: "johndoe@example.com",
      Distribution: "New York, USA",
      BusinessAddress: "123 Main St, New York, NY 10001",
    },
    {
      key: "2",
      no: "2",
      sellerName: "Maria Lopez",
      shopName: "Shop B",
      email: "maria@example.com",
      productCategory: "Fashion",
      phoneNumber: "maria@example.com",
      Distribution: "Los Angeles, USA",
      BusinessAddress: "456 Oak St, Los Angeles, CA 90001",
    },
    {
      key: "3",
      no: "3",
      sellerName: "John Smith",
      shopName: "Shop C",
      email: "john@example.com",
      productCategory: "Home & Garden",
      phoneNumber: "john@example.com",
      Distribution: "Chicago, USA",
      BusinessAddress: "789 Pine St, Chicago, IL 60601",
    },
    {
      key: "4",
      no: "4",
      sellerName: "Emily Davis",
      shopName: "Shop D",
      email: "emily@example.com",
      productCategory: "Health & Beauty",
      phoneNumber: "emily@example.com",
      Distribution: "San Francisco, USA",
      BusinessAddress: "101 Maple St, San Francisco, CA 94101",
    },
    {
      key: "5",
      no: "5",
      sellerName: "David Brown",
      shopName: "Shop E",
      email: "david@example.com",
      productCategory: "Sports & Outdoors",
      phoneNumber: "david@example.com",
      Distribution: "Houston, USA",
      BusinessAddress: "202 Birch St, Houston, TX 77001",
    }
  ];

  const columns = [
    { title: "No", dataIndex: "no", key: "no" },
    {
      title: "Seller Name",
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
    { title: "Shop Name", dataIndex: "shopName", key: "shopName" },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Product Category",
      dataIndex: "productCategory",
      key: "productCategory",
    },
    { title: "Distribution", dataIndex: "Distribution", key: "Distribution" },
    { title: "Location", dataIndex: "BusinessAddress", key: "BusinessAddress" },
    {
      title: "Action",
      key: "action",
      render: () => {
        return (
          <div className="flex gap-2">
            <button className="border border-[#14803c] rounded-lg p-2 bg-[#d3e8e6] text-[#14803c] hover:bg-[#b4d9d4] transition duration-200">
              <BsPatchCheckFill className="w-6 h-6 text-[#14803c]" />
            </button>
            <Link to="/chat">
              <button className="border border-[#14803c] rounded-lg p-2 bg-[#d3e8e6] text-[#14803c] hover:bg-[#b4d9d4] transition duration-200">
                <IoChatbubbleEllipsesOutline className="w-6 h-6 text-[#14803c]" />
              </button>
            </Link>
            <button className="border border-[#14803c] text-[#14803c] rounded-lg p-2 bg-[#d3e8e6] hover:bg-[#b4d9d4] transition duration-200">
              <MdBlockFlipped
                onClick={showModal}
                className="w-6 h-6 text-[#14803c]"
              />
            </button>
          </div>
        );
      },
    },
  ];

  return (
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
        pagination={false}
        scroll={{ x: "max-content" }}
      />
    </ConfigProvider>
  );
};

export default RecentSellerRequests;
