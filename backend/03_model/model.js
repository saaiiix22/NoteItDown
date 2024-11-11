const mongoose = require("mongoose")
const {accSchema, noteSchema} = require("../02_schema/schema")

const accInfo = mongoose.model("accounts", accSchema)
const noteInfo = mongoose.model("notes", noteSchema)

module.exports = {accInfo,noteInfo}