import express from "express";
import connectiondb from "./db/connectiondb.js";
import user from "./model/userModel.js";
connectiondb();
const app = express();
app.use(express.json());
app.put("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, gender } = req.body;
    const updateUser = await user.findByIdAndUpdate(
      userId,
      { name, email, gender },
      { new: true }
    );
    if (!updateUser) {
      return res.status(404).json({ msg: "user not found!" });
    }
    res.json(updateUser);
  } catch (err) {
    console.error("error occured while updating");
    res.status(500).send("server error");
  }
});
app.listen(3000, () => {
  console.log("server has started http://localhost:3000");
});
