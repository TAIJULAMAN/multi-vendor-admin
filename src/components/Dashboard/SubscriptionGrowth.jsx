/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const SubscriptionGrowth = () => {
  const [chartHeight, setChartHeight] = useState(300);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setChartHeight(250);
      } else {
        setChartHeight(300);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const data = [
    { month: "Jan", vendors: 200 },
    { month: "Feb", vendors: 185 },
    { month: "Mar", vendors: 165 },
    { month: "Apr", vendors: 175 },
    { month: "May", vendors: 185 },
    { month: "Jun", vendors: 195 },
    { month: "Jul", vendors: 200 },
    { month: "Aug", vendors: 185 },
    { month: "Sep", vendors: 175 },
    { month: "Oct", vendors: 160 },
    { month: "Nov", vendors: 180 },
    { month: "Dec", vendors: 200 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#202020] text-white p-3 rounded-lg shadow-lg border border-[#FF914C]">
          <p className="font-medium">{`Month: ${label}`}</p>
          <p className="font-medium text-[#FF914C]">{`Vendors: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[300px]">
      <ResponsiveContainer width="100%" height={chartHeight}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="vendorGrowth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF914C" stopOpacity={1} />
              <stop offset="95%" stopColor="#FFA17533" stopOpacity={1} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="month"
            tick={{ fill: "#666" }}
            tickLine={{ stroke: "#666" }}
          />
          <YAxis tick={{ fill: "#666" }} tickLine={{ stroke: "#666" }} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="vendors"
            stroke="#FF914C"
            strokeWidth={3}
            fill="url(#vendorGrowth)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SubscriptionGrowth;
