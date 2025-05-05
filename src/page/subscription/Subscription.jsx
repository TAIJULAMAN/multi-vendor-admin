import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import PageHeading from "../../Components/Shared/PageHeading";
import { Modal } from "antd";
import { RxCross2 } from "react-icons/rx";
import { GoPlus } from "react-icons/go";

export default function Subscription() {
  const [plan, setPlan] = useState("monthly");
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [updateModalOpen2, setUpdateModalOpen2] = useState(false);
  const [subscriptionType, setSubscriptionType] = useState("");
  const [newPrice, setNewPrice] = useState("49");

  const plans = {
    monthly: {
      name: "Monthly Plan",
      price: "UM 2.99",
      period: "/month",
    },
    yearly: {
      name: "Yearly Plan",
      price: "UM 20.99",
      period: "/year",
    },
  };

  const features = [
    "Priority listing",
    "Customer messaging",
    "Advanced analytics",
    "Premium support",
    "Customer messaging",
  ];

  const [cities, setCities] = useState([
    { id: 1, name: "", features: "" },
    { id: 2, name: "", features: "" },
    { id: 3, name: "", features: "" },
  ]);

  const handleAddCity = () => {
    const newId =
      cities.length > 0 ? Math.max(...cities.map((city) => city.id)) + 1 : 1;
    setCities([...cities, { id: newId, name: "", features: "" }]);
  };

  const handleClearCity = (id) => {
    setCities(cities.filter((city) => city.id !== id));
  };

  const showModal3 = () => {
    setUpdateModalOpen(true);
  };
  const handleCancel3 = () => {
    setUpdateModalOpen(false);
    setUpdateModalOpen2(true);
  };
  const handleCancel5 = () => {
    setUpdateModalOpen2(false);
  };

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-start mb-5">
        <PageHeading title="Subscription Management" />
      </div>
      <div className="flex justify-center items-center  bg-[#ebfcf4] p-5">
        <div className="bg-white shadow-lg relative rounded-2xl px-5 py-20 w-full max-w-xl text-center">
          <h1 className="text-2xl font-bold text-center mb-6">
            Your Subscription Plan
          </h1>

          {/* Plan Toggle */}
          <div className="flex bg-green-50 p-1 rounded-full mb-6">
            <button
              className={`flex-1 py-2 px-4 rounded-full text-center transition-colors ${
                plan === "monthly" ? "bg-white shadow-sm" : ""
              }`}
              onClick={() => setPlan("monthly")}
            >
              Monthly
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-full text-center transition-colors ${
                plan === "yearly" ? "bg-white shadow-sm" : ""
              }`}
              onClick={() => setPlan("yearly")}
            >
              Yearly
            </button>
          </div>

          {/* Plan Details */}
          <div className="p-5">
            <h2 className="text-xl font-bold mb-4">{plans[plan].name}</h2>

            <div className="mb-6">
              <span className="text-green-500 text-3xl font-bold">
                {plans[plan].price}
              </span>
              <span className="text-gray-500">{plans[plan].period}</span>
            </div>

            {/* Features List */}
            <ul className="space-y-4 mb-6">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <FaCheck className="h-5 w-5 text-green-500 mr-2" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* Action Button */}
            <div className="text-white w-full">
              <button
                onClick={showModal3}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-md transition-colors"
              >
                Update Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={updateModalOpen}
        centered
        onCancel={handleCancel3}
        footer={null}
      >
        <div className="p-5">
          <h2 className="text-center text-2xl font-bold">
            Update Subscription Price
          </h2>
          <p className="text-center text-gray-500 mt-2">
            Please fill out the details below to update the subscription
            pricing.
          </p>

          {/* Modal Content */}
          <div className="mt-6 space-y-6">
            {/* Subscription Type */}
            <div>
              <label
                htmlFor="subscription-type"
                className="block text-sm font-medium text-gray-800 mb-2"
              >
                Subscription Type:
              </label>
              <select
                id="subscription-type"
                value={subscriptionType}
                onChange={(e) => setSubscriptionType(e.target.value)}
                className="p-2 block w-full border border-gray-400 rounded-lg"
              >
                <option value="">Select one</option>
                <option value="basic">monthly</option>
                <option value="premium">yearly</option>
              </select>
            </div>

            {/* New Price */}
            <div>
              <label
                htmlFor="new-price"
                className="block text-sm font-medium text-gray-800 mb-2"
              >
                New Price ($):
              </label>
              <input
                id="new-price"
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="p-2 block w-full border border-gray-400 rounded-md shadow-lg"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-4 mt-5">
            <button
              onClick={handleCancel3}
              className="px-4 py-2 border border-red-200 bg-red-50 text-red-500 rounded-md hover:bg-red-100 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCancel3}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        open={updateModalOpen2}
        centered
        onCancel={handleCancel5}
        footer={null}
      >
        <div className="p-5">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Add New Location</h2>
            <p className="text-gray-600">
              Please enter the details below to add a new Wilaya (region) to the
              system. This will help users filter listings by their geographic
              area.
            </p>
          </div>

          <div className="space-y-4">
            {cities.map((city, index) => (
              <div key={city.id} className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="font-medium">
                    Features {String(index + 1).padStart(2, "0")}
                  </label>
                  <button
                    onClick={() => handleClearCity(city.id)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <RxCross2 className="h-4 w-4" />
                  </button>
                </div>
                <input
                  placeholder={`Features ${String(index + 1).padStart(2, "0")}`}
                  className="w-full border rounded-md p-2"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end items-center my-4 text-white">
            <div className="flex justify-center items-center text-center">
              <button
                onClick={handleAddCity}
                className="rounded-full bg-green-600  text-white p-2"
              >
                <GoPlus className="h-5 w-5" />
              </button>
            </div>
          </div>
          {/* buttons */}
          <div className="grid grid-cols-2 gap-4 mt-5">
            <button
              onClick={handleCancel5}
              className="py-2 px-4 rounded-lg border border-[#EF4444] bg-red-50"
            >
              Cancel
            </button>

            <button
              onClick={handleCancel5}
              className="py-2 px-4 rounded-lg bg-green-600 text-white"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
