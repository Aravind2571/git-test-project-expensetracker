const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "Transaction type is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },
    source: {
      type: String,
      trim: true,
      default: "",
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0, "Amount cannot be negative"],
    },
    emoji: {
      type: String,
      default: "💰",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
