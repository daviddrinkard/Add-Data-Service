import mongoose from "mongoose";

const appASchema = new mongoose.Schema({
  userId: String,
  email: String,
  createdAt: Date,
});

export const AppACollection = mongoose.model("AppACollection", appASchema);
