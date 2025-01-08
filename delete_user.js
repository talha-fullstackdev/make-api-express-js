import express from "express";
import connectiondb from "./db/connectiondb.js";
import user from "./model/userModel.js";
connectiondb();
const app = express();
app.use(express.json());
app.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deleteUser = await user.findByIdAndDelete(userId);
    if (!deleteUser) {
      return res.status(404).json({ msg: "User not found!" });
    }
    res.json({ msg: "User deleted Succesfully" });
  } catch (err) {
    console.error("Error occured while deleting", err);
    res.status(500).send("Server error!");
  }
});
app.listen(3000, () => {
  console.log("The server has started at http://localhost:3000");
});
