"use client";

import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";

type ImageUploadProps = {
  label: string;
  value: string | null;
  onChange: (url: string | null) => void;
  aspectSquare?: boolean;
  hint?: string;
};

export default function ImageUpload({
  label,
  value,
  onChange,
  aspectSquare = true,
  hint = "JPEG, PNG, WebP, or GIF up to 5MB",
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);

    try {
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

      onChange(data.url);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-[#274c77] mb-2">{label}</label>
      <div
        className={`relative border-2 border-dashed border-[#a3cef1] rounded-lg bg-[#e7ecef]/40 overflow-hidden ${
          aspectSquare ? "aspect-square max-w-xs" : "h-40"
        }`}
      >
        {value ? (
          <>
            <Image
              src={value}
              alt="Uploaded preview"
              fill
              className="object-cover"
              unoptimized
            />
            <button
              type="button"
              onClick={() => onChange(null)}
              className="absolute top-2 right-2 bg-white/90 text-[#274c77] p-1.5 rounded-full shadow hover:bg-white"
              aria-label="Remove image"
            >
              <X size={16} />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#6096ba] hover:text-[#274c77] transition-colors p-4"
          >
            <Upload size={28} />
            <span className="text-sm font-medium">
              {uploading ? "Uploading..." : "Click to upload from your device"}
            </span>
          </button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileChange}
        className="hidden"
      />
      <p className="text-xs text-[#8b8c89] mt-2">{hint}</p>
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
