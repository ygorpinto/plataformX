import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI

async function connectDB () {
   await mongoose.connect(MONGODB_URI,{ 
       useNewUrlParser: true,
       useUnifiedTopology: true 
    });
   console.log('db connect')
}

export default connectDB;