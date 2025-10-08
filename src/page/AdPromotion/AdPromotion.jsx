/* eslint-disable react/prop-types */
import { useState } from "react";
import PageHeading from "../../shared/PageHeading";
import { AdCard } from "./AdCard";
import AddAdModal from "./AddAdModal";
import {
  useGetAllAdsQuery,
  useCreateAdsMutation,
} from "../../Redux/api/ads/adsApi";
import useImageUpload from "../../hooks/useImageUpload";

export default function AdPromotion() {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("Electronics");
  const { uploadedImage, handleImageUpload, handleRemoveImage } =
    useImageUpload({
      name: "",
      url: "",
      file: null,
    });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { data: adsData } = useGetAllAdsQuery();
  const [createAds, { isLoading: isCreating }] = useCreateAdsMutation();

  const rawAds =
    adsData?.data?.ads ?? adsData?.data ?? adsData?.ads ?? adsData ?? [];
  const campaigns = Array.isArray(rawAds)
    ? rawAds.map((ad, idx) => ({
        id: ad?.id || ad?._id || idx,
        title: ad?.title || "Untitled Ad",
        image: ad?.image || "",
        startDate: ad?.startDate || "",
        endDate: ad?.endDate || "",
        status: ad?.status || "",
      }))
    : [];

  return (
    <div className="p-6 bg-neutral-100 min-h-screen">
      <div className="flex justify-between items-center text-center mb-5">
        <PageHeading title="Ads Promotion" />
        <div className="flex justify-end items-center">
          <button
            onClick={() => {
              setAddModalOpen(true);
            }}
            className="bg-[#FF914C] text-white px-4 py-3 rounded-lg hover:bg-[#FF914C]/80"
          >
            + Add New Promotion
          </button>
        </div>
      </div>
      {/* Ads list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {campaigns.map((campaign) => (
          <AdCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
      <AddAdModal
        open={addModalOpen}
        onCancel={() => {
          setAddModalOpen(false);
        }}
        categoryName={categoryName}
        setCategoryName={setCategoryName}
        uploadedImage={uploadedImage}
        onImageUpload={handleImageUpload}
        onRemoveImage={handleRemoveImage}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        onSave={async () => {
          try {
            if (!categoryName || !startDate || !endDate || !uploadedImage.file)
              return;
            const formData = new FormData();
            formData.append("title", categoryName);
            formData.append("startDate", new Date(startDate).toISOString());
            formData.append("endDate", new Date(endDate).toISOString());
            formData.append("image", uploadedImage.file);
            await createAds(formData).unwrap();
            // reset and close
            setAddModalOpen(false);
            setCategoryName("");
            setStartDate("");
            setEndDate("");
            handleRemoveImage();
          } catch (_) {}
        }}
        loading={isCreating}
      />
    </div>
  );
}
