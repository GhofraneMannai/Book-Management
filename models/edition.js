const mongoose = require("mongoose")
 //editing
 const editingSchema = mongoose.Schema({
    editor: { type: String, required: true },
    placeEditing: { type: String, required: false },
    dateOfEditing: { type: String, required: false }
  });
  
module.exports = mongoose.model("Edition", editingSchema)