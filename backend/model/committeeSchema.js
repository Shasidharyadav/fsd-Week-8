const mongoose = require("mongoose");


const committeeSchema = new mongoose.Schema({
  committee_name: {
    type: String, 
    required: true 
   },
  seats: {
    type: Number,
    required: true,
  }, 
  tasks: {
    type: String,
    required: true,
  },
  status:{
    type:Number,
    required:true,
    default:1
  },
  createdAt: {
    type: String,
    required: true,
  }, 
  
});

const Committee = mongoose.model("committees", committeeSchema);
module.exports = Committee;
