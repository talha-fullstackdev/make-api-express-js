import mongoose from "mongoose";
const employeeModel = mongoose.Schema({
    name : String,
    email : String,
    gender : String,
    department: String,
    position: String
})
export default mongoose.model("employee",employeeModel)