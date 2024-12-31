import express from "express"
import jwt from "jsonwebtoken"
const app = express()
const secretKey = "987jsbdhs78"
app.post("/login",(req,res)=>{
    const user ={
        name:"Talha nawaz",
        email: "talha12345@gmail.com"
    }
    const token = jwt.sign({user},secretKey,{expiresIn:"500s"})
    res.json(token)
})
const PORT = 3000
app.listen(PORT,()=>{
    console.log("server has started http://localhost:3000")
})