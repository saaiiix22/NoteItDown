const mongoose = require("mongoose")

const accSchema = new mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    password:String
})

const noteSchema = new mongoose.Schema({
    title:String,
    content:String,
    subject:String,
    accId:String  
})
module.exports = {accSchema,noteSchema}