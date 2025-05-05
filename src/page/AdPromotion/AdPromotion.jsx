/* eslint-disable react/prop-types */
import { useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import img1 from "../../assets/ads.png";
import img2 from "../../assets/ads2.png";
import img3 from "../../assets/ads3.png";

export default function AdPromotion() {
  const campaigns = [
    {
      id: 1,
      title: "Advertisement 1",
      image: img1,
      startDate: "05/4/25",
      endDate: "05/4/25",
    },
    {
      id: 3,
      title: "Advertisement 3",
      image: img2,
      startDate: "05/4/25",
      endDate: "05/4/25",
    },
    {
      id: 2,
      title: "Advertisement 2",
      image: img3,
      startDate: "05/4/25",
      endDate: "05/4/25",
    },
  ];

  return (
    <div className="p-6 bg-neutral-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Ad Campaigns</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <AdCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
}

function AdCard({ campaign }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-amber-200 rounded-lg overflow-hidden shadow-md">
      <div className="p-4 pb-0">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold text-lg">{campaign.title}</h2>

          {/* Dropdown Menu */}
          <div className="relative">
            <button
              className="p-1 rounded-full hover:bg-black/10 transition-colors"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <FiMoreVertical className="h-5 w-5" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg">
                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                  Edit
                </button>
                <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                  Duplicate
                </button>
                <button className="block px-4 py-2 text-sm text-red-500 hover:bg-red-100">
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <img
          src={campaign.image}
          alt={campaign.title}
          className="w-full rounded-lg"
        />
      </div>

      <div className="grid grid-cols-2 text-center p-5 mt-5">
        <div className="flex flex-col">
          <span className="text-xl text-gray-800 mb-2 flex justify-start text-start">
            Start day
          </span>
          <span className="text-lg text-gray-800 flex justify-start text-start">
            {campaign.startDate}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl text-gray-800 mb-2 flex justify-end text-end">
            End day
          </span>
          <span className="text-lg text-gray-800 flex justify-end text-end">
            {campaign.endDate}
          </span>
        </div>
      </div>
    </div>
  );
}
