const express = require("express")
const {accInfo,noteInfo} = require("../03_model/model")
const routerMan = express.Router()
const bcrypt  = require("bcrypt")
const jwt = require("jsonwebtoken")
const secretkey = process.env.SECRET_KEY || "DDTFVYG123s2$#d36RDTrd%4EDEwesr%^DtryETR13"


// ! CREATE A USER

routerMan.post("/create", async(req,res)=>{
    let {name,email,phone,password} = req.body
    try {
        const genSalt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,genSalt)
        const existUser = await accInfo.find({email})
        if(existUser.email == email){
            res.json({message:"User Already Exists"})
        }
        else{
            try {
                const fdata = await accInfo.insertMany([{name,email,phone,password:hashPassword}])
                res.json({message:"User Created", data:fdata})
            } catch (error) {
                res.json({message:"Internal Server Error 1"})
            }
        }
    } catch (error) {
        res.json({message:"Internal Server Error 2"})
    }
})

// ! LOGIN USER

routerMan.post("/login", async(req,res)=>{
    let {email,logPassword} = req.body
  
        try {
            const data = await accInfo.findOne({email})
            const checkPass = await bcrypt.compare(logPassword,data.password)
            if(data && checkPass){
                const token=jwt.sign({user:data},secretkey,{expiresIn:"1hr"})                
                res.json({message:"login successful",token,name:data.name})
            }
            else{
                res.json({message:"login failed wrong credentials",token:null})
            }
        } catch (error) {
            res.json({message:"Internal Server Error"})
        }
    
})

// ! RESET PASSWORD

routerMan.put("/reset", async(req,res)=>{
    let {email,password,confirmPass} = req.body

    try {
        const checkEmail = await accInfo.findOne({email})
        // console.log(checkEmail);
        if(checkEmail.email == email && password == confirmPass){
            // console.log("hello");
            try {
                const genSalt = await bcrypt.genSalt(10)
                const hashPass = await bcrypt.hash(confirmPass,genSalt)
                const updAccPass = await accInfo.updateOne({_id:checkEmail._id},{$set:{password:hashPass}})
                // console.log(updAccPass);
                updAccPass? res.json({message:"User updated Successfully"}):res.json("User updation failed")
            } catch (error) {
                res.json({message:"Internal Server Error 1"})
            }
        }
        else{
            res.json({message:"Email doesn't exist"})
        }
    } catch (error) {
        res.json({message:"Internal Server Error 2"})
    }
})


// todo MIDDLE-WARE TO CHECK THE PARTICULAR TOKEN

const verifyToken =(req,res,next)=>{
    
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
         res.json({auth:false,message:"Token not found"})
    }
    else{
        jwt.verify(token, secretkey, (err,decode)=>{
            if(err){
                res.json({auth:false,message:"Failed to Authenticate Token"})
            }
            else{
                // console.log(decode.id);
                req.user = decode.user
            }
            next()
        })
    }
}

// ! READ ALL THE NOTES BY A SPECIFIC ACC
routerMan.get("/read-note", verifyToken, async(req,res)=>{
    let currentUser = req.user
    if(currentUser){
        try {
            const data = await noteInfo.find({accId:currentUser._id},{accId:0})
            res.json({message:"you can read the notes", data:data})
        } catch (error) {
            res.json({message:"couldn't fetch the notes"})
        }
    }
})


//  ! CREATE A NOTE
routerMan.post("/create-note", verifyToken, async(req,res)=>{
    let currentUser = req.user
    let {title,content,subject} = req.body
    try {
        const data = await noteInfo.insertMany([{title,content,subject,accId:currentUser._id}])
        res.json({message:"note inserted successfully"})
    } catch (error) {
        res.json({message:"failed to add notes"})
    }
})

// ! UPDATE NOTE
routerMan.put("/update-note/:id", verifyToken,async(req,res)=>{
    let {id} = req.params
    let {title,content,subject} = req.body
    let currentUser = req.user


    try {
        const readData = await noteInfo.findOne({_id:id})
        if(readData.accId == currentUser._id ){
            try {
                const data = await noteInfo.updateOne({_id:id},{title,content,subject})
                res.json({message:"Updation Done!!"})
            } catch (error) {
                res.json({message:"updation failed"})
            }
        }
        else{
            res.json({message:"Account not found please log in"})
        }
    } catch (error) {
        res.json({message:"Internal Server Error"})   
    }
})


// ! DELETE A NOTE
routerMan.delete("/delete-note/:id", verifyToken, async(req,res)=>{
    let {id} = req.params
    let currentUser = req.user
    console.log(currentUser);
    
    try {
        const data = await noteInfo.findOne({_id:id})
        console.log(data);
        
        if(currentUser._id == data.accId){
            const delNote = await noteInfo.deleteOne({_id:id})
            res.json({message:"Delete Done !!"})
        }
        else{
            res.json({message:"Delete Fail"})
        }
    } catch (error) {
        res.json({message:"Couldn't able to delete note"})
    }
})


routerMan.get("/read-single-note/:id", verifyToken,async(req,res)=>{
    let {id} = req.params
    const data = await noteInfo.findOne({_id:id})
    res.json({data})
})


module.exports = routerMan

