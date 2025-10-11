import user from "../../assets/user.png";
import seller from "../../assets/seller.png";
import SellerGrowth from "./SellerGrowth";

import RecentSellerRequests from "./RecentSellerRequests";
import { useGetAllDashboardQuery } from "../../Redux/api/dashboard/dashboardApi";

export default function DashboardPage() {
  const { data: dashboardData } = useGetAllDashboardQuery();

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col items-center justify-center p-5  bg-[#F2F2F2] rounded-lg shadow-sm">
          <h2 className="text-gray-700 text-lg font-medium mb-2">
            Total Users
          </h2>

          <div className="rounded-full">
            <div className="flex items-center justify-center mb-2">
              <img src={user} alt="User Stats Icon" className="w-16 h-12" />
            </div>
          </div>

          <p className="text-gray-900 text-4xl font-bold">
            {new Intl.NumberFormat().format(dashboardData?.data?.total)}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center p-5 bg-[#F2F2F2] rounded-lg shadow-sm">
          <h2 className="text-gray-700 text-lg font-medium mb-2">
            Total Seller
          </h2>

          <div className="rounded-full">
            <div className="flex items-center justify-center mb-2">
              <img src={seller} alt="User Stats Icon" className="w-16 h-12" />
            </div>
          </div>

          <p className="text-gray-900 text-4xl font-bold">
            {new Intl.NumberFormat().format(dashboardData?.data?.totalSellers)}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <div className="w-full p-5 bg-[#F2F2F2] rounded-lg shadow-md">
          <SellerGrowth />
        </div>
      </div>

      <div className="mt-5">
        <h1 className="text-2xl font-bold mb-5">Recent Users</h1>
        <RecentSellerRequests />
      </div>
    </div>
  );
}
