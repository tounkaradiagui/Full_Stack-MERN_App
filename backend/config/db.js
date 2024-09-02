import mongoose, { mongo } from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        process.env.NODE_ENV === "development" && console.log("Connected to MongoDB");
    } catch (error) {
        console.error(`Error. ${error.message}`);
        process.exit(1); 
    }
}