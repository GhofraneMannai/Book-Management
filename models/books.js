const mongoose = require("mongoose")

//creer _id de type objectid avec Schema
const bookSchema = mongoose.Schema({
   title: { type: String,required:true},
   ISBN : { type: String,required:true},
   description: { type: String,required:false},
   date_of_publication: { type: Date,required:false},
   category: { type: String,required:false},
   number_page: { type: Number,required:false},
   language : { type: String,required:false},
   // Utilisez la référence vers le schéma des auteurs
   author: { type: JSON, required: true },
   // Utilisez la référence vers le schéma des editeurs
   edition: { type: JSON, required: true }
})

module.exports = mongoose.model("Book", bookSchema)