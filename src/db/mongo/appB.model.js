import mongoose from "mongoose";

const appBSchema = new mongoose.Schema({
  productId: String,
  quantity: Number,
  timestamp: Date,
});

export const AppBCollection = mongoose.model("AppBCollection", appBSchema);
