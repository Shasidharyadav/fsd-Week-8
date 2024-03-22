const mongoose = require("mongoose");


const eventSchema = new mongoose.Schema({
  event_name: {
    type: String, 
    required: true 
   }, 
  venue: {
    type: String,
    required: true,
  },
  organiser:{
    type:String,
    required:true,
  },
  from:{
    type:String,
    required:true,
  },
  to:{
    type:String,
    required:true,
  },

  committees_id: [
    {
      value: {
        type: mongoose.Schema.ObjectId,
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
    },
  ],
  event_desc: {
    type: String,
    required: true,
  },
  payment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  }, 
  
});

const Event = mongoose.model("events", eventSchema);
module.exports = Event;
