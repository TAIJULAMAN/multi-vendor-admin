/* eslint-disable react/prop-types */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const SellerGrowth = () => {
  const userData = [
    { month: "Jan", appUsers: 1200, activeUsers: 900 },
    { month: "Feb", appUsers: 1500, activeUsers: 1100 },
    { month: "Mar", appUsers: 800, activeUsers: 600 },
    { month: "Apr", appUsers: 1600, activeUsers: 1300 },
    { month: "May", appUsers: 2000, activeUsers: 1600 },
    { month: "Jun", appUsers: 1700, activeUsers: 1400 },
    { month: "Jul", appUsers: 2200, activeUsers: 1900 },
    { month: "Aug", appUsers: 1900, activeUsers: 1700 },
    { month: "Sept", appUsers: 2100, activeUsers: 1800 },
    { month: "Oct", appUsers: 2300, activeUsers: 2000 },
    { month: "Nov", appUsers: 2500, activeUsers: 2200 },
    { month: "Dec", appUsers: 2800, activeUsers: 2500 },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { month, appUsers, activeUsers } = payload[0].payload;
      return (
        <div className="bg-white py-2 px-3 rounded shadow border">
          <p className="text-black font-semibold">{`Month: ${month}`}</p>
          <p className="text-[#FF914C]">{`App Users: ${appUsers}`}</p>
          <p className="text-[#083E24]">{`Active Users: ${activeUsers}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={userData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          barGap={100}
          barCategoryGap={40}
        >
          <XAxis tickLine={false} dataKey="month" />
          <YAxis tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar
            dataKey="appUsers"
            fill="#FF914C"
            barSize={30}
            radius={[5, 5, 0, 0]}
            name="App Users"
          />
          <Bar
            dataKey="activeUsers"
            fill="#083E24"
            barSize={30}
            radius={[5, 5, 0, 0]}
            name="Active Users"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SellerGrowth;
