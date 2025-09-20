
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800/50 text-center py-4">
      <div className="container mx-auto px-4">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Digital Mannequin AI. Powered by Google Gemini.
        </p>
      </div>
    </footer>
  );
};
