import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import dayjs from "dayjs";
import user from "../../assets/user.png";
import medal from "../../assets/medal.png";
import profit from "../../assets/profit.png";
import seller from "../../assets/seller.png";
import SubscriptionGrowth from "./SubscriptionGrowth";
import SellerGrowth from "./SellerGrowth";
import RecentSellerRequests from "./RecentSellerRequests";
import { Modal } from "antd";

function DashboardPage() {
  const currentYear = dayjs().year();
  const startYear = 1900;
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [isOpen, setIsOpen] = useState(false);
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
      <div className="grid grid-cols-1 md:grid-cols-2 mmd:grid-cols-3 lg:grid-cols-4 gap-2">
        <div className="flex flex-col items-center justify-center p-5 bg-white rounded-lg shadow-sm max-w-md">
          <h2 className="text-gray-700 text-lg font-medium mb-2">
            Total Users
          </h2>

          <div className="rounded-full">
            <div className="flex items-center justify-center mb-2">
              <img src={user} alt="User Stats Icon" className="w-16 h-12" />
            </div>
          </div>

          <p className="text-gray-900 text-4xl font-bold">
            {new Intl.NumberFormat().format(6500)}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-5 bg-white rounded-lg shadow-sm max-w-md">
          <h2 className="text-gray-700 text-lg font-medium mb-2">
            Total Subscriptions
          </h2>

          <div className="rounded-full">
            <div className="flex items-center justify-center mb-2">
              <img src={medal} alt="User Stats Icon" className="w-16 h-12" />
            </div>
          </div>

          <p className="text-gray-900 text-4xl font-bold">
            {new Intl.NumberFormat().format(2650)}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-5 bg-white rounded-lg shadow-sm max-w-md">
          <h2 className="text-gray-700 text-lg font-medium mb-2">
            Total Income
          </h2>

          <div className="rounded-full">
            <div className="flex items-center justify-center mb-2">
              <img src={profit} alt="User Stats Icon" className="w-16 h-12" />
            </div>
          </div>

          <p className="text-gray-900 text-4xl font-bold">
            {new Intl.NumberFormat().format(26500)}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-5 bg-white rounded-lg shadow-sm max-w-md">
          <h2 className="text-gray-700 text-lg font-medium mb-2">
            Total Seller
          </h2>

          <div className="rounded-full">
            <div className="flex items-center justify-center mb-2">
              <img src={seller} alt="User Stats Icon" className="w-16 h-12" />
            </div>
          </div>

          <p className="text-gray-900 text-4xl font-bold">
            {new Intl.NumberFormat().format(2650)}
          </p>
        </div>
      </div>
      {/* .............. */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
        <div className="w-full p-5 bg-[#F2F2F2] rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row md:justify-between lg:justify-between items-center gap-5 my-5">
            <div>
              <h1 className="text-xl font-semibold">Subscription Growth</h1>
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
          <SubscriptionGrowth />
        </div>
        <div className="w-full p-5 bg-[#F2F2F2] rounded-lg shadow-md">
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

              {/* Dropdown List */}
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
          <SellerGrowth />
        </div>
      </div>
      <div className="mt-5">
        <h1 className="text-2xl font-bold mb-5">Recent Seller Requests</h1>
        <RecentSellerRequests showModal={showModal} />
      </div>
      <Modal open={isModalOpen} centered onCancel={handleCancel} footer={null}>
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
    </div>
  );
}

export default DashboardPage;
