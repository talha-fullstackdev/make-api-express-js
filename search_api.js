import express from "express"
import connectiondb from "./db/connectiondb.js"
import employee from  "./model/employeeModel.js"
connectiondb()
const app = express()
app.get("/search-emp/:value",async(req,res)=>{
    try{
        const searchValue = req.params.value
        const result = await employee.find({
            "$or":[
                {"name":{$regex :searchValue, $options: "i" }}, // here multiple values for seacrh our value in all fields
                {"email":{$regex :searchValue, $options: "i" }},// option i for case sensitive now it will work on case sensitive words
                {"gender":{$regex :searchValue, $options: "i" }},
                {"department":{$regex :searchValue, $options: "i" }},
                {"position":{$regex :searchValue, $options: "i" }}
            ]
        })
        if(result.length===0){ // here checking result length if it is zero mean no item is found 
            return res.status(404).json({msg:"no record found for this search"})
        }
        res.send(result)

    }catch(err){
        console.log("error has occured while searching")
        res.status(500).send("server error")
    }
})
app.listen(3000,()=>{
    console.log("server has started http:/localhost:3000")
})
// note our search s case sensitive ,if in record there is Talha and we seacrh talha then it will not work