import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PageHeading from "../../shared/PageHeading";
import {
  useCreateTermsMutation,
  useGetTermsAndConditionsQuery,
} from "../../Redux/api/termsApi";

export default function TermsAndCondition() {
  const [content, setContent] = useState("");
  const { data: termsData, isFetching } = useGetTermsAndConditionsQuery();
  const [createTerms, { isLoading: isSaving }] = useCreateTermsMutation();

  useEffect(() => {
    const initial = termsData?.content;
    setContent(initial || "");
  }, [termsData]);

  const handleSave = async () => {
    try {
      await createTerms({ content }).unwrap();
      Swal.fire({
        icon: "success",
        title: "Saved",
        text: "Terms and Conditions saved successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (_) {
      Swal.fire({
        icon: "error",
        title: "Save failed",
        text: "Could not save Terms and Conditions.",
      });
    }
  };

  return (
    <div className="p-5">
      <PageHeading title="Terms And Condition" />

      <div className=" bg-white rounded shadow p-5 h-full">
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
