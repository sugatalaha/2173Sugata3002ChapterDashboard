import mongoose, { mongo } from "mongoose";
import { config } from "dotenv";
config();

const connectDB=async ()=>
{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("MongoDB connection failed:",error);
        process.exit(0);
    }
}

export default connectDB;