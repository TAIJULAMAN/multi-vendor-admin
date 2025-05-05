import { Modal } from "antd";
import { useState } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import PageHeading from "../../shared/PageHeading";

const Faq = () => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  // Accordion data
  const AccordionData = [
    {
      title: "What is HTML, and why is it important in web development?",
      description:
        "HTML (HyperText Markup Language) is the standard markup language used to create web pages. It provides the structure of a website and is essential for displaying content on the web.",
    },
    {
      title: "What is CSS, and how does it enhance web design?",
      description:
        "CSS (Cascading Style Sheets) is a stylesheet language that allows developers to style and layout web pages. It controls the design, including colors, fonts, and layouts, making the site visually appealing.",
    },
    {
      title: "What is JavaScript, and how is it used in web development?",
      description:
        "JavaScript is a scripting language that enables interactivity on web pages. It is widely used for tasks such as form validation, animations, and dynamic content updates, enhancing user experience.",
    },
    {
      title: "Explain the concept of responsive web design.",
      description:
        "Responsive web design ensures that a website looks and functions well on various screen sizes, from desktops to mobile devices, by using flexible layouts, images, and CSS media queries.",
    },
    {
      title:
        "What are the differences between frontend and backend development?",
      description:
        "Frontend development focuses on the client side, including the layout and design that users interact with. Backend development involves server-side functionality, including databases, application logic, and APIs.",
    },
  ];

  const handleClick = (index) => {
    setIsAccordionOpen((prevIndex) => (prevIndex === index ? null : index));
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleCancel2 = () => {
    setAddModalOpen(false);
  };
  const handleCancel3 = () => {
    setUpdateModalOpen(false);
  };
  const showModal2 = () => {
    setAddModalOpen(true);
  };
  const showModal3 = () => {
    setUpdateModalOpen(true);
  };

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

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
        {AccordionData?.map((accordion, index) => (
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
                {accordion.title}
              </h2>
              <div className="flex gap-2 md:gap-4 items-center">
                <FaChevronDown
                  className={`w-5 h-5 text-[#0D0D0D] transition-all duration-300 ${
                    isAccordionOpen === index &&
                    "rotate-[180deg] !text-[#14803c]"
                  }`}
                />
                <div className="border-2 px-1.5 py-1 rounded border-[#14803c] bg-[#f0fcf4]">
                  <button className="" onClick={showModal3}>
                    <CiEdit className="text-2xl cursor-pointer text-[#14803c] font-bold transition-all" />
                  </button>
                </div>
                <div className="border-2 px-1.5 py-1 rounded border-[#14803c] bg-[#f0fcf4]">
                  <button className="" onClick={showModal}>
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
                {accordion.description}
              </p>
            </div>
          </section>
        ))}
      </div>

      <Modal open={isModalOpen} centered onCancel={handleCancel} footer={null}>
        <div className="p-5">
          <h1 className="text-4xl text-center text-[#0D0D0D]">
            Are you sure you want to delete ?
          </h1>

          <div className="text-center py-5">
            <button
              onClick={handleOk}
              className="bg-[#14803c] text-white font-semibold w-full py-2 rounded transition duration-200"
            >
              YES,DELETE
            </button>
          </div>
          <div className="text-center pb-5">
            <button
              onClick={handleOk}
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
              onClick={handleCancel2}
              className="py-2 px-4 rounded-lg bg-green-600 text-white"
            >
              Save
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
              onClick={handleCancel3}
              className="py-2 px-4 rounded-lg bg-green-600 text-white"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Faq;
