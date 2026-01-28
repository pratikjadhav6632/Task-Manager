
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const testConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/todo-app');
    console.log(`Test Connection Successful: ${conn.connection.host}`);
    process.exit(0);
  } catch (error) {
    console.error(`Test Connection Failed: ${error.message}`);
    process.exit(1);
  }
};

testConnect();
