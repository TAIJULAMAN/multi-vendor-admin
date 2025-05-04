import { FaChevronDown, FaUsers } from "react-icons/fa";
import { useState } from "react";
import dayjs from "dayjs";
import RecentUsers from "../../components/Dashboard/RecentUsers";
import BarGrowth from "../../components/Dashboard/BarGrowth";

function VendorDashboard() {
          const currentYear = dayjs().year();
          const startYear = 1900;
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

          return (
                    <div className="flex flex-col">
                              <div className="grid grid-cols-1 md:grid-cols-2 mmd:grid-cols-3 lg:grid-cols-4 gap-5">
                                        <div className="flex justify-between items-center p-5 bg-[#202020]  gap-5 h-[80px] rounded-lg shadow-md">
                                                  <div className="flex gap-2 items-center">
                                                            <p className="rounded-full flex justify-center items-center">
                                                                      <FaUsers size={20} className=" bg-white rounded-full p-2 w-10 h-10 text-[#0B704E]" />
                                                            </p>
                                                            <p className="text-xl font-semibold text-white whitespace-nowrap">Total User</p>
                                                  </div>
                                                  <p className="text-[#0B704E] text-2xl font-bold">1200</p>
                                        </div>
                                        <div className="flex justify-between items-center p-5 bg-[#202020]  gap-5 h-[80px] rounded-lg shadow-md">
                                                  <div className="flex gap-2 items-center">
                                                            <p className="rounded-full flex justify-center items-center">
                                                                      <FaUsers size={20} className=" bg-white rounded-full p-2 w-10 h-10 text-[#0B704E]" />
                                                            </p>
                                                            <p className="text-xl font-semibold text-white whitespace-nowrap">Total Event</p>
                                                  </div>
                                                  <p className="text-[#0B704E] text-2xl font-bold">120</p>
                                        </div>
                                        <div className="flex justify-between items-center p-5 bg-[#202020]  gap-5 h-[80px] rounded-lg shadow-md">
                                                  <div className="flex gap-2 items-center">
                                                            <p className="rounded-full flex justify-center items-center">
                                                                      <FaUsers size={20} className=" bg-white rounded-full p-2 w-10 h-10 text-[#0B704E]" />
                                                            </p>
                                                            <p className="text-xl font-semibold text-white whitespace-nowrap">Total Restaurant</p>
                                                  </div>
                                                  <p className="text-[#0B704E] text-2xl font-bold">120</p>
                                        </div>
                                        <div className="flex justify-between items-center p-5 bg-[#202020]  gap-5 h-[80px] rounded-lg shadow-md">
                                                  <div className="flex gap-2 items-center">
                                                            <p className="rounded-full flex justify-center items-center">
                                                                      <FaUsers size={20} className=" bg-white rounded-full p-2 w-10 h-10 text-[#0B704E]" />
                                                            </p>
                                                            <p className="text-xl font-semibold text-white whitespace-nowrap">Total Earning</p>
                                                  </div>
                                                  <p className="text-[#0B704E] text-2xl font-bold">120</p>
                                        </div>
                                        
                              </div>

                              <div className="w-full p-5 bg-[#F2F2F2] rounded-lg shadow-md mt-5">
                                        <div className="flex flex-col md:flex-row md:justify-between lg:justify-between items-center gap-5 my-5">
                                                  <div>
                                                            <h1 className="text-xl font-semibold">Bar Growth</h1>
                                                  </div>

                                                  <div className="relative w-full md:w-32">
                                                            {/* Selected Year Display */}
                                                            <button
                                                                      onClick={() => setIsOpen(!isOpen)}
                                                                      className="w-full px-3 py-2 border border-gray-300 rounded-md flex justify-between items-center bg-white transition"
                                                            >
                                                                      <span className="text-[#0B704E]">{selectedYear}</span>
                                                                      <FaChevronDown className="text-[#0B704E] w-5 h-5 ml-5" />
                                                            </button>

                                                            {/* Dropdown List */}
                                                            {isOpen && (
                                                                      <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
                                                                                {years.map((year) => (
                                                                                          <div
                                                                                                    key={year}
                                                                                                    onClick={() => handleSelect(year)}
                                                                                                    className={`p-2 cursor-pointer hover:bg-gray-100 transition ${year === selectedYear ? "bg-gray-200" : ""
                                                                                                              }`}
                                                                                          >
                                                                                                    {year}
                                                                                          </div>
                                                                                ))}
                                                                      </div>
                                                            )}
                                                  </div>
                                        </div>
                                        <BarGrowth />
                              </div>



                              <div className="">
                                        <h1 className="text-2xl font-bold mb-5">Recent Joined User</h1>
                                        <RecentUsers />
                              </div>
                    </div>
          );
}

export default VendorDashboard;
