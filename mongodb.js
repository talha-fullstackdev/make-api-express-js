import express from "express"
import connectionDB from "./db/connectiondb.js"
import employee from "./model/employeeModel.js"
connectionDB()
import cors from "cors";


const app = express()
app.use(cors());
app.get("/",async (req,res)=>{
    try{
        const employeeData = await employee.find()
        res.json(employeeData)
    }catch(err){
        console.log("cound not fetch data",err)
        res.status(500).send("server error");
    }
})
app.listen(3000,()=>{
    console.log("server started http://localhost:3000")
})
