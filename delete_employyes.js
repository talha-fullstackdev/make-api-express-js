import express from "express";
import connectiondb from "./db/connectiondb.js";
import employee from "./model/employeeModel.js";
connectiondb();
const app = express();
app.use(express.json());
app.delete("/employess/:id", async (req, res) => {
  try {
    const employeeId = req.params.id;
    const deleteEmployee = await employee.findByIdAndDelete(employeeId);
    if (!deleteEmployee) {
      return res.status(404).json({ msg: "employee not found!" });
    }
    res.json({ msg: "Employee deleted succesfully" });
  } catch (err) {
    console.error("error has occured while deleting employee");
    res.status(500).send("server error!");
  }
});
app.listen(3000, () => {
  console.log("server started http://localhost:3000");
});
