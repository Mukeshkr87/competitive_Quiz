import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
    validate: {
      validator: function (val) {
        return val.length === 3; // must be exactly 3 options
      },
      message: "Each question must have exactly 3 options",
    },
  },
  ansIndex: {
    type: Number,
    required: true,
    validate: {
      validator: function (val) {
        return val > 0 && val <= this.options.length;
      },
      message: "answer should not be more than options length",
    },
  },
});

const Question = mongoose.model("Question", questionSchema);

export default Question;
