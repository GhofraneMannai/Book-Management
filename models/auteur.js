const mongoose = require("mongoose")

//auteur
const authorSchema = mongoose.Schema({
   name: { type: String, required: true  },
   nationality: { type: String, required: true },
   dateOfBirth: { type: String, required: true },
   biography: { type: String, required: true }
 });
 module.exports = mongoose.model("Author", authorSchema)