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
import { ConfigProvider, Pagination } from "antd";

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
  const [page, setPage] = useState(1);
  const pageSize = 10;
  
  // Fetch all ads at once for client-side pagination
  const { data: adsData } = useGetAllAdsQuery({
    page: 1,
    limit: 100000,
  });
  const [createAds, { isLoading: isCreating }] = useCreateAdsMutation();

  const rawAds =
    adsData?.data?.ads ?? adsData?.data ?? adsData?.ads ?? adsData ?? [];
  const allCampaigns = Array.isArray(rawAds)
    ? rawAds.map((ad, idx) => ({
        id: ad?.id || ad?._id || idx,
        title: ad?.title || "Untitled Ad",
        image: ad?.image || "",
        startDate: ad?.startDate || "",
        endDate: ad?.endDate || "",
        status: ad?.status || "",
      }))
    : [];

  // Client-side pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const campaigns = allCampaigns.slice(startIndex, endIndex);
  const totalItems = allCampaigns.length;
  
  console.log('Pagination Debug:', { totalItems, pageSize, page, campaignsCount: campaigns.length });

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
      
      {/* Pagination */}
      {totalItems > 0 && (
        <div className="flex justify-center mt-8">
          <ConfigProvider
            theme={{
              components: {
                InputNumber: {
                  activeBorderColor: "#14803c",
                },
                Pagination: {
                  colorPrimaryBorder: "rgb(19,194,194)",
                  colorBorder: "rgb(82,196,26)",
                  colorTextPlaceholder: "rgb(82,196,26)",
                  colorTextDisabled: "rgb(82,196,26)",
                  colorBgTextActive: "rgb(82,196,26)",
                  itemActiveBgDisabled: "rgb(82,196,26)",
                  itemActiveColorDisabled: "rgb(0,0,0)",
                  itemBg: "rgb(82,196,26)",
                  colorBgTextHover: "rgb(82,196,26)",
                  colorPrimary: "rgb(82,196,26)",
                  colorPrimaryHover: "rgb(82,196,26)",
                },
              },
            }}
          >
            <Pagination
              current={page}
              pageSize={pageSize}
              total={totalItems}
              showSizeChanger={false}
              onChange={(p) => setPage(p)}
            />
          </ConfigProvider>
        </div>
      )}
      
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
