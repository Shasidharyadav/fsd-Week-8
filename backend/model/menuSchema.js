const mongoose = require("mongoose");


const menuSchema = new mongoose.Schema({

  event_id: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  menu_desc: {
    type: String,
    required: true
  },
  createdAt: {
    type: String,
    required: true,
  },

});

const Menu = mongoose.model("menus", menuSchema);
module.exports = Menu;
