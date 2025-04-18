import express from "express";
import connectionDB from "./db/connectiondb.js";
import employee from "./model/employeeModel.js";
connectionDB();
const app = express();
app.use(express.json()); // this middleware convert the json data comming in req.body to javascript object
//////////// get all employees data
app.get("/employeeData", async (req, res) => {
  try {
    const employees = await employee.find();
    res.json(employees);
  } catch (err) {
    console.error("server side errro!", err);
    res.status(500).send("server error!");
  }
});
///////////////// get only one empployee data by its id
app.get("/employeeData/:id", async (req, res) => {
  try {
    let empId = req.params.id;
    let emp = await employee.findById(empId);
    if (!emp) {
      res.status(404).json({ msg: "Employee not found" });
    }
    res.status(200).json(emp);
  } catch (err) {
    console.error("server side error!", err);
    res.status(500).send("server error!");
  }
});
/////////////// delete user data by using its id
app.delete("/delete/:id", async (req, res) => {
  try {
    let empId = req.params.id;
    let deleteEmp = await employee.findByIdAndDelete(empId);
    if (!deleteEmp) {
      return res.status(409).json({ msg: "no employee found with this id!" });
    }
    res.status(200).send("Employee deleted successfully");
  } catch (err) {
    console.error("server side error!", err);
    res.status(500).send("server error!");
  }
});
//////////////////api to post data in employee data base
app.post("/postEmployee", async (req, res) => {
  try {
    const { name, email, gender, department, position } = req.body;
    const existUser = await employee.findOne({ email });
    if (existUser) {
      return res.status(409).json({
        msg: "user exist with this email try another email to register",
      });
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
      msg: "This employee is saved to the data base",
      newEmployee,
    });
  } catch (err) {
    console.error("server side error ocuured!", err);
    res.status(500).send("server error!");
  }
});
/////////////////////////////////////////////////
///// put api (to edit existing employee data)
app.put("/putemployee/:id", async (req, res) => {
  try {
    let empID = req.params.id;
    const { name, email, gender, department, position } = req.body;
    const emp = await employee.findById(empID);
    if (emp.name == name) {
      return res.status(409).json({
        // here if i use 304 status code then my json object will be ignore and not show in json response if you want to show a json object and a message then use another status code like 404 and 409
        msg: "not modified! current name is same is old name use another name",
      });
    }
    let updatedEmployee = await employee.findByIdAndUpdate(
      empID,
      { name, email, gender, department, position },
      { new: true }
    );
    res.status(200).json({
      msg: "employee data updated succesfully",
      updatedEmployee,
    });
  } catch (err) {
    console.error("server side error!", err);
    res.status(500).send("server error");
  }
});
/////////////////////////////////////////////////////
/////// search api
app.get("/search/:value", async (req, res) => {
  try {
    let searchValue = req.params.value;
    let result = await employee.find({
      $or: [
        { name: { $regex: searchValue, $options: "i" } },
        { email: { $regex: searchValue, $options: "i" } },
        { gender: { $regex: searchValue, $options: "i" } },
        { department: { $regex: searchValue, $options: "i" } },
        { position: { $regex: searchValue, $options: "i" } }
      ],
    });
    if (result.length === 0) {
      return res.status(404).json({ msg: "No matched found for this search" });
    }
    res.json(result);
  } catch (err) {
    console.error("Error ocuured", err);
    res.status(500).send("server error!");
  }
});
app.listen(3000, () => {
  console.log("The server has started at port 3000");
});
