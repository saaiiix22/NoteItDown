const express = require("express")
const app = express()
const dotenv = require("dotenv")
const connection = require("./01_connection/connection")
const routerMan = require("./04_router/router")
const cors = require("cors")
dotenv.config("./.env")

app.use(cors())
app.use(express.json())
connection()
app.use("/", routerMan)


app.listen(process.env.PORT, ()=>{
    console.log("Server is running");
})