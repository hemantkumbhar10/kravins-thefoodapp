import mongoose from 'mongoose';


async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("Successfully connected to Database");
    } catch (err) {
        console.log("Error Connecting to Database " + err)
    }
}

export default connectToDatabase;