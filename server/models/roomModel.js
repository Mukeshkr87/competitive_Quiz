import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },

    roomCode: {
      type: String, // e.g. random 6-digit code
      unique: true,
      required: true,
    },

    maxPlayers: {
      type: Number,
      default: 10,
    },

    status: {
      type: String,
      enum: ["waiting", "in-progress", "ended"],
      default: "waiting",
    },
  },
  { timestamps: true }
);

export const Room = mongoose.model("Room", roomSchema);
