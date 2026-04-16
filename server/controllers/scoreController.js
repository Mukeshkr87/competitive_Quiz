import { Score } from "../models/scoreModel.js";

export const handleFetchScore = async (req, res) => {
  try {
    const scores = await Score.find({}).lean();

    return res.status(200).json({
      msg: "fetched successfully",
      scores,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "server error",
    });
  }
};
