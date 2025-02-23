import { MongoClient } from 'mongodb';
import { MONGO_URI, DB_NAME } from './env';

const client = new MongoClient(MONGO_URI);

export const connectDB = async () => {
  try {
    await client.connect();
    return client.db(DB_NAME);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export const db = client.db(DB_NAME);
