import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

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

export const generateQuestionsFromPDF = async (req, res) => {
  try {
    console.log("🔍 PDF generation function started");
    console.log("📁 req.file exists:", !!req.file);
    console.log("📋 req.body:", req.body);

    if (!req.file) {
      console.log("❌ No file uploaded");
      return res.status(400).json({
        msg: "PDF file is required",
      });
    }

    console.log("✅ File validation passed");
    console.log("📄 File details:", {
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path
    });

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const { numberOfQuestions = 5 } = req.body;
    console.log("🔢 Number of questions requested:", numberOfQuestions);

    // Extract text from PDF
    console.log("📖 Starting PDF text extraction...");
    console.log("📂 File path:", req.file.path);

    const pdfBuffer = fs.readFileSync(req.file.path);
    console.log("✅ PDF buffer read successfully, size:", pdfBuffer.length);

    console.log("🔧 Calling pdfParse...");
    const { PDFParse } = await import("pdf-parse");
    const parser = new PDFParse({ data: pdfBuffer });
    const pdfResult = await parser.getText();
    console.log("✅ PDF parsing completed");
    console.log("📝 Extracted text length:", pdfResult.text?.length);

    // Clean up the uploaded file
    fs.unlinkSync(req.file.path);
    console.log("🗑️ Uploaded file cleaned up");

    const extractedText = pdfResult.text;

    if (!extractedText || extractedText.trim().length < 100) {
      console.log("❌ Insufficient text content:", extractedText?.trim().length || 0);
      return res.status(400).json({
        msg: "PDF does not contain enough text content for question generation",
      });
    }

    console.log("✅ Text content validation passed");

    // Truncate text if too long (keep first 10,000 characters)
    const truncatedText = extractedText.length > 10000
      ? extractedText.substring(0, 10000) + "..."
      : extractedText;

    console.log("✂️ Text truncated to length:", truncatedText.length);

    const prompt = `Generate exactly ${numberOfQuestions} multiple choice quiz questions based on the following PDF content:

Content: ${truncatedText}

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
- Make questions educational and relevant to the PDF content
- Keep questions clear and concise
- Options should be plausible but one clearly correct answer
- Focus on key concepts and important information from the PDF

Return ONLY the JSON object, no additional text.`;

    console.log("🤖 Preparing AI request...");

    const request = {
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    };

    console.log("🚀 Calling Gemini AI...");
    const result = await model.generateContent(request);
    console.log("✅ AI response received");

    const response = await result.response;
    const output = response.text();
    console.log("📄 Raw AI output length:", output.length);

    // Parse the JSON response
    console.log("🔍 Parsing AI response as JSON...");
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(output);
      console.log("✅ JSON parsing successful");
    } catch (parseError) {
      console.log("❌ JSON parsing failed:", parseError.message);
      console.log("🔍 Attempting to extract JSON from response...");

      // Try to extract JSON from the response if it's wrapped in markdown code blocks
      const jsonMatch = output.match(/```json\n?([\s\S]*?)\n?```/) ||
                        output.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          parsedResponse = JSON.parse(jsonMatch[1] || jsonMatch[0]);
          console.log("✅ JSON extracted and parsed successfully");
        } catch (extractError) {
          console.log("❌ JSON extraction failed:", extractError.message);
          throw new Error("Failed to parse AI response as JSON");
        }
      } else {
        console.log("❌ No JSON found in AI response");
        throw new Error("No JSON found in AI response");
      }
    }

    console.log("📋 Parsed response structure:", {
      hasQuestions: !!parsedResponse.questions,
      questionsCount: parsedResponse.questions?.length || 0
    });

    if (!parsedResponse.questions || !Array.isArray(parsedResponse.questions)) {
      console.log("❌ Invalid response structure");
      return res.status(500).json({
        msg: "Invalid response format from AI",
      });
    }

    console.log("✅ Response validation passed");
    console.log("🎉 PDF question generation completed successfully");

    return res.status(200).json({
      msg: "Questions generated successfully from PDF",
      questions: parsedResponse.questions,
      extractedTextLength: extractedText.length,
    });
  } catch (error) {
    console.error("🚨 PDF Question Generation Error:", error);
    console.error("🚨 Error message:", error.message);
    console.error("🚨 Error stack:", error.stack);

    // Clean up uploaded file if it exists
    if (req.file && req.file.path && fs.existsSync(req.file.path)) {
      console.log("🧹 Cleaning up uploaded file due to error");
      fs.unlinkSync(req.file.path);
    }

    console.log("❌ Sending error response to client");

    return res.status(500).json({
      msg: "Error generating questions from PDF",
      error: error.message,
    });
  }
};