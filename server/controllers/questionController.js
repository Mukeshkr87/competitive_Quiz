import Question from "../models/questionModel.js";

export const createQuestion = async (req, res) => {
  try {
    const { title, options, ansIndex } = req.body;

    if (!title || !options || !ansIndex) {
      return res.status(400).json({
        msg: "missing fields",
      });
    }

    const question = await Question.create({
      title,
      options,
      ansIndex,
    });

    res.status(201).json({
      msg: "question created successfully",
      question,
    });
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).json({
      msg: "server error",
    });
  }
};

export const getQuestion = async (req, res) => {
  try {
    const questions = await Question.find({}).lean();
    res.status(200).json({
      msg: "questions",
      questions,
    });
  } catch (error) {
    res.status(500).json({
      msg: "server error",
    });
  }
};

export async function deleteQuestion(req, res) {
  try {
    const id = req.params.id;

    const question = await Question.findById(id);

    if (!question) {
      return res.status(400).json({
        msg: "no such question",
      });
    }

    await Question.findByIdAndDelete(id);

    return res.status(200).json({
      msg: "deleted successfully",
    });
  } catch (error) {
    console.log("error in delete question", error);
    return res.status(500).json({
      msg: "server error",
    });
  }
}
