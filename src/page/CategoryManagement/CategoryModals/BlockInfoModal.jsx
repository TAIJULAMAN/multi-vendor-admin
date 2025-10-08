import { Modal } from "antd";

export default function BlockInfoModal({ open, onClose, message }) {
  return (
    <Modal open={open} centered onCancel={onClose} footer={null}>
      <div className="p-5">
        <h1 className="text-4xl text-center text-[#0D0D0D]">
          {message || "Please delete all associated subcategories first."}
        </h1>
        <div className="text-center py-5">
          <button
            onClick={onClose}
            className="bg-[#14803c] text-white font-semibold w-full py-2 rounded transition duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
