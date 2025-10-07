import { Modal, message, Spin } from "antd";
import { useState, useMemo } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import PageHeading from "../../shared/PageHeading";
import {
  useGetAllFaqQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} from "../../Redux/api/faqApi";

const Faq = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(0);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // API hooks
  const { data: listRes, isLoading: listLoading } = useGetAllFaqQuery({});
  const [createFaq, { isLoading: createLoading }] = useCreateFaqMutation();
  const [updateFaq, { isLoading: updateLoading }] = useUpdateFaqMutation();
  const [deleteFaq, { isLoading: deleteLoading }] = useDeleteFaqMutation();

  const faqs = useMemo(() => listRes?.data?.faqs || [], [listRes]);

  const handleClick = (index) => {
    setIsAccordionOpen((prevIndex) => (prevIndex === index ? null : index));
  };
  const openDeleteModal = (id) => {
    setSelectedId(id);
    setDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setSelectedId(null);
    setDeleteModalOpen(false);
  };
  const handleCancel2 = () => {
    setAddModalOpen(false);
  };
  const handleCancel3 = () => {
    setUpdateModalOpen(false);
  };
  const showModal2 = () => {
    setQuestion("");
    setAnswer("");
    setAddModalOpen(true);
  };
  const showModal3 = (faq) => {
    setSelectedId(faq?._id);
    setQuestion(faq?.question || "");
    setAnswer(faq?.answer || "");
    setUpdateModalOpen(true);
  };

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleCreate = async () => {
    try {
      if (!question?.trim() || !answer?.trim()) {
        message.warning("Please provide both question and answer");
        return;
      }
      const res = await createFaq({ question, answer }).unwrap();
      if (res?.success) message.success(res?.message || "FAQ created successfully");
      setAddModalOpen(false);
      setQuestion("");
      setAnswer("");
    } catch (e) {
      message.error(e?.data?.message || "Failed to create FAQ");
    }
  };

  const handleUpdate = async () => {
    try {
      if (!selectedId) return;
      if (!question?.trim() || !answer?.trim()) {
        message.warning("Please provide both question and answer");
        return;
      }
      const res = await updateFaq({ _id: selectedId, data: { question, answer } }).unwrap();
      if (res?.success) message.success(res?.message || "FAQ updated successfully");
      setUpdateModalOpen(false);
      setSelectedId(null);
    } catch (e) {
      message.error(e?.data?.message || "Failed to update FAQ");
    }
  };

  const handleDelete = async () => {
    try {
      if (!selectedId) return;
      const res = await deleteFaq(selectedId).unwrap();
      if (res?.success) message.success(res?.message || "FAQ deleted successfully");
      closeDeleteModal();
    } catch (e) {
      message.error(e?.data?.message || "Failed to delete FAQ");
    }
  };

  return (
    <div className="relative p-5 z-0">
      <div className="flex justify-between items-center">
        <PageHeading title="FAQ" />
        <div className="text-white">
          <button
            onClick={showModal2}
            className="bg-[#14803c] text-white font-semibold px-5 py-2 rounded transition duration-200"
          >
            + Add FAQ
          </button>
        </div>
      </div>

      <div className="flex gap-2 flex-col w-full mt-5 bg-white p-5">
        {listLoading ? (
          <div className="flex items-center justify-center py-10">
            <Spin />
          </div>
        ) : faqs?.length === 0 ? (
          <p className="text-center text-gray-500">No FAQs found.</p>
        ) : (
          faqs?.map((faq, index) => (
          <section
            key={index}
            className="border-b border-[#e5eaf2] rounded py-3"
          >
            <div
              className="flex gap-2 cursor-pointer items-center justify-between w-full"
              onClick={() => handleClick(index)}
            >
              <h2 className="text-base font-normal md:font-bold md:text-2xl flex gap-2 items-center">
                <FaRegQuestionCircle className="w-5 h-5 hidden md:flex" />
                {faq?.question}
              </h2>
              <div className="flex gap-2 md:gap-4 items-center">
                <FaChevronDown
                  className={`w-5 h-5 text-[#0D0D0D] transition-all duration-300 ${
                    isAccordionOpen === index &&
                    "rotate-[180deg] !text-[#14803c]"
                  }`}
                />
                <div className="border-2 px-1.5 py-1 rounded border-[#14803c] bg-[#f0fcf4]">
                  <button className="" onClick={(e) => { e.stopPropagation(); showModal3(faq); }}>
                    <CiEdit className="text-2xl cursor-pointer text-[#14803c] font-bold transition-all" />
                  </button>
                </div>
                <div className="border-2 px-1.5 py-1 rounded border-[#14803c] bg-[#f0fcf4]">
                  <button className="" onClick={(e) => { e.stopPropagation(); openDeleteModal(faq?._id); }}>
                    <RiDeleteBin6Line className="text-2xl cursor-pointer text-red-500 transition-all" />
                  </button>
                </div>
              </div>
            </div>
            <div
              className={`grid transition-all duration-300 overflow-hidden ease-in-out ${
                isAccordionOpen === index
                  ? "grid-rows-[1fr] opacity-100 mt-4"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <p className="text-[#424242] text-[0.9rem] overflow-hidden">
                {faq?.answer}
              </p>
            </div>
          </section>
          ))
        )}
      </div>

      <Modal open={deleteModalOpen} centered onCancel={closeDeleteModal} footer={null}>
        <div className="p-5">
          <h1 className="text-4xl text-center text-[#0D0D0D]">
            Are you sure you want to delete ?
          </h1>

          <div className="text-center py-5">
            <button
              onClick={handleDelete}
              className="bg-[#14803c] text-white font-semibold w-full py-2 rounded transition duration-200 disabled:opacity-60"
              disabled={deleteLoading}
            >
              {deleteLoading ? "Deleting..." : "YES, DELETE"}
            </button>
          </div>
          <div className="text-center pb-5">
            <button
              onClick={closeDeleteModal}
              className="text-[#14803c] border-2 border-green-600 bg-white font-semibold w-full py-2 rounded transition duration-200"
            >
              NO,DON’T DELETE
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        open={addModalOpen}
        centered
        onCancel={handleCancel2}
        footer={null}
      >
        <div className="p-5">
          <h2 className="text-2xl font-bold text-center mb-2">Add FAQ</h2>

          <p className="text-center mb-6 text-gray-700">
            Fill out the details below to add a new FAQ. Ensure the answer
            provides clarity and helps users quickly resolve their queries.
          </p>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="question"
                className="block text-sm font-medium mb-1"
              >
                Question for the FAQ
              </label>
              <input
                id="question"
                type="text"
                placeholder="Enter the FAQ"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="answer"
                className="block text-sm font-medium mb-1"
              >
                Answer to the FAQ
              </label>
              <textarea
                id="answer"
                placeholder="Enter the FAQ Answer"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              onClick={handleCancel2}
              className="py-2 px-4 rounded-lg border border-[#EF4444] bg-red-50"
            >
              Cancel
            </button>

            <button
              onClick={handleCreate}
              className="py-2 px-4 rounded-lg bg-green-600 text-white disabled:opacity-60"
              disabled={createLoading}
            >
              {createLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        open={updateModalOpen}
        centered
        onCancel={handleCancel3}
        footer={null}
      >
        <div className="p-5">
          <h2 className="text-2xl font-bold text-center mb-2">Update FAQ</h2>

          <p className="text-center mb-6 text-gray-700">
            Fill out the details below to add a new FAQ. Ensure the answer
            provides clarity and helps users quickly resolve their queries.
          </p>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="question"
                className="block text-sm font-medium mb-1"
              >
                Question for the FAQ
              </label>
              <input
                id="question"
                type="text"
                placeholder="Enter the FAQ"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="answer"
                className="block text-sm font-medium mb-1"
              >
                Answer to the FAQ
              </label>
              <textarea
                id="answer"
                placeholder="Enter the FAQ Answer"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              onClick={handleCancel3}
              className="py-2 px-4 rounded-lg border border-[#EF4444] bg-red-50"
            >
              Cancel
            </button>

            <button
              onClick={handleUpdate}
              className="py-2 px-4 rounded-lg bg-green-600 text-white disabled:opacity-60"
              disabled={updateLoading}
            >
              {updateLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Faq;
