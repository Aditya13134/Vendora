import mongoose from 'mongoose';

/**
 * MongoDB connection URI from environment variables or default local connection
 */
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vendor-management';

/**
 * Cached database connection instance
 * @type {Object} Mongoose connection cache
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Establishes and manages MongoDB connection with caching
 * @returns {Promise<typeof mongoose>} Mongoose connection instance
 */
async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;