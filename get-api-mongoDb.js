import express from "express"
import connectionDB from "./db/connectiondb.js"
import employee from "./model/employeeModel.js"
connectionDB()
const app = express()
app.use(express.json())
app.get("/employeeData",async(req,res)=>{
    try{
        const employees = await employee.find()
        res.json(employees)
    }catch(err){
        console.error("error fetching data",err)
    }
})
app.listen(3000,()=>{
    console.log("the server has started at port 3000")
})