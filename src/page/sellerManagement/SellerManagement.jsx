import { ConfigProvider, Modal, Table } from "antd";
import { MdBlockFlipped, MdEdit } from "react-icons/md";
import { IoChatbubbleEllipsesOutline, IoSearch } from "react-icons/io5";
import { BsPatchCheckFill } from "react-icons/bs";
import PageHeading from "../../shared/PageHeading";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllSellersQuery } from "../../Redux/api/seller/sellerApi";

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
  const { data: sellers, isLoading } = useGetAllSellersQuery();
  console.log("seller list of seller management", sellers);

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
          {/* <img
            src={` record?.userImage || https://avatar.iran.liara.run/public/${record.no}`}
            className="w-10 h-10 object-cover rounded-full"
            alt="User Avatar"
          /> */}
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
      title: "Action",
      key: "action",
      width: 180,
      render: () => {
        return (
          <div className="flex gap-2">
            <button className="border border-[#14803c] rounded-lg p-2 bg-[#d3e8e6] text-[#14803c] hover:bg-[#b4d9d4] transition duration-200">
              <BsPatchCheckFill className="w-6 h-6 text-[#14803c]" />
            </button>
            <button className="border border-[#14803c] rounded-lg p-2 bg-[#d3e8e6] text-[#14803c] hover:bg-[#b4d9d4] transition duration-200">
              <MdEdit className="w-6 h-6 text-[#14803c]" />
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
              className="border-2 border-[#14803c] py-3 pl-12 pr-[65px] outline-none w-full rounded-md"
            />
            <span className=" text-gray-600 absolute top-0 left-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer">
              <IoSearch className="text-[1.3rem]" />
            </span>
          </div>
          {/* <div>
            <button
              // onClick={showModal2}
              className="bg-[#FF914C] text-white px-4 py-3 rounded-lg hover:bg-[#FF914C]/80"
            >
              Accept All
            </button>
          </div> */}
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
          tableLayout="fixed"
          scroll={{ x: true }}
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
