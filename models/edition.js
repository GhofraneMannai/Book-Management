const mongoose = require("mongoose")
 //editing
 const editingSchema = mongoose.Schema({
    editor: { type: String, required: true },
    placeEditing: { type: String, required: true },
    dateOfEditing: { type: String, required: true }
  });
  
module.exports = mongoose.model("Edition", editingSchema)