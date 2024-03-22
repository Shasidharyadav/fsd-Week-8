const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.ObjectId, 
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  event_id: {
    type: mongoose.Schema.ObjectId, 
    required: true,
  },
  event_name: {
    type: String,
    required: true,
  },
  customer_id: {
    type: String,
    required: true,
  },
  charge_id: {
    type: String,
    required: true,
  },
  receipt: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
 
 
  
 

});

const Transaciton = mongoose.model("transactions", transactionSchema);

module.exports = Transaciton;
