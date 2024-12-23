import mongoose from "mongoose";
const fileModel = mongoose.Schema({
  filepath: String,
});
export default mongoose.model("file", fileModel);


