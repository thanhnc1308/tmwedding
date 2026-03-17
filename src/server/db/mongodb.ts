import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local',
  );
}

// Use globalThis which works in both Node.js and Edge/browser environments
const globalWithMongoose = globalThis as typeof globalThis & {
  mongooseConnection?: Promise<typeof mongoose>;
};

async function dbConnect() {
  // Return cached connection if available
  if (globalWithMongoose.mongooseConnection) {
    return globalWithMongoose.mongooseConnection;
  }

  const opts = {
    bufferCommands: true, // Enable buffering so queries wait for connection
  };

  // Cache the connection promise
  globalWithMongoose.mongooseConnection = mongoose.connect(MONGODB_URI, opts);

  return globalWithMongoose.mongooseConnection;
}

// Auto-connect on module load
dbConnect().catch((err) => {
  console.error('Failed to connect to MongoDB on startup:', err);
  globalWithMongoose.mongooseConnection = undefined;
});

export default dbConnect;
