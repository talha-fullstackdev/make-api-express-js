import mongoose from "mongoose";
const connectionDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://nawazt964:yDrkUaTtFMJ64euq@cluster0.7lsnp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Data base connected succesfully");
  } catch (err) {
    console.error("Error occured while connecting to data base!",err);
  }
};
export default connectionDB;
