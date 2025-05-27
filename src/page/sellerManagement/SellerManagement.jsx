import { ConfigProvider, Modal, Table } from "antd";
import { MdBlockFlipped } from "react-icons/md";
import { IoChatbubbleEllipsesOutline, IoSearch } from "react-icons/io5";
import { BsPatchCheckFill } from "react-icons/bs";
import PageHeading from "../../shared/PageHeading";
import { useState } from "react";
import { Link } from "react-router-dom";

const SellerManagement = () => {
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
    },
    {
      key: "6",
      no: "6",
      sellerName: "Sophia Green",
      shopName: "Shop F",
      email: "sophia@example.com",
      productCategory: "Health & Beauty",
      phoneNumber: "sophia@example.com",
      Distribution: "Phoenix, USA",
      BusinessAddress: "303 Cedar St, Phoenix, AZ 85001",
    },
    {
      key: "7",
      no: "7",
      sellerName: "James Wilson",
      shopName: "Shop G",
      email: "james@example.com",
      productCategory: "Fashion",
      phoneNumber: "james@example.com",
      Distribution: "Seattle, USA",
      BusinessAddress: "404 Elm St, Seattle, WA 98101",
    },
    {
      key: "8",
      no: "8",
      sellerName: "Olivia Taylor",
      shopName: "Shop H",
      email: "olivia@example.com",
      productCategory: "Electronics",
      phoneNumber: "olivia@example.com",
      Distribution: "Miami, USA",
      BusinessAddress: "505 Willow St, Miami, FL 33101",
    },
    {
      key: "9",
      no: "9",
      sellerName: "Ethan Martinez",
      shopName: "Shop I",
      email: "ethan@example.com",
      productCategory: "Sports & Outdoors",
      phoneNumber: "ethan@example.com",
      Distribution: "Dallas, USA",
      BusinessAddress: "606 Pineapple St, Dallas, TX 75201",
    },
    {
      key: "10",
      no: "10",
      sellerName: "Ava Johnson",
      shopName: "Shop J",
      email: "ava@example.com",
      productCategory: "Home & Garden",
      phoneNumber: "ava@example.com",
      Distribution: "Austin, USA",
      BusinessAddress: "707 Palm St, Austin, TX 73301",
    },
    {
      key: "11",
      no: "11",
      sellerName: "Mason Clark",
      shopName: "Shop K",
      email: "mason@example.com",
      productCategory: "Health & Beauty",
      phoneNumber: "mason@example.com",
      Distribution: "Denver, USA",
      BusinessAddress: "808 Oakwood St, Denver, CO 80201",
    },
    {
      key: "12",
      no: "12",
      sellerName: "Isabella Lewis",
      shopName: "Shop L",
      email: "isabella@example.com",
      productCategory: "Fashion",
      phoneNumber: "isabella@example.com",
      Distribution: "Boston, USA",
      BusinessAddress: "909 Birchwood St, Boston, MA 02101",
    },
    {
      key: "13",
      no: "13",
      sellerName: "Liam Harris",
      shopName: "Shop M",
      email: "liam@example.com",
      productCategory: "Electronics",
      phoneNumber: "liam@example.com",
      Distribution: "Atlanta, USA",
      BusinessAddress: "123 Aspen St, Atlanta, GA 30301",
    },
    {
      key: "14",
      no: "14",
      sellerName: "Charlotte Robinson",
      shopName: "Shop N",
      email: "charlotte@example.com",
      productCategory: "Home & Garden",
      phoneNumber: "charlotte@example.com",
      Distribution: "Philadelphia, USA",
      BusinessAddress: "234 Chestnut St, Philadelphia, PA 19102",
    },
    {
      key: "15",
      no: "15",
      sellerName: "Lucas Walker",
      shopName: "Shop O",
      email: "lucas@example.com",
      productCategory: "Sports & Outdoors",
      phoneNumber: "lucas@example.com",
      Distribution: "Detroit, USA",
      BusinessAddress: "345 Spruce St, Detroit, MI 48201",
    },
    {
      key: "16",
      no: "16",
      sellerName: "Mila Hall",
      shopName: "Shop P",
      email: "mila@example.com",
      productCategory: "Fashion",
      phoneNumber: "mila@example.com",
      Distribution: "Portland, USA",
      BusinessAddress: "456 Fir St, Portland, OR 97201",
    },
    {
      key: "17",
      no: "17",
      sellerName: "Logan Allen",
      shopName: "Shop Q",
      email: "logan@example.com",
      productCategory: "Health & Beauty",
      phoneNumber: "logan@example.com",
      Distribution: "Indianapolis, USA",
      BusinessAddress: "567 Pinewood St, Indianapolis, IN 46201",
    },
    {
      key: "18",
      no: "18",
      sellerName: "Amelia Young",
      shopName: "Shop R",
      email: "amelia@example.com",
      productCategory: "Home & Garden",
      phoneNumber: "amelia@example.com",
      Distribution: "Charlotte, USA",
      BusinessAddress: "678 Cedarwood St, Charlotte, NC 28201",
    },
    {
      key: "19",
      no: "19",
      sellerName: "Henry Scott",
      shopName: "Shop S",
      email: "henry@example.com",
      productCategory: "Electronics",
      phoneNumber: "henry@example.com",
      Distribution: "Minneapolis, USA",
      BusinessAddress: "789 Maplewood St, Minneapolis, MN 55101",
    },
    {
      key: "20",
      no: "20",
      sellerName: "Zoe King",
      shopName: "Shop T",
      email: "zoe@example.com",
      productCategory: "Sports & Outdoors",
      phoneNumber: "zoe@example.com",
      Distribution: "San Diego, USA",
      BusinessAddress: "890 Redwood St, San Diego, CA 92101",
    },
    {
      key: "21",
      no: "21",
      sellerName: "Shah Aman",
      shopName: "Shop A",
      email: "johndoe@example.com",
      productCategory: "Electronics",
      phoneNumber: "johndoe@example.com",
      Distribution: "New York, USA",
      BusinessAddress: "123 Main St, New York, NY 10001",
    },
    {
      key: "22",
      no: "22",
      sellerName: "Maria Lopez",
      shopName: "Shop B",
      email: "maria@example.com",
      productCategory: "Fashion",
      phoneNumber: "maria@example.com",
      Distribution: "Los Angeles, USA",
      BusinessAddress: "456 Oak St, Los Angeles, CA 90001",
    },
    {
      key: "23",
      no: "23",
      sellerName: "John Smith",
      shopName: "Shop C",
      email: "john@example.com",
      productCategory: "Home & Garden",
      phoneNumber: "john@example.com",
      Distribution: "Chicago, USA",
      BusinessAddress: "789 Pine St, Chicago, IL 60601",
    },
    {
      key: "24",
      no: "24",
      sellerName: "Emily Davis",
      shopName: "Shop D",
      email: "emily@example.com",
      productCategory: "Health & Beauty",
      phoneNumber: "emily@example.com",
      Distribution: "San Francisco, USA",
      BusinessAddress: "101 Maple St, San Francisco, CA 94101",
    },
    {
      key: "25",
      no: "25",
      sellerName: "David Brown",
      shopName: "Shop E",
      email: "david@example.com",
      productCategory: "Sports & Outdoors",
      phoneNumber: "david@example.com",
      Distribution: "Houston, USA",
      BusinessAddress: "202 Birch St, Houston, TX 77001",
    },
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
            <button
              onClick={showModal}
              className="border border-[#14803c] text-[#14803c] rounded-lg p-2 bg-[#d3e8e6] hover:bg-[#b4d9d4] transition duration-200"
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
              className="border-2 border-orange-500 py-3 pl-12 pr-[65px] outline-none w-full rounded-md"
            />
            <span className=" text-gray-600 absolute top-0 left-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer">
              <IoSearch className="text-[1.3rem]" />
            </span>
          </div>
          <div>
            <button
              // onClick={showModal2}
              className="bg-[#FF914C] text-white px-4 py-3 rounded-lg hover:bg-[#FF914C]/80"
            >
              Accept All
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
                onClick={handleOk}
                className="text-[#14803c] border-2 border-green-600 bg-white font-semibold w-full py-2 rounded transition duration-200"
              >
                No,Don’t Block
              </button>
            </div>
          </div>
        </Modal>
      </ConfigProvider>
    </>
  );
};

export default SellerManagement;
