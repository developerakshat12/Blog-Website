import mongoose from "mongoose";

const Connection = async() => {
    const URL = `mongodb+srv://akshatshah:mDIvDzAYuiussbTF@blog-website.kvbz0.mongodb.net/?retryWrites=true&w=majority&appName=blog-website`;
    try {
        await mongoose.connect(URL)
        console.log('Database Connected Successfully');
    } catch (error) {
        console.log('error while connectiong to database',error);        
    }
}

export default Connection;