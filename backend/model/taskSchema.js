const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({

  user_id: {
    type: mongoose.Schema.ObjectId,
    required: true,
  }, 
  user_name: {
    type: String,
    required: true
  },
  committee_id: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  committee_name: {
    type: String,
    required: true
  },
  task_desc: {
    type: String,
    required: true
  },
  deadline: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true,
  },

});

const Task = mongoose.model("tasks", taskSchema);
module.exports = Task;
