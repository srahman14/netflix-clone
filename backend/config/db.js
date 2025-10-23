import mongoose from "mongoose";

import { ENV_VARS } from "./envVars.js";

export const connectDB = async () => {
  try {
    const connect = await mongoose
      .connect(ENV_VARS.MONGO_URI)
      .then(() => console.log("MongoDB Connected"))
      .catch((err) => console.error("MongoDB Connection Failed", err));
    console.log("MongoDB connected: " + connect.connection.host);
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
    process.exit(1);
  }
};
