/* eslint-disable react/prop-types */
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import dayjs from "dayjs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useGetSalesOverviewQuery } from "../../Redux/api/dashboard/dashboardApi";

export default function SellerGrowth() {
  const currentYear = dayjs().year();
  const startYear = 2023;
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [isOpen, setIsOpen] = useState(false);

  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, index) => startYear + index
  );

  const handleSelect = (year) => {
    setSelectedYear(year);
    setIsOpen(false);
  };

  const { data: salesData, isLoading } = useGetSalesOverviewQuery({
    year: selectedYear,
  });
  const apiMonths = Array.isArray(salesData?.data?.overview)
    ? salesData.data.overview
    : [];
  const chartData = apiMonths.map((m) => {
    const month = m?.month || m?.name || m?.label || "";
    const normalSale =
      m?.normalSale ?? m?.normal_sales ?? m?.normal ?? m?.salesNormal ?? 0;
    const totalAmount =
      m?.totalAmount ?? m?.totalSale ?? m?.total_sales ?? m?.total ?? 0;
    return { month, normalSale, totalAmount };
  });
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { month, normalSale, totalAmount } = payload[0].payload;
      return (
        <div className="bg-white py-2 px-3 rounded shadow border">
          <p className="text-black font-semibold">{`Month: ${month}`}</p>
          <p className="text-[#FF914C]">{`Normal Sale: ${normalSale}`}</p>
          <p className="text-[#083E24]">{`Total Sale: ${totalAmount}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="flex flex-col md:flex-row md:justify-between lg:justify-between items-center gap-5 my-5">
        <div>
          <h1 className="text-xl font-semibold">Seller Growth</h1>
        </div>
        <div className="relative w-full md:w-32">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md flex justify-between items-center bg-white transition"
          >
            <span className="text-[#0B704E]">{selectedYear}</span>
            <FaChevronDown className="text-[#0B704E] w-5 h-5 ml-5" />
          </button>
          {isOpen && (
            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg text-lg">
              {years.map((year) => (
                <div
                  key={year}
                  onClick={() => handleSelect(year)}
                  className={`p-2 cursor-pointer hover:bg-gray-100 transition ${
                    year === selectedYear ? "bg-gray-200" : ""
                  }`}
                >
                  {year}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            barGap={100}
            barCategoryGap={40}
          >
            <XAxis tickLine={false} dataKey="month" />
            <YAxis tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar
              dataKey="normalSale"
              fill="#FF914C"
              barSize={30}
              radius={[5, 5, 0, 0]}
              name="Normal Sale"
            />
            <Bar
              dataKey="totalAmount"
              fill="#083E24"
              barSize={30}
              radius={[5, 5, 0, 0]}
              name="Total Sale"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
