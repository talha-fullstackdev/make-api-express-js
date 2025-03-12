import express from "express";
import connectiondb from "./db/connectiondb.js";
import user from "./model/userModel.js";
connectiondb();
const app = express();
app.use(express.json());
app.post("/users", async (req, res) => {
  try {
    const { name, email, gender } = req.body;
    const newUser = new user({
      name,
      email,
      gender,
    });
    const users = await newUser.save();
    res.json(users);
  } catch (err) {
    console.err("error occured while sending data to data base");
    res.status(500).send("server errror!");
  }
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server started http://localhost:${PORT}`);
});
