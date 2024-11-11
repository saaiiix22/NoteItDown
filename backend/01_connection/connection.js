const mongoose = require("mongoose")

const connection = async()=>{
    try {
        const data = await mongoose.connect(process.env.DB_Url)
        data?console.log("connected succesfully"):console.log("connection failed")
    } catch (error) {
        console.log("Internal Server Error");
    }
}
module.exports = connection