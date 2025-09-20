
import React, { useState, useCallback } from 'react';

interface ImageUploaderProps {
  onImageUpload: (base64: string) => void;
  translations: { [key: string]: string };
  label: string;
  disabled?: boolean;
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, translations, label, disabled = false }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = useCallback(async (file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      const base64 = await fileToBase64(file);
      setImagePreview(base64);
      onImageUpload(base64);
    }
  }, [onImageUpload]);

  const onDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (!disabled && e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className={`relative ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
      <input
        type="file"
        id={label}
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
        disabled={disabled}
      />
      <label
        htmlFor={label}
        onDragEnter={onDragEnter}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`w-full aspect-square rounded-lg border-2 border-dashed flex items-center justify-center transition-all duration-300
          ${isDragging ? 'border-teal-400 bg-gray-700' : 'border-gray-600 hover:border-teal-500'}
          ${disabled ? 'opacity-50 cursor-not-allowed hover:border-gray-600' : 'cursor-pointer'}
          ${imagePreview ? 'border-solid' : ''}
        `}
      >
        {imagePreview ? (
          <div className="relative w-full h-full group">
            <img src={imagePreview} alt={label} className="w-full h-full object-cover rounded-lg" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
              <span className="text-white text-lg font-semibold">{translations.changeImage}</span>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-2">{translations.dropOrClick}</p>
          </div>
        )}
      </label>
    </div>
  );
};
