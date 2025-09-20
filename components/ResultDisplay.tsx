
import React from 'react';

interface ResultDisplayProps {
  originalModel: string;
  originalClothing: string;
  finalImage: string | null;
  error: string | null;
  onStartOver: () => void;
  translations: { [key: string]: string };
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ finalImage, error, onStartOver, translations, originalModel, originalClothing }) => {
  return (
    <div className="w-full max-w-6xl p-6 bg-gray-800 rounded-lg shadow-2xl animate-fade-in">
      <h2 className="text-3xl font-bold text-center mb-6 text-teal-300">
        {error ? translations.errorTitle : translations.resultTitle}
      </h2>

      {error ? (
        <div className="text-center p-8 bg-red-900/50 border border-red-500 rounded-lg">
          <p className="text-red-300 text-lg">{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
                <img src={originalModel} alt="Original Model" className="w-full aspect-square object-cover rounded-lg shadow-md" />
                <p className="mt-2 text-sm text-gray-400">Original Model</p>
            </div>
            <div className="flex flex-col items-center">
                <img src={originalClothing} alt="Original Clothing" className="w-full aspect-square object-cover rounded-lg shadow-md" />
                <p className="mt-2 text-sm text-gray-400">Original Garment</p>
            </div>
            <div className="flex flex-col items-center">
                <img src={finalImage!} alt="Generated Result" className="w-full aspect-square object-cover rounded-lg shadow-md border-2 border-teal-400" />
                <p className="mt-2 text-sm text-teal-300">Generated Image</p>
            </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <button
          onClick={onStartOver}
          className="px-10 py-3 bg-gray-600 text-white font-semibold rounded-full hover:bg-gray-500 transform hover:scale-105 transition-all duration-300"
        >
          {translations.startOverButton}
        </button>
      </div>
    </div>
  );
};
