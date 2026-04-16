import { Quiz } from "../models/quizModel.js";

export const getQuiz = async (req, res) => {
  try {
    const id = req.user.user.id;

    if (!id) {
      return res.status(400).json({
        msg: "unauthenticated",
      });
    }

    const quizzes = await Quiz.find({
      createdBy: id,
    }).lean();
    res.status(200).json({
      msg: "quiz",
      quizzes,
    });
  } catch (error) {
    res.status(500).json({
      msg: "server error",
    });
  }
};

export const createQuiz = async (req, res) => {
  try {
    const { title, questions } = req.body;
    const createdBy = req.user.user.id;

    if (!title || !questions || !createdBy) {
      return res.status(400).json({
        msg: "missing fields",
      });
    }

    const quiz = await Quiz.create({
      title,
      questions,
      createdBy,
    });

    res.status(201).json({
      msg: "quiz created successfully",
      quiz: quiz,
    });
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({
      msg: "server error",
    });
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    const id = req.params.id;

    const quiz = await Quiz.findById(id);

    if (!quiz) {
      return res.status(400).json({
        msg: "no such quiz",
      });
    }

    await Quiz.findByIdAndDelete(id);

    return res.status(200).json({
      msg: "deleted successfully",
    });
  } catch (error) {
    console.log("error in delete quiz", error);
    return res.status(500).json({
      msg: "server error",
    });
  }
};
