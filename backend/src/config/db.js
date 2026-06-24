import mongoose from "mongoose";
import {ENV} from "./env.js";

export const connectDB = async () =>{

    try {
       await mongoose.connect(ENV.MONOG_URI)
       console.log("Connected to MongoDB");
    } catch (error){
        console.log(error);
        procces.exit(1);
    }
}
