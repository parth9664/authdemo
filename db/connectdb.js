import mongoose from "mongoose";

const connectdb = async (url) => {
    try {
        const connect = mongoose.connect(url)
    } catch (error) {
        console.log(error);
    }
}

export default connectdb