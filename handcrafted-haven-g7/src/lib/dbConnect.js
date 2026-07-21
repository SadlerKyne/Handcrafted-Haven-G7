import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Cached on the global object so hot-reloading in dev doesn't open a new
// connection on every module reload.
let cached = global._mongoose;

if (!cached) {
  cached = global._mongoose = { conn: null, promise: null };
}

export default async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    if (!MONGODB_URI) {
      throw new Error("Missing MONGODB_URI environment variable");
    }

    cached.promise = mongoose
      .connect(MONGODB_URI, { bufferCommands: false })
      .then((mongooseInstance) => mongooseInstance);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
