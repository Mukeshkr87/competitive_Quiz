import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  score: {
    required: true,
    type: Number,
  },
  username: {
    type: String,
    required: true,
  },
});

export const Score = mongoose.model("Score", scoreSchema);
