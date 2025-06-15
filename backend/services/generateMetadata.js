import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// import generateMetadata from '../controller/generateMetadata.js';

export const generateMetadata = async () => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      Generate a JSON object with:
      - title (string)
      - description (string)
      - hashtags (array of strings)
      Format it properly as valid JSON.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = response.text();
    const cleanedText = rawText.replace(/```json\n?|\n?```/g, '');
    const metadata = JSON.parse(cleanedText);

    // Validate structure
    if (
      typeof metadata.title !== 'string' ||
      typeof metadata.description !== 'string' ||
      !Array.isArray(metadata.hashtags)
    ) {
      throw new Error('Invalid metadata format');
    }

    return metadata;
  } catch (error) {
    console.error('Gemini error:', error.message);
    throw new Error('Failed to generate metadata');
  }
};
