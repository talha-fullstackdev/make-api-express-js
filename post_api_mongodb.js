import express from "express";
import connectiondb from "./db/connectiondb.js";
import employee from "./model/employeeModel.js";
connectiondb();
const app = express();
app.use(express.json()); // convert json data into javascript object to execute here (middleware)
app.post("/employees", async (req, res) => {
  try {
    const { name, email, gender, department, position } = req.body;
    const newEmployee = new employee({
      name,
      email,
      gender,
      department,
      position,
    });
    const employees = await newEmployee.save();
    res.json(employees);
  } catch (err) {
    console.error("error occured while sending data to database!");
    res.status(500).send("server error!");
  }
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server has started http://localhost:3000`);
});
