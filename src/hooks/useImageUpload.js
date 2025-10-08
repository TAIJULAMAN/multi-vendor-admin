import { useState } from "react";

export default function useImageUpload(initial = { name: "", url: "", file: null }) {
  const [uploadedImage, setUploadedImage] = useState(initial);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage({
        name: file.name,
        url: URL.createObjectURL(file),
        file,
      });
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage({ name: "", url: "", file: null });
  };

  return { uploadedImage, setUploadedImage, handleImageUpload, handleRemoveImage };
}
