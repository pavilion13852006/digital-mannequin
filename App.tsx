
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { ResultDisplay } from './components/ResultDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Instructions } from './components/Instructions';
import { Footer } from './components/Footer';
import { dressModel } from './services/geminiService';
import { Language } from './types';
import { translations } from './constants';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(Language.FA);
  const [modelImage, setModelImage] = useState<string | null>(null);
  const [clothingImage, setClothingImage] = useState<string | null>(null);
  const [finalImage, setFinalImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const t = useMemo(() => translations[language], [language]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === Language.FA ? 'rtl' : 'ltr';
  }, [language]);

  const handleGenerate = useCallback(async () => {
    if (!modelImage || !clothingImage) return;

    setIsLoading(true);
    setError(null);
    setFinalImage(null);

    try {
      const modelBase64 = modelImage.split(',')[1];
      const clothingBase64 = clothingImage.split(',')[1];
      
      const generatedImageBase64 = await dressModel(modelBase64, clothingBase64, language);

      if (generatedImageBase64) {
        setFinalImage(`data:image/png;base64,${generatedImageBase64}`);
      } else {
        throw new Error("The API did not return an image.");
      }
    } catch (err) {
      console.error(err);
      setError(t.errorDescription);
    } finally {
      setIsLoading(false);
    }
  }, [modelImage, clothingImage, t, language]);

  const handleStartOver = () => {
    setModelImage(null);
    setClothingImage(null);
    setFinalImage(null);
    setError(null);
    setIsLoading(false);
  };

  const isGenerateDisabled = !modelImage || !clothingImage || isLoading;
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center p-8 bg-gray-800 rounded-lg shadow-2xl">
          <LoadingSpinner />
          <p className="mt-4 text-lg animate-pulse">{t.generating}</p>
        </div>
      );
    }

    if (finalImage || error) {
      return (
        <ResultDisplay
          originalModel={modelImage!}
          originalClothing={clothingImage!}
          finalImage={finalImage}
          error={error}
          onStartOver={handleStartOver}
          translations={t}
        />
      );
    }

    return (
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Step 1 */}
        <div className={`transition-opacity duration-500 ${modelImage ? 'opacity-50' : 'opacity-100'}`}>
          <h2 className="text-2xl font-bold mb-2 text-teal-300">{t.step1Title}</h2>
          <p className="text-gray-400 mb-4">{t.step1Description}</p>
          <ImageUploader 
            onImageUpload={setModelImage} 
            translations={t}
            label={t.uploadModel}
          />
        </div>

        {/* Step 2 */}
        <div className={`transition-opacity duration-500 ${!modelImage ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>
          <h2 className="text-2xl font-bold mb-2 text-teal-300">{t.step2Title}</h2>
          <p className="text-gray-400 mb-4">{t.step2Description}</p>
          <ImageUploader 
            onImageUpload={setClothingImage} 
            translations={t}
            label={t.uploadClothing}
            disabled={!modelImage}
          />
        </div>
      </div>
    );
  };


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col font-sans">
      <Header 
        language={language} 
        setLanguage={setLanguage} 
        translations={t}
      />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 flex flex-col items-center justify-center">
        {renderContent()}

        {!finalImage && !isLoading && (
          <div className="mt-12 text-center">
            <button
              onClick={handleGenerate}
              disabled={isGenerateDisabled}
              className="px-12 py-4 bg-teal-500 text-white font-bold text-xl rounded-full shadow-lg hover:bg-teal-400 disabled:bg-gray-600 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 disabled:transform-none"
            >
              {t.generateButton}
            </button>
          </div>
        )}
      </main>
      <Instructions translations={t} />
      <Footer />
    </div>
  );
};

export default App;
