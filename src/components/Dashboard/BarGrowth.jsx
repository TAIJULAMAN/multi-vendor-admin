import { useState, useEffect } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const BarGrowth = () => {
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
    { month: 'Jan', vendors: 30 },
    { month: 'Feb', vendors: 45 },
    { month: 'Mar', vendors: 55 },
    { month: 'Apr', vendors: 65 },
    { month: 'May', vendors: 85 },
    { month: 'Jun', vendors: 95 },
    { month: 'Jul', vendors: 115 },
    { month: 'Aug', vendors: 125 },
    { month: 'Sep', vendors: 145 },
    { month: 'Oct', vendors: 160 },
    { month: 'Nov', vendors: 180 },
    { month: 'Dec', vendors: 200 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#202020] text-white p-3 rounded-lg shadow-lg border border-[#0B704E]">
          <p className="font-medium">{`Month: ${label}`}</p>
          <p className="font-medium text-[#0B704E]">{`Vendors: ${payload[0].value}`}</p>
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
              <stop offset="5%" stopColor="#0B704E" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#0B704E" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="month"
            tick={{ fill: '#666' }}
            tickLine={{ stroke: '#666' }}
          />
          <YAxis
            tick={{ fill: '#666' }}
            tickLine={{ stroke: '#666' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="vendors"
            stroke="#0B704E"
            strokeWidth={3}
            fill="url(#vendorGrowth)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarGrowth;
