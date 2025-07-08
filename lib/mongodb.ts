import mongoose from "mongoose";

const MONGODB_URI= process.env.MONGODB_URL!;

if(!MONGODB_URI){
    throw new Error("Please define the mongo db uri")
}

async function connectToDatabase(){
    if (mongoose.connection.readyState=== 1){
        return mongoose
    }
    const options = {
        bufferCommands: false
    }

    await mongoose.connect(MONGODB_URI!, options);
    return mongoose;
} 

export default connectToDatabase;