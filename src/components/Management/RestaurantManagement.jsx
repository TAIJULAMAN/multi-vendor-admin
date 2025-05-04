import { ConfigProvider, Modal, Table } from "antd";
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { MdBlockFlipped } from "react-icons/md";

function RestaurantManagement() {
          const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
          const [isViewModalOpen, setIsViewModalOpen] = useState(false);
          const [selectedRestaurant, setSelectedRestaurant] = useState(null);

          const handleBlockOk = () => {
                    setIsBlockModalOpen(false);
          };

          const handleBlockCancel = () => {
                    setIsBlockModalOpen(false);
          };

          const handleView = (record) => {
                    setSelectedRestaurant(record);
                    setIsViewModalOpen(true);
          };

          const handleViewCancel = () => {
                    setIsViewModalOpen(false);
          };

          const dataSource = [
                    { key: "1", no: "1", name: "John Doe", date: "05/03/2025", phone: "+1 9876543210", email: "johndoe@example.com", location: "New York, USA", tableNo: "100" },
                    { key: "2", no: "2", name: "Jane Smith", date: "05/04/2025", phone: "+1 1234567890", email: "janesmith@example.com", location: "Los Angeles, USA", tableNo: "20" },
                    { key: "3", no: "3", name: "Carlos Gomez", date: "05/05/2025", phone: "+1 2223334444", email: "carlosg@example.com", location: "Miami, USA", tableNo: "30" },
                    { key: "4", no: "4", name: "Emily Chen", date: "05/06/2025", phone: "+1 4445556666", email: "emilychen@example.com", location: "San Francisco, USA", tableNo: "40" },
                    { key: "5", no: "5", name: "Liam Brown", date: "05/07/2025", phone: "+1 5556667777", email: "liamb@example.com", location: "Chicago, USA", tableNo: "50" },
                    { key: "6", no: "6", name: "Olivia Davis", date: "05/08/2025", phone: "+1 7778889999", email: "oliviad@example.com", location: "Seattle, USA", tableNo: "60" },
                    { key: "7", no: "7", name: "Noah Wilson", date: "05/09/2025", phone: "+1 9998887777", email: "noahw@example.com", location: "Boston, USA", tableNo: "70" },
                    { key: "8", no: "8", name: "Sophia Martinez", date: "05/10/2025", phone: "+1 1112223333", email: "sophiam@example.com", location: "Austin, USA", tableNo: "89" },
                    { key: "9", no: "9", name: "Ethan Lee", date: "05/11/2025", phone: "+1 3334445555", email: "ethanl@example.com", location: "Dallas, USA", tableNo: "99" },
                    { key: "10", no: "10", name: "Isabella White", date: "05/12/2025", phone: "+1 8889990000", email: "isabellaw@example.com", location: "Denver, USA", tableNo: "100" },
                    { key: "11", no: "11", name: "Mason Hall", date: "05/13/2025", phone: "+1 1010101010", email: "masonh@example.com", location: "Phoenix, USA", tableNo: "101" },
                    { key: "12", no: "12", name: "Ava Allen", date: "05/14/2025", phone: "+1 2020202020", email: "avaa@example.com", location: "Portland, USA", tableNo: "102" },
                    { key: "13", no: "13", name: "Logan Young", date: "05/15/2025", phone: "+1 3030303030", email: "logany@example.com", location: "Philadelphia, USA", tableNo: "103" },
                    { key: "14", no: "14", name: "Mia Hernandez", date: "05/16/2025", phone: "+1 4040404040", email: "miah@example.com", location: "San Diego, USA", tableNo: "104" },
                    { key: "15", no: "15", name: "Lucas King", date: "05/17/2025", phone: "+1 5050505050", email: "lucask@example.com", location: "Atlanta, USA", tableNo: "105" },
                    { key: "16", no: "16", name: "Charlotte Wright", date: "05/18/2025", phone: "+1 6060606060", email: "charlottew@example.com", location: "Houston, USA", tableNo: "106" },
                    { key: "17", no: "17", name: "Benjamin Scott", date: "05/19/2025", phone: "+1 7070707070", email: "benjamins@example.com", location: "Las Vegas, USA", tableNo: "107" },
                    { key: "18", no: "18", name: "Amelia Green", date: "05/20/2025", phone: "+1 8080808080", email: "ameliag@example.com", location: "Orlando, USA", tableNo: "108" },
                    { key: "19", no: "19", name: "James Baker", date: "05/21/2025", phone: "+1 9090909090", email: "jamesb@example.com", location: "Charlotte, USA", tableNo: "109" },
                    { key: "20", no: "20", name: "Harper Adams", date: "05/22/2025", phone: "+1 1212121212", email: "harpera@example.com", location: "Tampa, USA", tableNo: "110" },
                    { key: "21", no: "21", name: "Alexander Nelson", date: "05/23/2025", phone: "+1 2323232323", email: "alexn@example.com", location: "Detroit, USA", tableNo: "111" },
                    { key: "22", no: "22", name: "Evelyn Carter", date: "05/24/2025", phone: "+1 3434343434", email: "evelync@example.com", location: "Cleveland, USA", tableNo: "112" },
                    { key: "23", no: "23", name: "Daniel Mitchell", date: "05/25/2025", phone: "+1 4545454545", email: "danielm@example.com", location: "Indianapolis, USA", tableNo: "113" },
                    { key: "24", no: "24", name: "Ella Perez", date: "05/26/2025", phone: "+1 5656565656", email: "ellap@example.com", location: "San Antonio, USA", tableNo: "114" },
                    { key: "25", no: "25", name: "Matthew Roberts", date: "05/27/2025", phone: "+1 6767676767", email: "matthewr@example.com", location: "Nashville, USA", tableNo: "115" },
                    { key: "26", no: "26", name: "Abigail Turner", date: "05/28/2025", phone: "+1 7878787878", email: "abigailt@example.com", location: "Kansas City, USA", tableNo: "116" },
                    { key: "27", no: "27", name: "Sebastian Phillips", date: "05/29/2025", phone: "+1 8989898989", email: "sebastianp@example.com", location: "Cincinnati, USA", tableNo: "117" },
                    { key: "28", no: "28", name: "Scarlett Campbell", date: "05/30/2025", phone: "+1 9091919191", email: "scarlettc@example.com", location: "Columbus, USA", tableNo: "118" },
                    { key: "29", no: "29", name: "Jack Morris", date: "05/31/2025", phone: "+1 9292929292", email: "jackm@example.com", location: "Milwaukee, USA", tableNo: "119" },
                    { key: "30", no: "30", name: "Grace Rogers", date: "06/01/2025", phone: "+1 9393939393", email: "gracer@example.com", location: "Salt Lake City, USA", tableNo: "120" },
          ];


          const columns = [
                    {
                              title: "No",
                              dataIndex: "no",
                              key: "no",
                    },
                    {
                              title: "Restaurant Name",
                              dataIndex: "name",
                              key: "name",
                    },
                    {
                              title: "Email",
                              dataIndex: "email",
                              key: "email",
                    },
                    {
                              title: "Location",
                              dataIndex: "location",
                              key: "location",
                    },
                    {
                              title: "Table No",
                              dataIndex: "tableNo",
                              key: "tableNo",
                    },
                    {
                              title: "Action",
                              key: "action",
                              render: (record) => (
                                        <div className="flex gap-2 text-center py-2">
                                                  <button
                                                            className="bg-[#0B704E] text-white font-semibold py-2 px-3 rounded-lg"
                                                            onClick={() => handleView(record)}
                                                  >
                                                            <IoEyeOutline className="w-5 h-5" />
                                                  </button>
                                                  <button
                                                            onClick={() => setIsBlockModalOpen(true)}
                                                            className="bg-[#A80608] text-white font-semibold py-2 px-3 rounded-lg"
                                                  >
                                                            <MdBlockFlipped className="w-5 h-5" />
                                                  </button>
                                        </div>
                              ),
                    },
          ];

          return (
                    <div className="min-h-screen my-5 md:my-10 lg:my-10">
                              <ConfigProvider
                                        theme={{
                                                  components: {
                                                            InputNumber: {
                                                                      activeBorderColor: "rgb(19,194,194)",
                                                            },
                                                            Pagination: {
                                                                      colorPrimaryBorder: "rgb(32,84,6)",
                                                                      colorBorder: "rgb(42,108,9)",
                                                                      colorPrimary: "rgb(37,102,5)",
                                                                      colorPrimaryHover: "rgb(19,194,194)",
                                                                      colorText: "rgb(19,194,194)",
                                                                      itemSize: 40,
                                                                      controlOutline: "rgb(19,194,194)"
                                                            },
                                                            Table: {
                                                                      headerBg: "#0B704E",
                                                                      headerColor: "rgb(255,255,255)",
                                                                      cellFontSize: 20,
                                                                      headerSplitColor: "#0B704E",
                                                            },
                                                  },
                                        }}
                              >
                                        <Table
                                                  dataSource={dataSource}
                                                  columns={columns}
                                                  pagination={{ pageSize: 10 }}
                                                  scroll={{ x: "max-content" }}
                                        />
                                        <Modal
                                                  open={isBlockModalOpen}
                                                  centered
                                                  onCancel={handleBlockCancel}
                                                  footer={null}
                                        >
                                                  <div className="flex flex-col justify-center items-center p-5">
                                                            <h1 className="text-xl text-center text-[#0B704E]">
                                                                      Are you sure!
                                                            </h1>
                                                            <p>Do you want to Block your Users profile?</p>
                                                            <div className="flex gap-4 mt-5">
                                                                      <button
                                                                                onClick={handleBlockOk}
                                                                                className="bg-[#0B704E] text-white font-semibold w-full py-2 px-5 rounded transition duration-200"
                                                                      >
                                                                                CONFIRM
                                                                      </button>
                                                                      <button
                                                                                onClick={handleBlockCancel}
                                                                                className="bg-[#A80608] text-white font-semibold w-full py-2 px-5 rounded transition duration-200"
                                                                      >
                                                                                CANCEL
                                                                      </button>
                                                            </div>
                                                  </div>
                                        </Modal>

                                        {/* View Details Modal */}
                                        <Modal
                                                  title={null}
                                                  open={isViewModalOpen}
                                                  onCancel={handleViewCancel}
                                                  footer={null}
                                                  width={700}
                                        >
                                                  {selectedRestaurant && (
                                                            <div className="p-4">
                                                                      {/* Header Section */}
                                                                      <div className="flex flex-col md:flex-row gap-6 mb-8 bg-gray-50 p-6 rounded-lg">
                                                                                <div className="w-full md:w-1/3">
                                                                                          <img
                                                                                                    src={selectedRestaurant.image || "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"}
                                                                                                    alt={selectedRestaurant.name}
                                                                                                    className="w-full h-48 object-cover rounded-lg shadow-lg"
                                                                                          />
                                                                                </div>
                                                                                <div className="w-full md:w-2/3">
                                                                                          <h2 className="text-2xl font-bold text-[#0B704E] mb-2">{selectedRestaurant.name}</h2>
                                                                                          <div className="space-y-2">
                                                                                                    <div className="flex items-center gap-2">
                                                                                                              <span className="text-gray-600">Total Tables:</span>
                                                                                                              <span className="font-semibold">{selectedRestaurant.tableNo}</span>
                                                                                                    </div>
                                                                                                    <div className="flex items-center gap-2">
                                                                                                              <span className="text-gray-600">Average Price:</span>
                                                                                                              <span className="font-semibold text-[#0B704E]">$25-35</span>
                                                                                                    </div>
                                                                                                    <div className="flex items-center gap-2">
                                                                                                              <span className="text-gray-600">Location:</span>
                                                                                                              <span className="font-semibold">{selectedRestaurant.location}</span>
                                                                                                    </div>
                                                                                          </div>
                                                                                </div>
                                                                      </div>

                                                                      {/* Details Grid */}
                                                                      <div className="grid grid-cols-2 gap-6">
                                                                                <div className="space-y-6">
                                                                                          <div>
                                                                                                    <h3 className="text-sm font-medium text-gray-500">Contact Information</h3>
                                                                                                    <div className="mt-2 space-y-3">
                                                                                                              <div className="flex items-center">
                                                                                                                        <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                                                                                        </svg>
                                                                                                                        <span className="text-gray-900">{selectedRestaurant.email}</span>
                                                                                                              </div>
                                                                                                              <div className="flex items-center">
                                                                                                                        <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                                                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                                                                                        </svg>
                                                                                                                        <span className="text-gray-900">{selectedRestaurant.phone}</span>
                                                                                                              </div>
                                                                                                    </div>
                                                                                          </div>

                                                                                          <div>
                                                                                                    <h3 className="text-sm font-medium text-gray-500">Features</h3>
                                                                                                    <div className="mt-2 flex flex-wrap gap-2">
                                                                                                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                                                                                        Fine Dining
                                                                                                              </span>
                                                                                                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                                                                                                        Private Rooms
                                                                                                              </span>
                                                                                                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                                                                                                                        Wine Selection
                                                                                                              </span>
                                                                                                    </div>
                                                                                          </div>
                                                                                </div>

                                                                                <div className="space-y-6">
                                                                                          <div>
                                                                                                    <h3 className="text-sm font-medium text-gray-500">Recent Reservations</h3>
                                                                                                    <div className="mt-2">
                                                                                                              <div className="flex flex-wrap gap-2">
                                                                                                                        {[1, 2, 3, 4, 5].map((reservation) => (
                                                                                                                                  <img
                                                                                                                                            key={reservation}
                                                                                                                                            className="h-10 w-10 rounded-full ring-2 ring-white"
                                                                                                                                            src={`https://i.pravatar.cc/150?img=${reservation}`}
                                                                                                                                            alt={`Guest ${reservation}`}
                                                                                                                                  />
                                                                                                                        ))}
                                                                                                                        <button className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
                                                                                                                                  <span className="text-sm font-medium">+8</span>
                                                                                                                        </button>
                                                                                                              </div>
                                                                                                    </div>
                                                                                          </div>

                                                                                          <div>
                                                                                                    <h3 className="text-sm font-medium text-gray-500">Status</h3>
                                                                                                    <div className="mt-2">
                                                                                                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                                                                                        <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 8 8">
                                                                                                                                  <circle cx="4" cy="4" r="3" />
                                                                                                                        </svg>
                                                                                                                        Open
                                                                                                              </span>
                                                                                                    </div>
                                                                                          </div>
                                                                                </div>
                                                                      </div>

                                                                      {/* Restaurant Owner Information */}
                                                                      <div className="mt-8 pt-6 border-t border-gray-200">
                                                                                <h3 className="text-sm font-medium text-gray-500 mb-4">Restaurant Owner Information</h3>
                                                                                <div className="flex items-start space-x-6">
                                                                                          <div className="flex-shrink-0">
                                                                                                    <img
                                                                                                              src="https://avatar.iran.liara.run/public/31"
                                                                                                              alt="Restaurant Owner"
                                                                                                              className="h-24 w-24 object-cover rounded-lg shadow-md"
                                                                                                    />
                                                                                          </div>
                                                                                          <div className="flex-1">
                                                                                                    <div className="grid grid-cols-2 gap-4">
                                                                                                              <div>
                                                                                                                        <div className="text-sm text-gray-500">Name</div>
                                                                                                                        <div className="mt-1 text-sm font-medium text-gray-900">Sarah Johnson</div>
                                                                                                              </div>
                                                                                                              <div>
                                                                                                                        <div className="text-sm text-gray-500">Email</div>
                                                                                                                        <div className="mt-1 text-sm font-medium text-gray-900">sarah@restaurant.com</div>
                                                                                                              </div>
                                                                                                              <div>
                                                                                                                        <div className="text-sm text-gray-500">Contact Info</div>
                                                                                                                        <div className="mt-1 text-sm font-medium text-gray-900">+1 234 567 8900</div>
                                                                                                              </div>
                                                                                                              <div>
                                                                                                                        <div className="text-sm text-gray-500">Location</div>
                                                                                                                        <div className="mt-1 text-sm font-medium text-gray-900">Manhattan, New York</div>
                                                                                                              </div>
                                                                                                    </div>
                                                                                                    <div className="mt-4">
                                                                                                              <div className="text-sm text-gray-500">Documentation</div>
                                                                                                              <div className="mt-2">
                                                                                                                        <a
                                                                                                                                  href="#"
                                                                                                                                  className="inline-flex items-center px-3 py-2 rounded-md text-sm font-medium bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                                                                                                                        >
                                                                                                                                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                                                                            <path d="M7 18H17V16H7V18Z" fill="currentColor" />
                                                                                                                                            <path d="M17 14H7V12H17V14Z" fill="currentColor" />
                                                                                                                                            <path d="M7 10H11V8H7V10Z" fill="currentColor" />
                                                                                                                                            <path fillRule="evenodd" clipRule="evenodd" d="M6 2C4.34315 2 3 3.34315 3 5V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V9C21 5.13401 17.866 2 14 2H6ZM6 4H13V9H19V19C19 19.5523 18.5523 20 18 20H6C5.44772 20 5 19.5523 5 19V5C5 4.44772 5.44772 4 6 4ZM15 4.10002C16.6113 4.4271 17.9413 5.52906 18.584 7H15V4.10002Z" fill="currentColor" />
                                                                                                                                  </svg>
                                                                                                                                  View Documentation
                                                                                                                        </a>
                                                                                                              </div>
                                                                                                    </div>
                                                                                          </div>
                                                                                </div>
                                                                      </div>
                                                            </div>
                                                  )}
                                        </Modal>
                              </ConfigProvider>
                    </div>
          );
}

export default RestaurantManagement;