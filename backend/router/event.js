const express = require("express");
const router = express.Router();
const dateTime = require("node-datetime");
const Committee = require("../model/committeeSchema");
const User = require("../model/userSchema");
const Event = require("../model/eventSchema")


router.post("/api/event-data", async (req, res) => {
  console.log(req.body)
  const { event_name, from, to, venue, committees_ids, organiser, event_desc,payment } = req.body;
  // console.log(committees_id);
  if (!event_name || !from || !to || !venue || !committees_ids || !organiser || !event_desc ||!payment) {
    return res
      .status(401)
      .json({ error: "plz fill all the fields properly!! " });
  }

  try {
    let eventExist = await Event.findOne({ event_name: event_name });

    if (eventExist) {
      return res.status(422).json({ error: "Event already exist!!" });
    }
    else {
      const dt = dateTime.create();
      const createdAt = dt.format("Y-m-d H:M:S");

      const committees_id = committees_ids;
      const event = new Event({
        event_name, from, to, venue, committees_id, organiser, payment,event_desc, createdAt
      });
      await event.save();
      res.status(201).json({ message: "Event Saved Successfully!!" });
    }
  } catch (err) {
    console.log(err);
  }
});

// All Events Data
router.get("/api/allevents", (req, res) => {
 Committee
    .find({})
    .then((committees) => {
      Event.find({})
        .then((events) => res.status(200).json({ committees, events}))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

// all events
router.get("/api/events", (req, res) => {
  Event.find({})
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});
module.exports = router;
