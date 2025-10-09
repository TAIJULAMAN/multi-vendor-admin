import { useEffect, useRef, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import {
  useDeleteAdsMutation,
  useUpdateAdsMutation,
} from "../../Redux/api/ads/adsApi";
import DeleteAdModal from "./DeleteAdModal";
import EditAdModal from "./EditAdModal";
import formatDate from "../../utils/formatDate";
import useImageUpload from "../../hooks/useImageUpload";

export function AdCard({ campaign }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [deleteAds, { isLoading: isDeleting }] = useDeleteAdsMutation();
  const [updateAds, { isLoading: isUpdating }] = useUpdateAdsMutation();
  const [editTitle, setEditTitle] = useState("");
  const [editStartDate, setEditStartDate] = useState("");
  const [editEndDate, setEditEndDate] = useState("");
  const menuRef = useRef(null);

  const handleOk = async () => {
    try {
      if (!campaign?.id) return;
      await deleteAds(campaign.id).unwrap();
    } catch (_) {
    } finally {
      setIsModalOpen(false);
    }
  };

  const {
    uploadedImage,
    setUploadedImage,
    handleImageUpload,
    handleRemoveImage,
  } = useImageUpload({
    name: "",
    url: "",
    file: null,
  });

  useEffect(() => {
    if (campaign) {
      setEditTitle(campaign.title || "");
      setEditStartDate(
        campaign.startDate ? campaign.startDate.substring(0, 10) : ""
      );
      setEditEndDate(campaign.endDate ? campaign.endDate.substring(0, 10) : "");
      setUploadedImage({
        name: campaign.title || "",
        url: campaign.image || "",
        file: null,
      });
    }
    setImageError(false);
  }, [campaign]);

  useEffect(() => {
    if (updateModalOpen && campaign) {
      setEditTitle(campaign.title || "");
      setEditStartDate(
        campaign.startDate ? campaign.startDate.substring(0, 10) : ""
      );
      setEditEndDate(campaign.endDate ? campaign.endDate.substring(0, 10) : "");
      setUploadedImage({
        name: campaign.title || "",
        url: campaign.image || "",
        file: null,
      });
    }
  }, [updateModalOpen, campaign]);

  useEffect(() => {
    function onDocClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    }
    function onKeyDown(e) {
      if (e.key === "Escape") setIsMenuOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className="bg-amber-200 rounded-lg overflow-hidden shadow-md">
      <div className="p-5">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-xl">{campaign.title}</h2>

          {/* Dropdown Menu */}
          <div className="relative" ref={menuRef}>
            <button
              className=""
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <FiMoreVertical className="h-5 w-5" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setUpdateModalOpen(true);
                  }}
                  className="block px-4 py-2 text-sm text-gray-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setIsModalOpen(true);
                  }}
                  className="block px-4 py-2 text-sm text-red-500"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {campaign?.image && !imageError ? (
          <img
            src={campaign.image}
            alt={campaign.title}
            className="w-full h-[200px] md:h-[300px] rounded-lg"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-[200px] md:h-[300px] bg-gray-100 flex items-center justify-center rounded-lg text-gray-500 text-sm">
            Image is not available
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 text-center p-5">
        <div className="flex flex-col">
          <span className="text-xl text-gray-800 mb-2 flex justify-start text-start">
            Start day
          </span>
          <span className="text-lg text-gray-800 flex justify-start text-start">
            {formatDate(campaign.startDate)}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xl text-gray-800 mb-2 flex justify-end text-end">
            End day
          </span>
          <span className="text-lg text-gray-800 flex justify-end text-end">
            {formatDate(campaign.endDate)}
          </span>
        </div>
      </div>

      <DeleteAdModal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleOk}
        loading={isDeleting}
      />
      <EditAdModal
        open={updateModalOpen}
        onCancel={() => setUpdateModalOpen(false)}
        title={editTitle}
        setTitle={setEditTitle}
        startDate={editStartDate}
        setStartDate={setEditStartDate}
        endDate={editEndDate}
        setEndDate={setEditEndDate}
        uploadedImage={uploadedImage}
        onImageUpload={handleImageUpload}
        onRemoveImage={handleRemoveImage}
        onSave={async () => {
          try {
            if (!campaign?.id) return;
            const formData = new FormData();
            if (editTitle) formData.append("title", editTitle);
            if (editStartDate)
              formData.append(
                "startDate",
                new Date(editStartDate).toISOString()
              );
            if (editEndDate)
              formData.append("endDate", new Date(editEndDate).toISOString());
            if (uploadedImage.file)
              formData.append("image", uploadedImage.file);
            await updateAds({ id: campaign.id, formData }).unwrap();
            setUpdateModalOpen(false);
          } catch (_) {}
        }}
        loading={isUpdating}
      />
    </div>
  );
}
