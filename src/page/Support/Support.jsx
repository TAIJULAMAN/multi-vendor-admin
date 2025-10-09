import { ConfigProvider, Modal, Table } from "antd";
import { IoSearch } from "react-icons/io5";
import PageHeading from "../../shared/PageHeading";
import { FaEye, FaReply } from "react-icons/fa";
import { useState } from "react";
import {
  useGetAllHelpRequestQuery,
  useSendReplyOfHelpRequestMutation,
} from "../../Redux/api/support/supportApi";

const Support = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  console.log("selectedTicket", selectedTicket);

  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [sendReplyMutation, { isLoading: isReplying }] =
    useSendReplyOfHelpRequestMutation();

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal = (record) => {
    setSelectedTicket(record);
    setIsModalOpen(true);
  };
  const openReply = (record) => {
    setSelectedTicket(record);
    setReplyMessage("");
    setIsReplyOpen(true);
  };
  const id = selectedTicket?.id;
  const closeReply = () => setIsReplyOpen(false);
  const sendReply = async () => {
    try {
      if (!id || !replyMessage.trim()) return;
      await sendReplyMutation({
        id,
        message: replyMessage.trim(),
      }).unwrap();
      setIsReplyOpen(false);
      setReplyMessage("");
    } catch (_) {
      // optionally show feedback
    }
  };

  const { data: supportData } = useGetAllHelpRequestQuery();
  console.log("supportData from support", supportData);

  const dataSource = supportData?.data?.requests?.map((item, index) => ({
    key: index + 1,
    no: index + 1,
    id: item?._id || item?.id,
    userName: item?.user?.name || "N/A",
    email: item?.user?.email || "N/A",
    message: item?.message || "N/A",
    subject: item?.subject || "N/A",
    createdAt: item?.createdAt || "N/A",
  }));

  const columns = [
    { title: "No", dataIndex: "no", key: "no" },
    {
      title: "User Name",
      key: "sellerName",
      dataIndex: "userName",
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Subject", dataIndex: "subject", key: "subject" },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => {
        if (!value) return "-";
        try {
          const d = new Date(value);
          return d.toLocaleString(undefined, {
            year: "numeric",
            month: "short",
            day: "2-digit",
          });
        } catch {
          return String(value);
        }
      },
    },
    { title: "Description", dataIndex: "message", key: "message" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        return (
          <div className="flex gap-2">
            <button
              onClick={() => showModal(record)}
              className="border border-[#14803c] rounded-lg p-2 bg-[#d3e8e6] text-[#14803c] hover:bg-[#b4d9d4] transition duration-200"
            >
              <FaEye className="w-6 h-6 text-[#14803c]" />
            </button>
            <button
              onClick={() => openReply(record)}
              className="border border-[#14803c] text-[#14803c] rounded-lg p-2 bg-[#d3e8e6] hover:bg-[#b4d9d4] transition duration-200"
            >
              <FaReply className="w-6 h-6 text-[#14803c]" />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="my-5 md:my-10 flex flex-col md:flex-row gap-5 justify-between items-center">
        <PageHeading title="Support" />
        <div className="relative w-full sm:w-[300px] mt-5 md:mt-0 lg:mt-0">
          <input
            type="text"
            placeholder="Search..."
            className="border-2 border-orange-500 py-3 pl-12 pr-[65px] outline-none w-full rounded-md"
          />
          <span className=" text-gray-600 absolute top-0 left-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer">
            <IoSearch className="text-[1.3rem]" />
          </span>
        </div>
      </div>
      <ConfigProvider
        theme={{
          components: {
            InputNumber: {
              activeBorderColor: "#14803c",
            },
            Pagination: {
              colorPrimaryBorder: "rgb(19,194,194)",
              colorBorder: "rgb(82,196,26)",
              colorTextPlaceholder: "rgb(82,196,26)",
              colorTextDisabled: "rgb(82,196,26)",
              colorBgTextActive: "rgb(82,196,26)",
              itemActiveBgDisabled: "rgb(82,196,26)",
              itemActiveColorDisabled: "rgb(0,0,0)",
              itemBg: "rgb(82,196,26)",
              colorBgTextHover: "rgb(82,196,26)",
              colorPrimary: "rgb(82,196,26)",
              colorPrimaryHover: "rgb(82,196,26)",
            },
            Table: {
              headerBg: "#14803c",
              headerColor: "rgb(255,255,255)",
              cellFontSize: 16,
              headerSplitColor: "#14803c",
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
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          width={640}
        >
          <div className="p-2 sm:p-5">
            {selectedTicket && (
              <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://avatar.iran.liara.run/public/${selectedTicket.no}`}
                      className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-full ring-2 ring-emerald-100"
                      alt="User Avatar"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {selectedTicket.userName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Ticket No: {selectedTicket.no}
                      </p>
                    </div>
                  </div>
                  {/* Subject quick view (from table) */}
                  <div className="text-sm text-gray-700 bg-gray-50 border border-gray-100 rounded-md px-3 py-2 max-w-[60%] sm:max-w-xs truncate">
                    <span className="font-medium text-gray-600 mr-1">
                      Subject:
                    </span>
                    <span title={selectedTicket.subject}>
                      {selectedTicket.subject}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-100" />

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                      No
                    </p>
                    <p className="mt-1 text-base font-medium text-gray-900">
                      {selectedTicket.no}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                      User Name
                    </p>
                    <p className="mt-1 text-base font-medium text-gray-900">
                      {selectedTicket.userName}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                      Email
                    </p>
                    <p className="mt-1 text-base font-medium text-gray-900">
                      {selectedTicket.email}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                      Subject
                    </p>
                    <p className="mt-1 text-base font-medium text-gray-900">
                      {selectedTicket.subject}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 sm:col-span-2">
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                      Date
                    </p>
                    <p className="mt-1 text-base font-medium text-gray-900">
                      {(() => {
                        const value = selectedTicket.createdAt;
                        if (!value) return "-";
                        try {
                          const d = new Date(value);
                          return d.toLocaleString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "2-digit",
                          });
                        } catch {
                          return String(value);
                        }
                      })()}
                    </p>
                  </div>
                  <div className="rounded-lg border border-gray-100 bg-white shadow-sm">
                    <div className="px-4 py-2 border-b border-gray-100 bg-gray-50 rounded-t-lg">
                      <h4 className="text-sm font-semibold text-gray-700">
                        Description
                      </h4>
                    </div>
                    <div className="p-4">
                      <p className="text-gray-700 leading-relaxed">
                        {selectedTicket.message}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Modal>
        <Modal
          open={isReplyOpen}
          centered
          onCancel={closeReply}
          footer={null}
          width={560}
        >
          <div className="p-4 sm:p-5 space-y-5">
            <div className="flex items-center gap-3">
              <img
                src={`https://avatar.iran.liara.run/public/${
                  selectedTicket?.no ?? 1
                }`}
                className="w-10 h-10 object-cover rounded-full"
                alt="User Avatar"
              />
              <div>
                <p className="text-sm text-gray-500">Message to</p>
                <p className="text-base font-medium text-gray-900">
                  {selectedTicket?.userName ?? "User"}
                </p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Message
              </label>
              <textarea
                rows={5}
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeReply}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={sendReply}
                disabled={!replyMessage.trim()}
                className="px-4 py-2 rounded-md text-white bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-700"
              >
                Send
              </button>
            </div>
          </div>
        </Modal>
      </ConfigProvider>
    </div>
  );
};

export default Support;
