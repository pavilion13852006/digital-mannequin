
import { GoogleGenAI, Modality } from "@google/genai";
import { Language } from '../types';

const PROMPT_EN = `
Analyze the two images provided.
Image 1 is of a person (the model).
Image 2 is a piece of clothing.

Your task is to realistically and seamlessly place the clothing from Image 2 onto the person in Image 1.

Key instructions:
1.  **Fit the garment:** The clothing must conform to the model's body shape, pose, and posture naturally.
2.  **Maintain realism:** Preserve the original lighting, shadows, and textures of both the model and the environment.
3.  **Clean result:** The output image must ONLY contain the final result of the model wearing the new clothing. Do not include the original clothing image or any other artifacts.
4.  **Preserve identity:** Do not change the model's face, hair, skin tone, or the background of the original photo.
5.  **Output:** Provide ONLY the edited image as the output. Do not output any text.
`;

const PROMPT_FA = `
دو تصویر ارائه شده را تحلیل کنید.
تصویر ۱ یک شخص (مدل) است.
تصویر ۲ یک تکه لباس است.

وظیفه شما این است که به طور واقع‌گرایانه و یکپارچه، لباس موجود در تصویر ۲ را بر تن شخص در تصویر ۱ قرار دهید.

دستورالعمل‌های کلیدی:
۱. **اندازه کردن لباس:** لباس باید به طور طبیعی با فرم بدن، ژست و حالت مدل مطابقت داشته باشد.
۲. **حفظ واقع‌گرایی:** نورپردازی، سایه‌ها و بافت‌های اصلی مدل و محیط را حفظ کنید.
۳. **نتیجه تمیز:** تصویر خروجی باید فقط شامل نتیجه نهایی مدل در حال پوشیدن لباس جدید باشد. تصویر لباس اصلی یا هرگونه عنصر اضافی را شامل نشود.
۴. **حفظ هویت:** چهره، مو، رنگ پوست مدل و پس‌زمینه عکس اصلی را تغییر ندهید.
۵. **خروجی:** فقط و فقط تصویر ویرایش شده را به عنوان خروجی ارائه دهید. هیچ متنی خروجی ندهید.
`;


export const dressModel = async (
  modelImageBase64: string,
  clothingImageBase64: string,
  language: Language
): Promise<string | null> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey });

  const modelPart = {
    inlineData: {
      mimeType: 'image/jpeg',
      data: modelImageBase64,
    },
  };

  const clothingPart = {
    inlineData: {
      mimeType: 'image/jpeg',
      data: clothingImageBase64,
    },
  };

  const textPart = {
    text: language === Language.FA ? PROMPT_FA : PROMPT_EN,
  };
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image-preview',
    contents: {
      parts: [modelPart, clothingPart, textPart],
    },
    config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return part.inlineData.data;
    }
  }

  return null;
};
