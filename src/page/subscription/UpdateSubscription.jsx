import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { GoPlus } from "react-icons/go";
import PageHeading from "../../shared/PageHeading";

export default function UpdateSubscription() {
  const [subscriptionType, setSubscriptionType] = useState("");
  const [newPrice, setNewPrice] = useState("50");
  const [cities, setCities] = useState([
    { id: 1, name: "", features: "" },
    { id: 2, name: "", features: "" },
    { id: 3, name: "", features: "" },
  ]);

  // Add a new city to the list
  const handleAddCity = () => {
    const newId =
      cities.length > 0 ? Math.max(...cities.map((city) => city.id)) + 1 : 1;
    setCities([...cities, { id: newId, name: "", features: "" }]);
  };

  // Clear a city from the list
  const handleClearCity = (id) => {
    setCities(cities.filter((city) => city.id !== id));
  };

  // Handle the save button click
  const handleSave = () => {
    alert("Subscription updated successfully!");
  };

  // Handle cancel button click
  const handleCancel = () => {
    setSubscriptionType("");
    setNewPrice("");
    setCities([
      { id: 1, name: "", features: "" },
      { id: 2, name: "", features: "" },
      { id: 3, name: "", features: "" },
    ]);
  };

  return (
    <div className="min-h-screen">
      <PageHeading title="Subscription Management" />
      {/* Subscription Update Form */}
      <div className="flex justify-center items-center mt-5">
        <div className="p-5 bg-white shadow-md rounded-lg max-w-[900px] w-full space-y-5">
          <div className="space-y-5">
            <div className="mb-5">
              <label
                htmlFor="subscription-type"
                className="text-xl text-gray-800 mb-2 flex justify-start text-start"
              >
                Subscription Type:
              </label>
              <select
                id="subscription-type"
                value={subscriptionType}
                onChange={(e) => setSubscriptionType(e.target.value)}
                className="px-5 py-3 bg-white block w-full text-gray-600 border-2 border-[#FF914C] rounded-lg outline-none"
                style={{
                  backgroundColor:
                    subscriptionType === "Basic" ||
                    subscriptionType === "Premium"
                      ? "#FF914C"
                      : "white",
                }}
              >
                <option value="">Select one</option>
                <option value="basic">Monthly</option>
                <option value="premium">Yearly</option>
              </select>
            </div>
            <div className="mb-5">
              <label
                htmlFor="new-price"
                className="text-xl text-gray-800 mb-2 flex justify-start text-start"
              >
                New Price ($):
              </label>
              <input
                id="new-price"
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="px-5 py-3 bg-white block w-full text-gray-600 border-2 border-[#FF914C] rounded-lg outline-none"
              />
            </div>
          </div>

          <div className="space-y-5">
            {cities.map((city, index) => (
              <div key={city.id} className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-xl text-gray-800 mb-2 flex justify-start text-start">
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
                  value={city.features}
                  onChange={(e) => {
                    const updatedCities = cities.map((cityItem) =>
                      cityItem.id === city.id
                        ? { ...cityItem, features: e.target.value }
                        : cityItem
                    );
                    setCities(updatedCities);
                  }}
                  className="px-5 py-3 bg-white block w-full text-gray-600 border-2 border-[#FF914C] rounded-lg outline-none"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end items-center my-4">
            <button
              onClick={handleAddCity}
              className="rounded-full bg-green-600 text-white p-2"
            >
              <GoPlus className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-5 flex gap-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 text-gray-600 rounded-lg w-full"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-lg w-full"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
