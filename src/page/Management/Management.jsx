import { useState } from "react";
import BarManagement from "../../components/Management/BarManagement";
import ClubManagement from "../../components/Management/ClubManagement";
import RestaurantManagement from "../../components/Management/RestaurantManagement";

function Management() {
          const [activeTab, setActiveTab] = useState("bar");

          const handleTabChange = (type) => {
                    setActiveTab(type);
          };

          return (
                    <div className="min-h-screen">
                              <div className="mt-10 mb-8 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-8">
                                        <div className="flex items-center gap-[10px]">
                                                  <div
                                                            className="w-[35px] h-[35px] border-[2px] border-[#0B704E] rounded-full flex items-center justify-center cursor-pointer"
                                                            onClick={() => handleTabChange("bar")}
                                                  >
                                                            <div className={`${activeTab === "bar" ? "bg-[#0B704E] scale-[1]" : "bg-transparent scale-[0.7]"
                                                                      } w-[21px] h-[21px] transition-all duration-200 rounded-full`}></div>
                                                  </div>
                                                  <p
                                                            className="text-[1.2rem] font-bold text-text text-white cursor-pointer"
                                                            onClick={() => handleTabChange("bar")}
                                                  >
                                                            Bar Management
                                                  </p>
                                        </div>

                                        <div className="flex items-center gap-[10px]">
                                                  <div
                                                            className="w-[35px] h-[35px] border-[2px] border-[#0B704E] rounded-full flex items-center justify-center cursor-pointer"
                                                            onClick={() => handleTabChange("club")}
                                                  >
                                                            <div className={`${activeTab === "club" ? "bg-[#0B704E] scale-[1]" : "bg-transparent scale-[0.7]"
                                                                      } w-[21px] h-[21px] transition-all duration-200 rounded-full`}></div>
                                                  </div>
                                                  <p
                                                            className="text-[1.2rem] font-bold text-text text-white cursor-pointer"
                                                            onClick={() => handleTabChange("club")}
                                                  >
                                                            Club Management
                                                  </p>
                                        </div>

                                        <div className="flex items-center gap-[10px]">
                                                  <div
                                                            className="w-[35px] h-[35px] border-[2px] border-[#0B704E] rounded-full flex items-center justify-center cursor-pointer"
                                                            onClick={() => handleTabChange("restaurant")}
                                                  >
                                                            <div className={`${activeTab === "restaurant" ? "bg-[#0B704E] scale-[1]" : "bg-transparent scale-[0.7]"
                                                                      } w-[21px] h-[21px] transition-all duration-200 rounded-full`}></div>
                                                  </div>
                                                  <p
                                                            className="text-[1.2rem] font-bold text-text text-white cursor-pointer"
                                                            onClick={() => handleTabChange("restaurant")}
                                                  >
                                                            Restaurant Management
                                                  </p>
                                        </div>
                              </div>

                              <div className="mt-4">
                                        {activeTab === "bar" && <BarManagement />}
                                        {activeTab === "club" && <ClubManagement />}
                                        {activeTab === "restaurant" && <RestaurantManagement />}
                              </div>
                    </div>
          );
}

export default Management;