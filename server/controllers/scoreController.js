import { Score } from "../models/scoreModel.js";

export const handleFetchScore = async (req, res) => {
  try {
    const userId = req.user?.user?.id;

    if (!userId) {
      return res.status(401).json({
        msg: "unauthorised",
      });
    }

    const scores = await Score.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

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
