import mongoose from "mongoose";

type MongooseConnection = {
  isConnected?: number | null;
};

const connection: MongooseConnection = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(
      (process.env.MONGODB_URI as string) || "",
      {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      }
    );
    connection.isConnected = db.connections[0].readyState;

    console.log("MongoDB connection state:", connection.isConnected);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Failed to connect to database");
  }
  if (connection.isConnected) {
    console.log("MongoDB connected successfully");
  } else {
    console.error("MongoDB connection failed");
  }
}

export default dbConnect;
