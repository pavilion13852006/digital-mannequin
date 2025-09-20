
import React, { useState } from 'react';

interface InstructionsProps {
  translations: { [key: string]: string };
}

export const Instructions: React.FC<InstructionsProps> = ({ translations }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-gray-900 py-6">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-gray-800 rounded-lg border border-gray-700">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex justify-between items-center p-4 text-start font-bold text-lg"
          >
            <span>{translations.howToRunTitle}</span>
            <svg
              className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isOpen && (
            <div className="p-4 border-t border-gray-700 text-gray-300">
              <p className="mb-4">{translations.howToRunDescription}</p>
              <ul className="space-y-3 list-inside">
                <li className="p-3 bg-gray-700/50 rounded">{translations.howToRunStep1}</li>
                <li className="p-3 bg-gray-700/50 rounded">{translations.howToRunStep2}</li>
                <li className="p-3 bg-gray-700/50 rounded">{translations.howToRunStep3}</li>
                <li className="p-3 bg-gray-700/50 rounded">{translations.howToRunStep4}</li>
                <li className="p-3 bg-gray-700/50 rounded">{translations.howToRunStep5}</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
