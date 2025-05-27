import { IoSearch } from "react-icons/io5";
import PageHeading from "../../shared/PageHeading";
import { ConfigProvider, Table } from "antd";

const PremiumSubscribers = () => {
  const dataSource = [
    {
      key: "1",
      no: "1",
      userName: "Shah Aman",
      subscriptionType: "basic",
      date: "12/04/24",
      status: "due",
    },
    {
      key: "2",
      no: "2",
      userName: "Hossain Ali",
      subscriptionType: "premium",
      date: "12/04/24",
      status: "paid",
    },
    {
      key: "3",
      no: "3",
      userName: "Rana Rahman",
      subscriptionType: "basic",
      date: "12/04/24",
      status: "due",
    },
    {
      key: "4",
      no: "4",
      userName: "Zahid Hasan",
      subscriptionType: "premium",
      date: "12/04/24",
      status: "paid",
    },
    {
      key: "5",
      no: "5",
      userName: "Fariha Begum",
      subscriptionType: "basic",
      date: "12/04/24",
      status: "due",
    },
    {
      key: "6",
      no: "6",
      userName: "Khaled Anwar",
      subscriptionType: "premium",
      date: "12/04/24",
      status: "paid",
    },
    {
      key: "7",
      no: "7",
      userName: "Sana Zaman",
      subscriptionType: "basic",
      date: "12/04/24",
      status: "due",
    },
    {
      key: "8",
      no: "8",
      userName: "Tariq Khan",
      subscriptionType: "premium",
      date: "12/04/24",
      status: "paid",
    },
    {
      key: "9",
      no: "9",
      userName: "Shahid Reza",
      subscriptionType: "basic",
      date: "12/04/24",
      status: "due",
    },
    {
      key: "10",
      no: "10",
      userName: "Nashit Raza",
      subscriptionType: "premium",
      date: "12/04/24",
      status: "paid",
    },
    {
      key: "11",
      no: "11",
      userName: "Mia Junaid",
      subscriptionType: "basic",
      date: "12/04/24",
      status: "due",
    },
    {
      key: "12",
      no: "12",
      userName: "Arif Kabir",
      subscriptionType: "premium",
      date: "12/04/24",
      status: "paid",
    },
    {
      key: "13",
      no: "13",
      userName: "Sabrina Mistry",
      subscriptionType: "basic",
      date: "12/04/24",
      status: "due",
    },
    {
      key: "14",
      no: "14",
      userName: "Nabila Islam",
      subscriptionType: "premium",
      date: "12/04/24",
      status: "paid",
    },
    {
      key: "15",
      no: "15",
      userName: "Omar Ali",
      subscriptionType: "basic",
      date: "12/04/24",
      status: "due",
    },
  ];

  const columns = [
    { title: "No", dataIndex: "no", key: "no" },
    {
      title: "User Name",
      key: "userName",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={`https://avatar.iran.liara.run/public/${record.no}`}
            className="w-10 h-10 object-cover rounded-full"
            alt="User Avatar"
          />
          <span>{record.userName}</span>
        </div>
      ),
    },
    {
      title: "Joining Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Subscription Type",
      dataIndex: "subscriptionType",
      key: "subscriptionType",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        if (record.status === "due") {
          return (
            <button className="border border-[#ff9f00] text-[#ff9f00] rounded-full px-5 py-1 hover:bg-[#ffd699] transition duration-200">
              Due
            </button>
          );
        } else if (record.status === "paid") {
          return (
            <button className="border border-[#14803c] text-[#14803c] rounded-full px-5 py-1 hover:bg-[#b4d9d4] transition duration-200">
              Paid
            </button>
          );
        }
      },
    },
  ];

  return (
    <>
      <div className="my-5 md:my-10 flex flex-col md:flex-row gap-5 justify-between items-center">
        <PageHeading title="Premium Subscribers" />
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
      </ConfigProvider>
    </>
  );
};

export default PremiumSubscribers;
