import { Modal } from "antd";

export default function DeleteAdModal({ open, onCancel, onConfirm, loading }) {
  return (
    <Modal open={open} centered onCancel={onCancel} footer={null}>
      <div className="p-5">
        <h1 className="text-4xl text-center text-[#0D0D0D]">
          Are you sure you want to delete ?
        </h1>

        <div className="text-center py-5">
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`bg-[#14803c] text-white font-semibold w-full py-2 rounded transition duration-200 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Deleting..." : "YES,DELETE"}
          </button>
        </div>
        <div className="text-center pb-5">
          <button
            onClick={onCancel}
            disabled={loading}
            className={`text-[#14803c] border-2 border-green-600 bg-white font-semibold w-full py-2 rounded transition duration-200 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            NO,DON’T DELETE
          </button>
        </div>
      </div>
    </Modal>
  );
}
