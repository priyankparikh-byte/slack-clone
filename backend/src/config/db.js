import mongoose from "mongoose";
import {ENV} from "./env.js";

export const connectDB = async () =>{

    try {
       await mongoose.connect(ENV.MONGO_URI)
       console.log("Connected to MongoDB");
    } catch (error){
        console.error("MongoDB connection error:", error);
        throw error;
    }
}
