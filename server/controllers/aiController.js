import { GoogleGenerativeAI } from "@google/generative-ai";

export const aiController = async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
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

export const generateQuestionsFromTopic = async (req, res) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const { topic, context, numberOfQuestions = 5 } = req.body;

    if (!topic || !context) {
      return res.status(400).json({
        msg: "topic and context are required",
      });
    }

    const prompt = `Generate exactly ${numberOfQuestions} multiple choice quiz questions on the topic: "${topic}"

Context: ${context}

For each question, provide the response in the following JSON format (make sure to return valid JSON):
{
  "questions": [
    {
      "title": "Question text here?",
      "options": ["Option 1", "Option 2", "Option 3"],
      "ansIndex": 1
    }
  ]
}

Requirements:
- Each question must have exactly 3 options
- ansIndex should be 1, 2, or 3 (the correct answer index)
- Make questions educational and relevant to the topic
- Keep questions clear and concise
- Options should be plausible but one clearly correct answer

Return ONLY the JSON object, no additional text.`;

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

    // Parse the JSON response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(output);
    } catch (parseError) {
      // Try to extract JSON from the response if it's wrapped in markdown code blocks
      const jsonMatch = output.match(/```json\n?([\s\S]*?)\n?```/) ||
                        output.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[1] || jsonMatch[0]);
      } else {
        throw new Error("Failed to parse AI response as JSON");
      }
    }

    if (!parsedResponse.questions || !Array.isArray(parsedResponse.questions)) {
      return res.status(500).json({
        msg: "Invalid response format from AI",
      });
    }

    return res.status(200).json({
      msg: "Questions generated successfully",
      questions: parsedResponse.questions,
    });
  } catch (error) {
    console.error("Question Generation Error:", error);
    return res.status(500).json({
      msg: "Error generating questions",
      error: error.message,
    });
  }
};