import express from "express";
import connectionDB from "./db/connectiondb.js";
import employee from "./model/employeeModel.js";
connectionDB();
const app = express();
app.use(express.json());
//////////// get all employees data
app.get("/employeeData", async (req, res) => {
  try {
    const employees = await employee.find();
    res.json(employees);
  } catch (err) {
    console.error("error fetching data", err);
    res.status(500).send("server error");
  }
});
///////////////// get only one empployee data by its id
app.get("/employeeData/:id", async (req, res) => {
  try {
    let empId = req.params.id;
    let emp = await employee.findById(empId);
    if (!empId) {
      res.status(404).json({ msg: "employee not found" });
    }
    res.status(200).json(emp);
  } catch (err) {
    console.error("error happer", err);
    res.status(500).send("server error");
  }
});
/////////////// delete user data by using its id
app.delete("/delete/:id", async (req, res) => {
  try {
    let empId = req.params.id;
    let deleteEmp = await employee.findByIdAndDelete(empId);
    if (!deleteEmp) {
      return res.status(409).json({ msg: "no emp found with this id" });
    }
    res.status(200).send("emp deleted successfully");
  } catch (err) {
    console.error("error", err);
    res.status(500).send("server error");
  }
});
//////////////////api to post data in employee data base
app.post("/postEmployee", async (req, res) => {
  try {
    const { name, email, gender, department, position } = req.body;
    const existUser = await employee.findOne({email})
    if(existUser){
        return res.status(404).json({
            msg:"user exist with this email try another email to register"
        })
    }
    const newEmp = new employee({
      name,
      email,
      gender,
      department,
      position,
    });
    const newEmployee = await newEmp.save();
    res.json({
        msg:"This employee is saved to the data base",
        newEmployee
    });
  } catch (err) {
    console.error("server side error ocuured!", err);
    res.status(500).send("server error!");
  }
});
app.listen(3000, () => {
  console.log("the server has started at port 3000");
});
