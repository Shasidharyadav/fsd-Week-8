const express = require("express");
const router = express.Router();
const dateTime = require("node-datetime");
const Committee = require("../model/committeeSchema");
const User = require("../model/userSchema");


// add Committee
router.post("/api/committee-data", async (req, res) => {
  const { name, seats, tasks } = req.body;
  if (!name || !seats || !tasks) {
    return res
      .status(401)
      .json({ error: "plz fill all the fields properly!! " });
  }

  try {
    let userExist = await Committee.findOne({ committee_name: name });

    if (userExist) {
      return res.status(422).json({ error: "Committee already exist!!" });
    }
    else {

      const dt = dateTime.create();
      const createdAt = dt.format("Y-m-d H:M:S");
      const committee_name = name;
      const committee = new Committee({
        committee_name, seats, tasks, createdAt
      });
      await committee.save();
      res.status(201).json({ message: "Committee Savd Successfully!!" });
    }
  } catch (err) {
    console.log(err);
  }
});

// All Committees
router.get("/api/allcommittees", (req, res) => {
  Committee.find({})
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});


// Fetch Registered Committee Details
router.post("/api/committee/details", async (req, res) => {
  const { committee_id } = req.body;
  if (!committee_id) {
    return res.status(422).json({ error: "Error in Getting Member Details" });
  }

  Committee
    .find({ _id: committee_id })
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

// API for sending particular member committee
router.post("/api/member/committee", async (req, res) => {
  const { committee_id } = req.body;
  if (!committee_id) {
    return res.status(422).json({ error: "Error in Getting Member Details" });
  }

  Committee
    .find({ _id: committee_id })
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

router.post("/api/member-committee", async (req, res) => {
  const { member_id, committee_id } = req.body;
  console.log(req.body)

  if (!member_id && !committee_id) {
    return res.status(422).json({ error: "Error in Getting Member Details" });
  }


  Committee
    .find({})
    .then((committees) => {
      Committee.find({ _id: committee_id })
        .then((committee) => {
          User.find({ _id: member_id })
            .then((member) => res.status(200).json({ committees, member, committee }))
            .catch((err) => console.log(err))

        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});
module.exports = router;
