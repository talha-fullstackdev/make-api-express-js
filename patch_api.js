import express from "express"
import employee from "./model/employeeModel.js"
import connectiondb from "./db/connectiondb.js"
const app = express()
app.use(express.json())
connectiondb()
app.patch("/employees/:id",async (req,res)=>{
    try{
      const empID = req.params.id
      const {name,email,gender,department,position}=req.body
      const updatedEmp = await employee.findByIdAndUpdate(
        empID,
        {name,email,gender,department,position},
        {new:true}
      )
      if(!updatedEmp){
        return res.status(404).json({msg:"Employee not found"})
      }
      res.json(updatedEmp)
    }catch(err){
        console.log("error has occured while updating",err)
        res.status(500).send("server error")
    }
})
app.listen(3000,()=>{
    console.log("server started http://localhost:3000")
})