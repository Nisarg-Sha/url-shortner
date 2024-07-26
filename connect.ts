import mongoose from "mongoose";

mongoose.set("strictQuery", true);
async function connectToMongoDB(url: string) {
  return mongoose.connect(url);
}

export {
  connectToMongoDB,
};

