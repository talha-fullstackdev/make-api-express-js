// import express from "express"
// import connectionDB from "./db/connectiondb.js"
// import employee from "./model/employeeModel.js";
// connectionDB()
// const app = express()
// // app.use(express.json())
// app.get("/employee",async(req,res)=>{
//     try{
//         const employess = await employee.find()
//         res.json(employess)

//     }catch(error){
//         console.error("error came while fetching data from data base",error)
//         res.status(500).send("server error")
//     }
// })
// app.listen(2000,()=>{
//     console.log("server has started at http://localhost:3000")
// })

import express from "express";
import connectionDB from "./db/connectiondb.js";
import employee from "./model/employeeModel.js";

// Connect to the database
connectionDB();

const app = express();

// Uncomment if you plan to parse JSON payloads
app.use(express.json());

app.get("/employee", async (req, res) => {
  try {
    const employees = await employee.find(); // Corrected typo
    res.json(employees);
  } catch (error) {
    console.error("Error occurred while fetching data from database:", error);
    res.status(500).send("Server error");
  }
});
app.get("/employee/:id", async (req, res) => {
  try {
    const empID = req.params.id;
    const employeeID = await employee.findBYIdAndUpdate(empID);
    if (!empID) {
      return res.status(404).json({ msg: "employee not found" });
    }
    res.json(employeeID);
  } catch (err) {
    console.log("error has occured while geting data", err);
    res.status(500).send("server error");
  }
});

app.listen(2000, () => {
  console.log("Server has started at http://localhost:2000"); // Updated port in the log
});
