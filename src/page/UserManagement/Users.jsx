import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { MdBlockFlipped } from "react-icons/md";
import PageHeading from "../../shared/PageHeading";
import { ConfigProvider, Modal, Table } from "antd";

const Users = () => {
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
      userName: "Shah Aman",
      email: "shahaman@example.com",
      phoneNumber: "123-456-7890",
    },
    {
      key: "2",
      no: "2",
      userName: "Jane Doe",
      email: "janedoe@example.com",
      phoneNumber: "234-567-8901",
    },
    {
      key: "3",
      no: "3",
      userName: "John Smith",
      email: "johnsmith@example.com",
      phoneNumber: "345-678-9012",
    },
    {
      key: "4",
      no: "4",
      userName: "Alice Johnson",
      email: "alicej@example.com",
      phoneNumber: "456-789-0123",
    },
    {
      key: "5",
      no: "5",
      userName: "Bob Brown",
      email: "bobb@example.com",
      phoneNumber: "567-890-1234",
    },
    {
      key: "6",
      no: "6",
      userName: "Charlie Davis",
      email: "charlied@example.com",
      phoneNumber: "678-901-2345",
    },
    {
      key: "7",
      no: "7",
      userName: "Dana Evans",
      email: "danae@example.com",
      phoneNumber: "789-012-3456",
    },
    {
      key: "8",
      no: "8",
      userName: "Evan Foster",
      email: "evanf@example.com",
      phoneNumber: "890-123-4567",
    },
    {
      key: "9",
      no: "9",
      userName: "Fiona Gray",
      email: "fionag@example.com",
      phoneNumber: "901-234-5678",
    },
    {
      key: "10",
      no: "10",
      userName: "George Hall",
      email: "georgeh@example.com",
      phoneNumber: "012-345-6789",
    },
    {
      key: "11",
      no: "11",
      userName: "Hannah Ives",
      email: "hannahi@example.com",
      phoneNumber: "111-222-3333",
    },
    {
      key: "12",
      no: "12",
      userName: "Ian Jones",
      email: "ianj@example.com",
      phoneNumber: "222-333-4444",
    },
    {
      key: "13",
      no: "13",
      userName: "Julia King",
      email: "juliak@example.com",
      phoneNumber: "333-444-5555",
    },
    {
      key: "14",
      no: "14",
      userName: "Kevin Lee",
      email: "kevinl@example.com",
      phoneNumber: "444-555-6666",
    },
    {
      key: "15",
      no: "15",
      userName: "Laura Moore",
      email: "lauram@example.com",
      phoneNumber: "555-666-7777",
    },
    {
      key: "16",
      no: "16",
      userName: "Mike Nguyen",
      email: "miken@example.com",
      phoneNumber: "666-777-8888",
    },
    {
      key: "17",
      no: "17",
      userName: "Nina Owens",
      email: "ninao@example.com",
      phoneNumber: "777-888-9999",
    },
    {
      key: "18",
      no: "18",
      userName: "Oscar Patel",
      email: "oscarp@example.com",
      phoneNumber: "888-999-0000",
    },
    {
      key: "19",
      no: "19",
      userName: "Paula Quinn",
      email: "paulaq@example.com",
      phoneNumber: "999-000-1111",
    },
    {
      key: "20",
      no: "20",
      userName: "Quinn Ross",
      email: "quinnr@example.com",
      phoneNumber: "000-111-2222",
    },
    {
      key: "21",
      no: "21",
      userName: "Rachel Scott",
      email: "rachels@example.com",
      phoneNumber: "101-202-3030",
    },
    {
      key: "22",
      no: "22",
      userName: "Steve Thomas",
      email: "stevet@example.com",
      phoneNumber: "202-303-4040",
    },
    {
      key: "23",
      no: "23",
      userName: "Tina Underwood",
      email: "tinau@example.com",
      phoneNumber: "303-404-5050",
    },
    {
      key: "24",
      no: "24",
      userName: "Uma Vincent",
      email: "umav@example.com",
      phoneNumber: "404-505-6060",
    },
    {
      key: "25",
      no: "25",
      userName: "Victor White",
      email: "victorw@example.com",
      phoneNumber: "505-606-7070",
    },
    {
      key: "26",
      no: "26",
      userName: "Wendy Xu",
      email: "wendyx@example.com",
      phoneNumber: "606-707-8080",
    },
    {
      key: "27",
      no: "27",
      userName: "Xander Young",
      email: "xandery@example.com",
      phoneNumber: "707-808-9090",
    },
    {
      key: "28",
      no: "28",
      userName: "Yara Zane",
      email: "yaraz@example.com",
      phoneNumber: "808-909-1010",
    },
    {
      key: "29",
      no: "29",
      userName: "Zach Allen",
      email: "zacha@example.com",
      phoneNumber: "909-101-2121",
    },
    {
      key: "30",
      no: "30",
      userName: "Abby Baker",
      email: "abbyb@example.com",
      phoneNumber: "101-212-3232",
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
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Action",
      key: "action",
      render: () => (
        <button
          onClick={showModal}
          className="border border-[#14803c] text-[#14803c] rounded-lg p-2 bg-[#d3e8e6] hover:bg-[#b4d9d4] transition duration-200"
        >
          <MdBlockFlipped className="w-6 h-6 text-[#14803c]" />
        </button>
      ),
    },
  ];

  return (
    <>
      <div className="my-5 md:my-10 flex flex-col md:flex-row gap-5 justify-between items-center">
        <PageHeading title="User Management" />
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

export default Users;