import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import PageHeading from "../../shared/PageHeading";

export default function Subscription() {
  const [plan, setPlan] = useState("monthly");

  const plans = {
    monthly: {
      name: "Basic Plan",
      price: "UM 0.00",
      period: "/month",
    },
    yearly: {
      name: "Premium Plan",
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

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-between mb-5">
        <PageHeading title="Subscription Management" />
        <div>
          <button
            // onClick={showModal2}
            className="bg-[#FF914C] text-white px-4 py-3 rounded-lg hover:bg-[#FF914C]/80"
          >
            + Add Subscription
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center p-5">
        <div className="bg-white shadow-lg relative rounded-2xl px-5 py-20 w-full max-w-xl text-center">
          <h1 className="text-2xl font-bold text-center mb-6">
            Your Subscription Plan
          </h1>

          {/* Plan Toggle */}
          <div className="flex bg-orange-50 p-1 rounded-full mb-6">
            <button
              className={`flex-1 py-2 px-4 rounded-full text-center transition-colors ${
                plan === "monthly" ? "bg-white shadow-sm" : ""
              }`}
              onClick={() => setPlan("monthly")}
            >
              Basic
            </button>
            <button
              className={`flex-1 py-2 px-4 rounded-full text-center transition-colors ${
                plan === "yearly" ? "bg-white shadow-sm" : ""
              }`}
              onClick={() => setPlan("yearly")}
            >
              Premium
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

            {/* Navigate to UpdateSubscription page */}
            <div className="mt-6">
              <Link to="/dashboard/update-subscription">
                <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-md transition-colors">
                  Update Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
