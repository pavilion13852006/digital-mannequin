
import React from 'react';
import { Language } from '../types';

interface LanguageToggleProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ language, setLanguage }) => {
  const isFa = language === Language.FA;

  const toggleLanguage = () => {
    setLanguage(isFa ? Language.EN : Language.FA);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="relative inline-flex items-center h-8 w-16 rounded-full bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-teal-500"
      aria-label="Toggle Language"
    >
      <span
        className={`${
          isFa ? 'translate-x-9' : 'translate-x-1'
        } inline-block w-6 h-6 transform bg-white rounded-full transition-transform duration-300 flex items-center justify-center`}
      >
      </span>
       <div className="absolute inset-0 flex justify-around items-center">
        <span className={`text-xs font-bold ${isFa ? 'text-gray-400' : 'text-teal-400'}`}>EN</span>
        <span className={`text-xs font-bold ${isFa ? 'text-teal-400' : 'text-gray-400'}`}>FA</span>
      </div>
    </button>
  );
};
