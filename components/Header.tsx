
import React from 'react';
import { LanguageToggle } from './LanguageToggle';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: { [key: string]: string };
}

export const Header: React.FC<HeaderProps> = ({ language, setLanguage, translations }) => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-center md:text-start">
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                {translations.title}
            </h1>
            <p className="text-sm text-teal-300 hidden md:block">{translations.tagline}</p>
        </div>
        <LanguageToggle language={language} setLanguage={setLanguage} />
      </div>
    </header>
  );
};
