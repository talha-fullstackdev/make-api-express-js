import mongoose from "mongoose";
const userModel = mongoose.Schema({
    name:String,
    email:String,
    gender:String
})
export default mongoose.model("user",userModel)