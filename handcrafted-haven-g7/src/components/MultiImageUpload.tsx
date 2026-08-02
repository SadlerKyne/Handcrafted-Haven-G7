"use client";

import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import { Upload, X, Plus } from "lucide-react";

type MultiImageUploadProps = {
  label: string;
  values: string[];
  onChange: (urls: string[]) => void;
  hint?: string;
};

export default function MultiImageUpload({
  label,
  values,
  onChange,
  hint = "JPEG, PNG, WebP, or GIF up to 5MB (at least one image required)",
}: MultiImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setError(null);
    setUploading(true);

    try {
      const uploadedUrls: string[] = [...values];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || "Upload failed.");
        }
        uploadedUrls.push(data.url);
      }
      onChange(uploadedUrls);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const removeImage = (indexToRemove: number) => {
    onChange(values.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-[#274c77] mb-2">{label}</label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {values.map((url, index) => (
          <div key={url + index} className="relative aspect-square border border-gray-200 rounded-lg overflow-hidden bg-[#e7ecef]">
            <Image
              src={url}
              alt={`Uploaded product image ${index + 1}`}
              fill
              className="object-cover"
              unoptimized
            />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-1.5 right-1.5 bg-white/90 text-[#274c77] p-1 rounded-full shadow hover:bg-white transition-colors"
              aria-label="Remove image"
            >
              <X size={14} />
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="aspect-square border-2 border-dashed border-[#a3cef1] rounded-lg bg-[#e7ecef]/40 flex flex-col items-center justify-center gap-1.5 text-[#6096ba] hover:text-[#274c77] hover:border-[#274c77] transition-all p-3 text-center"
        >
          {uploading ? (
            <span className="text-xs font-medium">Uploading...</span>
          ) : (
            <>
              <Plus size={24} />
              <span className="text-xs font-medium">Add Image</span>
            </>
          )}
        </button>
      </div>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileChange}
        className="hidden"
      />
      <p className="text-xs text-[#8b8c89] mt-2">{hint}</p>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
