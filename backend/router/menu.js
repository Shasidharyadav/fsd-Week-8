const express = require("express");
const router = express.Router();
const dateTime = require("node-datetime");
const Committee = require("../model/committeeSchema");
const User = require("../model/userSchema");
const Event = require("../model/eventSchema")
const Menu = require("../model/menuSchema")

router.post("/api/menu-data", async (req, res) => {
  console.log("Hello Add Menu")

  console.log(req.body)
  const { event_id, menu_desc } = req.body;
  if (!event_id || !menu_desc) {
    return res
      .status(401)
      .json({ error: "plz fill all the fields properly!! " });
  }

  try {
    let eventExist = await Menu.findOne({ event_id: event_id });

    if (eventExist) {
      return res.status(422).json({ error: "Event already exist!!" });
    }
    else {


      const dt = dateTime.create();
      const createdAt = dt.format("Y-m-d H:M:S");
      const menu = new Menu({
        event_id, menu_desc, createdAt
      });
      await menu.save();
      res.status(201).json({ message: "Event Saved Successfully!!" });
    }
  } catch (err) {
    console.log(err);
  }
});


// all events with menu
router.get("/api/menu", async (req, res) => {
  console.log("Hello All Menu")
  Menu
    .find({})
    .then((menus) => {
      Event.find({})
        .then((events) => res.status(200).json({ menus, events }))
    })
    .catch((err) => console.log(err));
})


module.exports = router;
