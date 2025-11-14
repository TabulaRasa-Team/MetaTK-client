import type { OcrResponse } from '../../types/api';

const OCR_API_URL = process.env.EXPO_PUBLIC_OCR_API_URL;

export const ocrApi = {
  uploadImage: async (imageUri: string): Promise<OcrResponse> => {
    try {
      const formData = new FormData();

      formData.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'image.jpg',
      } as any);

      const response = await fetch(`${OCR_API_URL}/company/ocr`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('서버 응답 에러:', errorText);
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      console.log('OCR API 응답:', data);
      return data;
    } catch (error: any) {
      console.error('OCR API 에러:', error);
      throw error;
    }
  },
};