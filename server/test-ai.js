import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const testAI = async () => {
  try {
    console.log("Testing Google Generative AI...");
    console.log("API Key exists:", !!process.env.GEMINI_API_KEY);
    console.log("API Key starts with:", process.env.GEMINI_API_KEY?.substring(0, 10) + "...");

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Try the model name from the user's curl command
    const modelNames = ["gemini-2.5-flash", "gemini-1.5-flash", "gemini-pro"];

    for (const modelName of modelNames) {
      try {
        console.log(`\nTrying with model: ${modelName}`);

        const model = genAI.getGenerativeModel({
          model: modelName,
        });

        const prompt = "Say hello";

        const request = {
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
        };

        console.log("Making API call...");
        const result = await model.generateContent(request);
        const response = await result.response;
        const output = response.text();

        console.log("✅ Success! Response:", output);
        console.log(`🎉 Working model: ${modelName}`);
        return; // Exit if successful
      } catch (modelError) {
        console.log(`❌ Model ${modelName} failed:`, modelError.message);
      }
    }

    console.log("❌ All models failed. API key might be invalid or from wrong service.");
  } catch (error) {
    console.error("❌ Error:", error);
    console.error("❌ Error message:", error.message);
  }
};

testAI();