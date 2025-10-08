import { Spin } from "antd";
import { useState, useMemo } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import PageHeading from "../../shared/PageHeading";
import Swal from "sweetalert2";
import AddFaqModal from "./FaqModals/AddFaqModal";
import UpdateFaqModal from "./FaqModals/UpdateFaqModal";
import {
  useGetAllFaqQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} from "../../Redux/api/faqApi";

const Faq = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(0);
  // delete handled via SweetAlert confirm instead of Modal
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
    Swal.fire({
      title: "Confirm delete",
      text: "Are you sure you want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#14803c",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete();
      } else {
        setSelectedId(null);
      }
    });
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
        await Swal.fire({
          icon: "warning",
          title: "Missing fields",
          text: "Please provide both question and answer",
        });
        return;
      }
      const res = await createFaq({ question, answer }).unwrap();
      if (res?.success)
        await Swal.fire({
          icon: "success",
          title: res?.message || "FAQ created successfully",
          timer: 1200,
          showConfirmButton: false,
        });
      setAddModalOpen(false);
      setQuestion("");
      setAnswer("");
    } catch (e) {
      await Swal.fire({
        icon: "error",
        title: "Failed to create FAQ",
        text: e?.data?.message || "Something went wrong",
      });
    }
  };

  const handleUpdate = async () => {
    try {
      if (!selectedId) return;
      if (!question?.trim() || !answer?.trim()) {
        await Swal.fire({
          icon: "warning",
          title: "Missing fields",
          text: "Please provide both question and answer",
        });
        return;
      }
      const res = await updateFaq({
        _id: selectedId,
        data: { question, answer },
      }).unwrap();
      if (res?.success)
        await Swal.fire({
          icon: "success",
          title: res?.message || "FAQ updated successfully",
          timer: 1200,
          showConfirmButton: false,
        });
      setUpdateModalOpen(false);
      setSelectedId(null);
    } catch (e) {
      await Swal.fire({
        icon: "error",
        title: "Failed to update FAQ",
        text: e?.data?.message || "Something went wrong",
      });
    }
  };

  const handleDelete = async () => {
    try {
      if (!selectedId) return;
      const res = await deleteFaq(selectedId).unwrap();
      if (res?.success)
        await Swal.fire({
          icon: "success",
          title: res?.message || "FAQ deleted successfully",
          timer: 1200,
          showConfirmButton: false,
        });
      setSelectedId(null);
    } catch (e) {
      await Swal.fire({
        icon: "error",
        title: "Failed to delete FAQ",
        text: e?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="relative p-5 z-0">
      <div className="flex justify-between items-center">
        <PageHeading title="FAQ" />
        <div className="text-white">
          <button
            onClick={() => {
              setQuestion("");
              setAnswer("");
              setAddModalOpen(true);
            }}
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
                    <button
                      className=""
                      onClick={(e) => {
                        e.stopPropagation();
                        showModal3(faq);
                      }}
                    >
                      <CiEdit className="text-2xl cursor-pointer text-[#14803c] font-bold transition-all" />
                    </button>
                  </div>
                  <div className="border-2 px-1.5 py-1 rounded border-[#14803c] bg-[#f0fcf4]">
                    <button
                      className=""
                      onClick={(e) => {
                        e.stopPropagation();
                        openDeleteModal(faq?._id);
                      }}
                    >
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

      {/* Delete handled by SweetAlert */}
      <AddFaqModal
        open={addModalOpen}
        onCancel={() => {
          setAddModalOpen(false);
        }}
        onSave={handleCreate}
        loading={createLoading}
        question={question}
        setQuestion={setQuestion}
        answer={answer}
        setAnswer={setAnswer}
      />
      <UpdateFaqModal
        open={updateModalOpen}
        onCancel={() => {
          setUpdateModalOpen(false);
        }}
        onSave={handleUpdate}
        loading={updateLoading}
        question={question}
        setQuestion={setQuestion}
        answer={answer}
        setAnswer={setAnswer}
      />
    </div>
  );
};

export default Faq;
