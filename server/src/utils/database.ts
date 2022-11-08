import mongoose from "mongoose";
import logger from "./logger";

const DB_CONNECTION_STRING =
  "mongodb+srv://accessDB:pwd123@youtubecluster.kmnktfe.mongodb.net/?retryWrites=true&w=majority";

export async function connectToDatabase() {
  try {
    await mongoose.connect(DB_CONNECTION_STRING);

    logger.info("Connected to database!");
  } catch (e) {
    logger.error(e, "Error connecting with database");

    process.exit(1);
  }
}

export async function disconnectFromDatabase() {
  mongoose.connection.close();

  logger.info("Disconnected from database");

  return;
}
