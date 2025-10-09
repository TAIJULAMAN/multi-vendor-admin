import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PageHeading from "../../shared/PageHeading";
import { useGetPrivacyQuery, useCreatePrivacyMutation } from "../../Redux/api/privacyApi";

export default function PrivacyPolicy() {
  const [content, setContent] = useState("");
  const { data: privacyData, isFetching } = useGetPrivacyQuery();
  const [createPrivacy, { isLoading: isSaving }] = useCreatePrivacyMutation();

  useEffect(() => {
    const initial = privacyData?.content;
    setContent(initial);
  }, [privacyData]);

  const handleSave = async () => {
    try {
      await createPrivacy({ content }).unwrap();
      Swal.fire({ icon: "success", title: "Saved", text: "Privacy policy saved successfully.", timer: 1500, showConfirmButton: false });
    } catch (_) {
      Swal.fire({ icon: "error", title: "Save failed", text: "Could not save privacy policy." });
    }
  };

  return (
    <div className="p-5 min-h-screen">
      <PageHeading title="Privacy Policy" />
      <div className=" bg-white rounded shadow p-5 h-full mt-5">
        <ReactQuill
          style={{ padding: "10px" }}
          theme="snow"
          value={content}
          onChange={setContent}
        />
      </div>
      <div className="text-center py-5">
        <button
          onClick={handleSave}
          disabled={isSaving || isFetching}
          className={`bg-[#0B704E] text-white font-semibold w-full py-2 rounded transition duration-200 ${
            isSaving || isFetching ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {isSaving ? "Saving..." : "Save changes"}
        </button>
      </div>
    </div>
  );
}

