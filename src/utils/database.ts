import mongoose from "mongoose";

export async function connectToDB() {
  if (process.env.MONGO_URI) {
    await mongoose.connect(process.env.MONGO_URI);
  } else {
    console.log("MONGO_URI not found on the env! Exiting...");
    process.exit(1);
  }
}
