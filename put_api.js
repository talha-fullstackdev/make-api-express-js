import express from "express";
import connectiondb from "./db/connectiondb.js";
import employee from "./model/employeeModel.js";
connectiondb();
const app = express();
app.use(express.json());
app.put("/employee/:id", async (req, res) => {
  try {
    const employeeId = req.params.id;
    const { name, email, gender, department, position } = req.body;
    const updateEmployee = await employee.findByIdAndUpdate(
      employeeId,
      { name, email, gender, department, position },
      { new: true }
    );
    if (!updateEmployee) {
      return res.status(404).json({ msg: "employee not found!" });
    }
    res.json(updateEmployee);
  } catch (err) {
    console.err("Error ocuured while updating employee data!", err);
    res.status(500).send("server error!");
  }
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The server has been started at http://localhost:3000`);
});

///////////////////////////////////////////////////////////////////////
// difference between put and patch is that if we want to update all fields then we use put method but if you want to update few fields then we use patch method
// in put api if we want to update only one field we have to write all other properties as well which are not supposed to be changed otherwise they may be lose but in patch if we want to update one field then we have only provide that filed not all fileds