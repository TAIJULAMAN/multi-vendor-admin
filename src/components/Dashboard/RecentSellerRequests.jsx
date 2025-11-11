import { ConfigProvider, Table } from "antd";
import { useGetAllUsersQuery } from "../../Redux/api/user/userApi";
import Loader from "../common/Loader";

export default function RecentSellerRequests() {
  const { data: users, isLoading } = useGetAllUsersQuery({ page: 1, limit: 5 });
console.log(users, "from recent user page");
console.log(users?.data?.users, "from recent user page");

  const dataSource = users?.data?.users?.slice(0, 5)?.map((user, index) => ({
    key: index + 1,
    no: index + 1,
    country: user?.country,
    currency: user?.currency,
    email: user?.email,
    name: user?.name,
    phone: user?.phone,
  }));

  const columns = [
    { title: "No", dataIndex: "no", key: "no" },
    {
      title: "User Name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={`https://avatar.iran.liara.run/public/${record.no}`}
            className="w-10 h-10 object-cover rounded-full"
            alt="User Avatar"
          />
          <span>{record.name}</span>
        </div>
      ),
    },
    { title: "Phone Number", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Country", dataIndex: "country", key: "country" },
    { title: "Currency", dataIndex: "currency", key: "currency" },
  ];

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          InputNumber: {
            activeBorderColor: "#14803c",
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
        dataSource={dataSource || []}
        columns={columns}
        pagination={false}
        scroll={{ x: "max-content" }}
      />
    </ConfigProvider>
  );
}
