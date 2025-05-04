import { ConfigProvider, Table } from "antd";

const RecentUsers = () => {

  const dataSource = [
    {
      key: "1",
      no: "1",
      name: "John Doe",
      date: "05/03/2025",
      phone: "+1 9876543210",
      email: "johndoe@example.com",
      location: "New York, USA",
    },
    {
      key: "2",
      no: "2",
      name: "Jane Smith",
      date: "10/04/2025",
      phone: "+44 1234567890",
      email: "janesmith@example.com",
      location: "London, UK",
    },
    {
      key: "3",
      no: "3",
      name: "Ali Khan",
      date: "15/02/2025",
      phone: "+92 3345678901",
      email: "alikhan@example.com",
      location: "Karachi, Pakistan",
    },
    {
      key: "4",
      no: "4",
      name: "Emily Davis",
      date: "20/05/2025",
      phone: "+33 6789012345",
      email: "emilydavis@example.com",
      location: "Paris, France",
    },
    {
      key: "5",
      no: "5",
      name: "Michael Brown",
      date: "25/06/2025",
      phone: "+61 4567890123",
      email: "michaelbrown@example.com",
      location: "Sydney, Australia",
    }
  ];
  const columns = [
    { title: "No", dataIndex: "no", key: "no" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Phone Number", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Location", dataIndex: "location", key: "location" },
    {
      title: "Action",
      key: "action",
      render: () => (
        <div className="flex gap-2 text-center py-2 w-full">
          <button
            className="bg-[#0DC553] text-white font-semibold py-2 px-5 rounded-lg"
          >
            Approve
          </button>
          <button
            className="bg-[#A80608] text-white font-semibold py-2 px-5 rounded-lg"
          >
            Cancel
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#0B704E",
              headerColor: "rgb(255,255,255)",
              cellFontSize: 20,
              headerSplitColor: "#0B704E",
          },
          },
        }}
      >
        <Table
          dataSource={dataSource}
          columns={columns}
          scroll={{ x: "max-content" }}
          pagination={false}
        />
      </ConfigProvider>
    </>
  );
};

export default RecentUsers;
