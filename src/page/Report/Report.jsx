import { ConfigProvider, Table, DatePicker } from "antd";
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FaFileDownload } from "react-icons/fa";
import { BsGraphUpArrow, BsGraphDownArrow } from "react-icons/bs";

function Report() {
    const [activeTab, setActiveTab] = useState("bar");
    const [dateRange, setDateRange] = useState(null);
    const { RangePicker } = DatePicker;

    const handleTabChange = (type) => {
        setActiveTab(type);
    };

    const handleDateChange = (dates) => {
        setDateRange(dates);
    };

    const barReportData = [
        {
            key: "1",
            name: "Downtown Bar",
            totalRevenue: "$45,000",
            dailyAverage: "$15,000",
            customers: "1,350",
            avgSpend: "$33.33",
            trend: "up",
            growth: "+12.5%",
            date: "2025-04-01",
            status: "Completed"
        },
        {
            key: "2",
            name: "Skyline Lounge",
            totalRevenue: "$37,500",
            dailyAverage: "$12,500",
            customers: "1,140",
            avgSpend: "$32.89",
            trend: "down",
            growth: "-3.2%",
            date: "2025-04-01",
            status: "Pending"
        },
        {
            key: "3",
            name: "Harbor View",
            totalRevenue: "$54,600",
            dailyAverage: "$18,200",
            customers: "1,560",
            avgSpend: "$35.00",
            trend: "up",
            growth: "+15.8%",
            date: "2025-04-01",
            status: "Completed"
        }
    ];

    const clubReportData = [
        {
            key: "1",
            name: "Pulse Nightclub",
            totalRevenue: "$75,000",
            dailyAverage: "$25,000",
            customers: "2,400",
            avgSpend: "$31.25",
            trend: "up",
            growth: "+18.5%",
            date: "2025-04-01",
            status: "Completed"
        },
        {
            key: "2",
            name: "Echo Lounge",
            totalRevenue: "$59,400",
            dailyAverage: "$19,800",
            customers: "1,950",
            avgSpend: "$30.46",
            trend: "up",
            growth: "+8.2%",
            date: "2025-04-01",
            status: "Pending"
        }
    ];

    const restaurantReportData = [
        {
            key: "1",
            name: "La Belle Cuisine",
            totalRevenue: "$25,500",
            dailyAverage: "$8,500",
            customers: "660",
            avgSpend: "$38.64",
            trend: "up",
            growth: "+5.5%",
            date: "2025-04-01",
            status: "Completed"
        },
        {
            key: "2",
            name: "Sakura Japanese",
            totalRevenue: "$21,600",
            dailyAverage: "$7,200",
            customers: "540",
            avgSpend: "$40.00",
            trend: "down",
            growth: "-2.1%",
            date: "2025-04-01",
            status: "Pending"
        }
    ];

    const columns = [
        { 
            title: "Name",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        { 
            title: "Total Revenue",
            dataIndex: "totalRevenue",
            key: "totalRevenue",
            sorter: (a, b) => parseFloat(a.totalRevenue.replace(/[$,]/g, '')) - parseFloat(b.totalRevenue.replace(/[$,]/g, ''))
        },
        { 
            title: "Daily Average",
            dataIndex: "dailyAverage",
            key: "dailyAverage"
        },
        { 
            title: "Total Customers",
            dataIndex: "customers",
            key: "customers",
            sorter: (a, b) => parseInt(a.customers.replace(/,/g, '')) - parseInt(b.customers.replace(/,/g, ''))
        },
        { 
            title: "Avg. Spend per Customer",
            dataIndex: "avgSpend",
            key: "avgSpend"
        },
        {
            title: "Growth",
            key: "growth",
            render: (record) => (
                <div className="flex items-center gap-2">
                    {record.trend === "up" ? (
                        <BsGraphUpArrow className="text-green-500" />
                    ) : (
                        <BsGraphDownArrow className="text-red-500" />
                    )}
                    <span className={record.trend === "up" ? "text-green-500" : "text-red-500"}>
                        {record.growth}
                    </span>
                </div>
            )
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <span className={`px-3 py-1 rounded-full ${
                    status === "Completed" 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                }`}>
                    {status}
                </span>
            )
        },
        {
            title: "Actions",
            key: "actions",
            render: () => (
                <div className="flex gap-2">
                    <button className="bg-[#0B704E] text-white p-2 rounded-lg">
                        <IoEyeOutline className="w-5 h-5" />
                    </button>
                    <button className="bg-[#0B704E] text-white p-2 rounded-lg">
                        <FaFileDownload className="w-5 h-5" />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="min-h-screen">
            <div className="mt-10 mb-8 flex flex-col space-y-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-8">
                        <div className="flex items-center gap-[10px]">
                            <div
                                className="w-[35px] h-[35px] border-[2px] border-[#0B704E] rounded-full flex items-center justify-center cursor-pointer"
                                onClick={() => handleTabChange("bar")}
                            >
                                <div className={`${
                                    activeTab === "bar" ? "bg-[#0B704E] scale-[1]" : "bg-transparent scale-[0.7]"
                                } w-[21px] h-[21px] transition-all duration-200 rounded-full`}></div>
                            </div>
                            <p
                                className="text-[1.2rem] font-bold text-white cursor-pointer"
                                onClick={() => handleTabChange("bar")}
                            >
                                Bar Reports
                            </p>
                        </div>

                        <div className="flex items-center gap-[10px]">
                            <div
                                className="w-[35px] h-[35px] border-[2px] border-[#0B704E] rounded-full flex items-center justify-center cursor-pointer"
                                onClick={() => handleTabChange("club")}
                            >
                                <div className={`${
                                    activeTab === "club" ? "bg-[#0B704E] scale-[1]" : "bg-transparent scale-[0.7]"
                                } w-[21px] h-[21px] transition-all duration-200 rounded-full`}></div>
                            </div>
                            <p
                                className="text-[1.2rem] font-bold text-white cursor-pointer"
                                onClick={() => handleTabChange("club")}
                            >
                                Club Reports
                            </p>
                        </div>

                        <div className="flex items-center gap-[10px]">
                            <div
                                className="w-[35px] h-[35px] border-[2px] border-[#0B704E] rounded-full flex items-center justify-center cursor-pointer"
                                onClick={() => handleTabChange("restaurant")}
                            >
                                <div className={`${
                                    activeTab === "restaurant" ? "bg-[#0B704E] scale-[1]" : "bg-transparent scale-[0.7]"
                                } w-[21px] h-[21px] transition-all duration-200 rounded-full`}></div>
                            </div>
                            <p
                                className="text-[1.2rem] font-bold text-white cursor-pointer"
                                onClick={() => handleTabChange("restaurant")}
                            >
                                Restaurant Reports
                            </p>
                        </div>
                    </div>

                    <RangePicker 
                        onChange={handleDateChange}
                        className="w-full md:w-auto"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                    <div className="bg-[#0B704E] p-4 rounded-lg">
                        <h3 className="text-white text-lg font-semibold">Total Revenue</h3>
                        <p className="text-2xl font-bold text-white mt-2">
                            {activeTab === "bar" ? "$137,100" : 
                             activeTab === "club" ? "$134,400" : 
                             "$47,100"}
                        </p>
                    </div>
                    <div className="bg-[#0B704E] p-4 rounded-lg">
                        <h3 className="text-white text-lg font-semibold">Total Customers</h3>
                        <p className="text-2xl font-bold text-white mt-2">
                            {activeTab === "bar" ? "4,050" : 
                             activeTab === "club" ? "4,350" : 
                             "1,200"}
                        </p>
                    </div>
                    <div className="bg-[#0B704E] p-4 rounded-lg">
                        <h3 className="text-white text-lg font-semibold">Avg. Revenue/Day</h3>
                        <p className="text-2xl font-bold text-white mt-2">
                            {activeTab === "bar" ? "$15,233" : 
                             activeTab === "club" ? "$22,400" : 
                             "$7,850"}
                        </p>
                    </div>
                    <div className="bg-[#0B704E] p-4 rounded-lg">
                        <h3 className="text-white text-lg font-semibold">Growth Rate</h3>
                        <p className="text-2xl font-bold text-white mt-2">
                            {activeTab === "bar" ? "+8.4%" : 
                             activeTab === "club" ? "+13.3%" : 
                             "+1.7%"}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <ConfigProvider
                    theme={{
                        components: {
                            Table: {
                                headerBg: "#0B704E",
                                headerColor: "rgb(255,255,255)",
                                cellFontSize: 16,
                                headerSplitColor: "#0B704E",
                            },
                            Pagination: {
                                colorPrimaryBorder: "#0B704E",
                                colorBorder: "#0B704E",
                                colorPrimary: "#0B704E",
                                colorPrimaryHover: "#0B704E",
                                colorText: "#ffffff",
                                itemSize: 32,
                            },
                        },
                    }}
                >
                    <Table
                        dataSource={
                            activeTab === "bar"
                                ? barReportData
                                : activeTab === "club"
                                ? clubReportData
                                : restaurantReportData
                        }
                        columns={columns}
                        pagination={{ pageSize: 10 }}
                        scroll={{ x: "max-content" }}
                    />
                </ConfigProvider>
            </div>
        </div>
    );
}

export default Report;