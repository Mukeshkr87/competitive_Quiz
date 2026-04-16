import { GoogleGenerativeAI } from "@google/generative-ai";

export const aiController = async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-preview-05-20",
    });

    const { prompt } = req.body;

    const request = {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    };

    const result = await model.generateContent(request);
    const response = await result.response;
    const output = response.text();

    return res.status(200).json({
      output,
    });
  } catch (error) {
    console.error("API Error:", error);
    return res.status(500).json({
      msg: "server error",
    });
  }
};
