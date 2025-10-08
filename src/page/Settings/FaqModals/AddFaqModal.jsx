import { Modal } from "antd";

export default function AddFaqModal({
  open,
  onCancel,
  onSave,
  loading,
  question,
  setQuestion,
  answer,
  setAnswer,
}) {
  return (
    <Modal open={open} centered onCancel={onCancel} footer={null}>
      <div className="p-5">
        <h2 className="text-2xl font-bold text-center mb-2">Add FAQ</h2>

        <p className="text-center mb-6 text-gray-700">
          Fill out the details below to add a new FAQ. Ensure the answer
          provides clarity and helps users quickly resolve their queries.
        </p>

        <div className="space-y-4">
          <div>
            <label htmlFor="question" className="block text-sm font-medium mb-1">
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
            <label htmlFor="answer" className="block text-sm font-medium mb-1">
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
          <button onClick={onCancel} className="py-2 px-4 rounded-lg border border-[#EF4444] bg-red-50">
            Cancel
          </button>

          <button
            onClick={onSave}
            className="py-2 px-4 rounded-lg bg-green-600 text-white disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
