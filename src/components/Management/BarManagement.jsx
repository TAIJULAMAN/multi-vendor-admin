import { ConfigProvider, Modal, Table } from "antd";
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { MdBlockFlipped } from "react-icons/md";

function BarManagement() {
          const [isModalOpen, setIsModalOpen] = useState(false);
          const [isViewModalOpen, setIsViewModalOpen] = useState(false);
          const [selectedBar, setSelectedBar] = useState(null);

          const handleOk = () => {
                    setIsModalOpen(false);
          };

          const handleCancel = () => {
                    setIsModalOpen(false);
                    setIsViewModalOpen(false);
          };

          const handleView = (record) => {
                    setSelectedBar(record);
                    setIsViewModalOpen(true);
          };

          const dataSource = [
                    { key: "1", no: "1", name: "The Rusty Tap", coverCharge: "$10", date: "05/03/2025", phone: "+1 9876543210", email: "johndoe@example.com", location: "New York, USA", image: "/bar.png", },
                    { key: "2", no: "2", name: "The Rusty Tap", coverCharge: "$15", date: "05/04/2025", phone: "+1 1234567890", email: "janesmith@example.com", location: "Los Angeles, USA", image: "https://avatar.iran.liara.run/public/2", },
                    { key: "3", no: "3", name: "The Rusty Tap", coverCharge: "$12", date: "05/05/2025", phone: "+1 2223334444", email: "carlosg@example.com", location: "Miami, USA", image: "https://avatar.iran.liara.run/public/3", },
                    { key: "4", no: "4", name: "The Drunken Owl", coverCharge: "$20", date: "05/06/2025", phone: "+1 4445556666", email: "emilychen@example.com", location: "San Francisco, USA", image: "https://avatar.iran.liara.run/public/4", },
                    { key: "5", no: "5", name: "Moonlight & Martinis", coverCharge: "$8", date: "05/07/2025", phone: "+1 5556667777", email: "liamb@example.com", location: "Chicago, USA", image: "https://avatar.iran.liara.run/public/5", },
                    { key: "6", no: "6", name: "Velvet Lounge", coverCharge: "$18", date: "05/08/2025", phone: "+1 7778889999", email: "oliviad@example.com", location: "Seattle, USA", image: "https://avatar.iran.liara.run/public/6", },
                    { key: "7", no: "7", name: "Neon Nectar", coverCharge: "$9", date: "05/09/2025", phone: "+1 9998887777", email: "noahw@example.com", location: "Boston, USA", image: "https://avatar.iran.liara.run/public/7", },
                    { key: "8", no: "8", name: "The Rusty Tap", coverCharge: "$16", date: "05/10/2025", phone: "+1 1112223333", email: "sophiam@example.com", location: "Austin, USA", image: "https://avatar.iran.liara.run/public/8", },
                    { key: "9", no: "9", name: "Moonlight & Martinis", coverCharge: "$13", date: "05/11/2025", phone: "+1 3334445555", email: "ethanl@example.com", location: "Dallas, USA", image: "https://avatar.iran.liara.run/public/9", },
                    { key: "10", no: "10", name: "The Drunken Owlr", coverCharge: "$11", date: "05/12/2025", phone: "+1 8889990000", email: "isabellaw@example.com", location: "Denver, USA", image: "https://avatar.iran.liara.run/public/10", },
                    { key: "11", no: "11", name: "Velvet Lounge", coverCharge: "$14", date: "05/13/2025", phone: "+1 1010101010", email: "masonh@example.com", location: "Phoenix, USA", image: "https://avatar.iran.liara.run/public/11", },
                    { key: "12", no: "12", name: "Neon Nectar", coverCharge: "$17", date: "05/14/2025", phone: "+1 2020202020", email: "avaa@example.com", location: "Portland, USA", image: "https://avatar.iran.liara.run/public/12", },
                    { key: "13", no: "13", name: "The Rusty Tap", coverCharge: "$10", date: "05/15/2025", phone: "+1 3030303030", email: "logany@example.com", location: "Philadelphia, USA", image: "https://avatar.iran.liara.run/public/13", },
                    { key: "14", no: "14", name: "The Rusty Tap", coverCharge: "$19", date: "05/16/2025", phone: "+1 4040404040", email: "miah@example.com", location: "San Diego, USA", image: "https://avatar.iran.liara.run/public/14", },
                    { key: "15", no: "15", name: "The Rusty Tap", coverCharge: "$12", date: "05/17/2025", phone: "+1 5050505050", email: "lucask@example.com", location: "Atlanta, USA", image: "https://avatar.iran.liara.run/public/15", },
                    { key: "16", no: "16", name: "The Rusty Tap", coverCharge: "$15", date: "05/18/2025", phone: "+1 6060606060", email: "charlottew@example.com", location: "Houston, USA", image: "https://avatar.iran.liara.run/public/16", },
                    { key: "17", no: "17", name: "The Rusty Tap", coverCharge: "$9", date: "05/19/2025", phone: "+1 7070707070", email: "benjamins@example.com", location: "Las Vegas, USA", image: "https://avatar.iran.liara.run/public/17", },
                    { key: "18", no: "18", name: "The Rusty Tap", coverCharge: "$13", date: "05/20/2025", phone: "+1 8080808080", email: "ameliag@example.com", location: "Orlando, USA", image: "https://avatar.iran.liara.run/public/18", },
                    { key: "19", no: "19", name: "The Rusty Tap", coverCharge: "$11", date: "05/21/2025", phone: "+1 9090909090", email: "jamesb@example.com", location: "Charlotte, USA", image: "https://avatar.iran.liara.run/public/19", },
                    { key: "20", no: "20", name: "The Rusty Tap", coverCharge: "$10", date: "05/22/2025", phone: "+1 1212121212", email: "harpera@example.com", location: "Tampa, USA", image: "https://avatar.iran.liara.run/public/20", },
                    { key: "21", no: "21", name: "The Rusty Tap", coverCharge: "$14", date: "05/23/2025", phone: "+1 2323232323", email: "alexn@example.com", location: "Detroit, USA", image: "https://avatar.iran.liara.run/public/21", },
                    { key: "22", no: "22", name: "The Rusty Tap", coverCharge: "$18", date: "05/24/2025", phone: "+1 3434343434", email: "evelync@example.com", location: "Cleveland, USA", image: "https://avatar.iran.liara.run/public/22", },
                    { key: "23", no: "23", name: "The Rusty Tap", coverCharge: "$16", date: "05/25/2025", phone: "+1 4545454545", email: "danielm@example.com", location: "Indianapolis, USA", image: "https://avatar.iran.liara.run/public/23", },
                    { key: "24", no: "24", name: "The Rusty Tap", coverCharge: "$19", date: "05/26/2025", phone: "+1 5656565656", email: "ellap@example.com", location: "San Antonio, USA", image: "https://avatar.iran.liara.run/public/24", },
                    { key: "25", no: "25", name: "The Rusty Tap", coverCharge: "$8", date: "05/27/2025", phone: "+1 6767676767", email: "matthewr@example.com", location: "Nashville, USA", image: "https://avatar.iran.liara.run/public/25", },
                    { key: "26", no: "26", name: "The Rusty Tap", coverCharge: "$20", date: "05/28/2025", phone: "+1 7878787878", email: "abigailt@example.com", location: "Kansas City, USA", image: "https://avatar.iran.liara.run/public/26", },
                    { key: "27", no: "27", name: "The Rusty Tap", coverCharge: "$17", date: "05/29/2025", phone: "+1 8989898989", email: "sebastianp@example.com", location: "Cincinnati, USA", image: "https://avatar.iran.liara.run/public/27", },
                    { key: "28", no: "28", name: "The Rusty Tap", coverCharge: "$13", date: "05/30/2025", phone: "+1 9091919191", email: "scarlettc@example.com", location: "Columbus, USA", image: "https://avatar.iran.liara.run/public/28", },
                    { key: "29", no: "29", name: "The Rusty Tap", coverCharge: "$12", date: "05/31/2025", phone: "+1 9292929292", email: "jackm@example.com", location: "Milwaukee, USA", image: "https://avatar.iran.liara.run/public/29", },
                    { key: "30", no: "30", name: "The Rusty Tap", coverCharge: "$11", date: "06/01/2025", phone: "+1 9393939393", email: "gracer@example.com", location: "Salt Lake City, USA", image: "https://avatar.iran.liara.run/public/30", },
          ];

          const columns = [
                    {
                              title: "No",
                              dataIndex: "no",
                              key: "no",
                              width: 70,
                              fixed: 'left',
                              align: 'center'
                    },
                    {
                              title: "Bar Name",
                              dataIndex: "name",
                              key: "name",
                              width: 200,
                              fixed: 'left',
                              ellipsis: true
                    },
                    {
                              title: "Email",
                              dataIndex: "email",
                              key: "email",
                              width: 250,
                              ellipsis: true
                    },
                    {
                              title: "Phone",
                              dataIndex: "phone",
                              key: "phone",
                              width: 150
                    },
                    {
                              title: "Total Participants",
                              key: "participants",
                              width: 250,
                              render: () => (
                                        <div className="flex -space-x-4">
                                                  <img
                                                            className="h-10 w-10 rounded-full ring-2 ring-white inline-block"
                                                            src="https://i.ibb.co.com/RvFgZC8/aman.png"
                                                            alt="avatar"
                                                  />
                                                  <img
                                                            className="h-10 w-10 rounded-full ring-2 ring-white inline-block"
                                                            src="https://i.ibb.co.com/RvFgZC8/aman.png"
                                                            alt="avatar"
                                                  />
                                                  <img
                                                            className="h-10 w-10 rounded-full ring-2 ring-white inline-block"
                                                            src="https://i.ibb.co.com/RvFgZC8/aman.png"
                                                            alt="avatar"
                                                  />
                                                  <img
                                                            className="h-10 w-10 rounded-full ring-2 ring-white inline-block"
                                                            src="https://i.ibb.co.com/RvFgZC8/aman.png"
                                                            alt="avatar"
                                                  />
                                        </div>
                              ),
                    },
                    {
                              title: "Action",
                              key: "action",
                              width: 120,
                              fixed: 'right',
                              align: 'center',
                              render: (_, record) => (
                                        <div className="flex gap-2 justify-center">
                                                  <button
                                                            onClick={() => handleView(record)}
                                                            className="bg-[#0B704E] text-white font-semibold py-2 px-3 rounded-lg"
                                                  >
                                                            <IoEyeOutline className="w-5 h-5" />
                                                  </button>
                                                  <button
                                                            onClick={() => setIsModalOpen(true)}
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
                                                            Table: {
                                                                      headerBg: "#0B704E",
                                                                      headerColor: "rgb(255,255,255)",
                                                                      rowHoverBg: "#E6F4F1",
                                                                      cellFontSize: 16,
                                                                      headerSplitColor: "#0B704E",
                                                            },
                                                            Pagination: {
                                                                      colorPrimaryBorder: "rgb(32,84,6)",
                                                                      colorBorder: "rgb(42,108,9)",
                                                                      colorPrimary: "rgb(37,102,5)",
                                                                      colorPrimaryHover: "rgb(19,194,194)",
                                                                      colorText: "rgb(19,194,194)",
                                                                      itemSize: 30,
                                                                      controlOutline: "rgb(19,194,194)"
                                                            },
                                                  },
                                        }}
                              >
                                        <div className="overflow-x-auto">
                                                  <div className="min-w-full inline-block align-middle">
                                                            <div className="overflow-hidden border border-gray-200 rounded-lg">
                                                                      <Table
                                                                                 dataSource={dataSource}
                                                                                 columns={columns}
                                                                                 pagination={{ pageSize: 10 }}
                                                                                 scroll={{ x: "max-content" }}
                                                                      />
                                                            </div>
                                                  </div>
                                        </div>
                              </ConfigProvider>

                              {/* Block Confirmation Modal */}
                              <Modal
                                        open={isModalOpen}
                                        onOk={handleOk}
                                        onCancel={handleCancel}
                                        footer={null}
                              >
                                        <div className="flex flex-col justify-center items-center p-5">
                                                  <h1 className="text-xl text-center text-[#0B704E]">
                                                            Are you sure!
                                                  </h1>
                                                  <p>Do you want to Block your Users profile?</p>
                                                  <div className="flex gap-4 mt-5">
                                                            <button
                                                                      onClick={handleOk}
                                                                      className="bg-[#0B704E] text-white font-semibold w-full py-2 px-5 rounded transition duration-200"
                                                            >
                                                                      CONFIRM
                                                            </button>
                                                            <button
                                                                      onClick={handleCancel}
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
                                        onCancel={handleCancel}
                                        footer={null}
                                        width={700}
                              >
                                        {selectedBar && (
                                                  <div className="p-4">
                                                            {/* Header Section */}
                                                            <div className="flex flex-col md:flex-row gap-6 mb-8 bg-gray-50 p-6 rounded-lg">
                                                                      <div className="w-full md:w-1/3">
                                                                                <img
                                                                                          src={selectedBar.image || "https://images.unsplash.com/photo-1572116469696-31de0f17cc34"}
                                                                                          alt={selectedBar.name}
                                                                                          className="w-full h-48 object-cover rounded-lg shadow-lg"
                                                                                />
                                                                      </div>
                                                                      <div className="w-full md:w-2/3">
                                                                                <h2 className="text-2xl font-bold text-[#0B704E] mb-2">{selectedBar.name}</h2>
                                                                                <div className="space-y-2">
                                                                                          <div className="flex items-center gap-2">
                                                                                                    <span className="text-gray-600">Total Participants:</span>
                                                                                                    <span className="font-semibold">240</span>
                                                                                          </div>
                                                                                          <div className="flex items-center gap-2">
                                                                                                    <span className="text-gray-600">Cover Charge:</span>
                                                                                                    <span className="font-semibold text-[#0B704E]">{selectedBar.coverCharge}</span>
                                                                                          </div>
                                                                                          <div className="flex items-center gap-2">
                                                                                                    <span className="text-gray-600">Location:</span>
                                                                                                    <span className="font-semibold">{selectedBar.location}</span>
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
                                                                                                              <span className="text-gray-900">{selectedBar.email}</span>
                                                                                                    </div>
                                                                                                    <div className="flex items-center">
                                                                                                              <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                                                                              </svg>
                                                                                                              <span className="text-gray-900">{selectedBar.phone}</span>
                                                                                                    </div>
                                                                                          </div>
                                                                                </div>

                                                                                <div>
                                                                                          <h3 className="text-sm font-medium text-gray-500">Features</h3>
                                                                                          <div className="mt-2 flex flex-wrap gap-2">
                                                                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                                                                                              Live Music
                                                                                                    </span>
                                                                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                                                                                              Outdoor Seating
                                                                                                    </span>
                                                                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                                                                                                              Full Bar
                                                                                                    </span>
                                                                                          </div>
                                                                                </div>
                                                                      </div>

                                                                      <div className="space-y-6">
                                                                                <div>
                                                                                          <h3 className="text-sm font-medium text-gray-500">Recent Participants</h3>
                                                                                          <div className="mt-2">
                                                                                                    <div className="flex flex-wrap gap-2">
                                                                                                              {[1, 2, 3, 4, 5].map((participant) => (
                                                                                                                        <img
                                                                                                                                  key={participant}
                                                                                                                                  className="h-10 w-10 rounded-full ring-2 ring-white"
                                                                                                                                  src={`https://i.pravatar.cc/150?img=${participant}`}
                                                                                                                                  alt={`Participant ${participant}`}
                                                                                                                        />
                                                                                                              ))}
                                                                                                              <button className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
                                                                                                                        <span className="text-sm font-medium">+12</span>
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
                                                                                                              Active
                                                                                                    </span>
                                                                                          </div>
                                                                                </div>
                                                                      </div>
                                                            </div>

                                                            {/* Bar Owner Information */}
                                                            <div className="mt-8 pt-6 border-t border-gray-200">
                                                                      <h3 className="text-sm font-medium text-gray-500 mb-4">Bar Owner Information</h3>
                                                                      <div className="flex items-start space-x-6">
                                                                                <div className="flex-shrink-0">
                                                                                          <img
                                                                                                    src="https://avatar.iran.liara.run/public/30"
                                                                                                    alt="MD. Hassan Ahamend"
                                                                                                    className="h-24 w-24 object-cover rounded-lg shadow-md"
                                                                                          />
                                                                                </div>
                                                                                <div className="flex-1">
                                                                                          <div className="grid grid-cols-2 gap-4">
                                                                                                    <div>
                                                                                                              <div className="text-sm text-gray-500">Name</div>
                                                                                                              <div className="mt-1 text-sm font-medium text-gray-900">MD. Hassan Ahamend</div>
                                                                                                    </div>
                                                                                                    <div>
                                                                                                              <div className="text-sm text-gray-500">Email</div>
                                                                                                              <div className="mt-1 text-sm font-medium text-gray-900">mstkhushiakter333@gmail.com</div>
                                                                                                    </div>
                                                                                                    <div>
                                                                                                              <div className="text-sm text-gray-500">Contact Info</div>
                                                                                                              <div className="mt-1 text-sm font-medium text-gray-900">+99 489 494595 4992</div>
                                                                                                    </div>
                                                                                                    <div>
                                                                                                              <div className="text-sm text-gray-500">Location</div>
                                                                                                              <div className="mt-1 text-sm font-medium text-gray-900">Stockton, New Hampshire</div>
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
                    </div>
          );
}

export default BarManagement;