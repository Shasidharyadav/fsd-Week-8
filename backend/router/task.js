const express = require("express");
const router = express.Router();
const dateTime = require("node-datetime");
const Committee = require("../model/committeeSchema");
const User = require("../model/userSchema");
const Event = require("../model/eventSchema")
const Menu = require("../model/menuSchema")
const Task = require("../model/taskSchema")

router.post("/api/task/member/details", async (req, res) => {
    const { committeeid } = req.body;
    // console.log("Hii Task", committeeid)
    // if (!committeeid) {
    //     return res.status(422).json({ error: "Error in Getting Member Details" });
    // }
    User
        .find({})
        .then((items) => {
            // console.log(items)
            var members = [];
            // nietos.push({ "01": nieto.label, "02": nieto.value });
            for (const item of items) {
                if(item.committee_id == committeeid){

                    members.push({item})
                }
            }
            // console.log(members)
            res.status(200).json(members)
        })
        .catch((err) => console.log(err));
});
//
// All Committees
router.get("/api/task/allcommittees", (req, res) => {
    Committee.find({})
      .then((items) => res.json(items))
      .catch((err) => console.log(err));
  });

  //// add Task
router.post("/api/task/add-task", async (req, res) => {
    const {committeeid, memberid,task_desc,deadline} = req.body;
    if (!committeeid|| !memberid || !task_desc || !deadline) {
      return res
        .status(401)
        .json({ error: "plz fill all the fields properly!! " });
    }
  
    try {
      let ComExist = await Committee.findOne({ _id: committeeid });
      let userExist = await User.findOne({ _id: memberid });
      let committee_name = ComExist.committee_name;
      let user_name = userExist.name;
      let committee_id = committeeid;
      let user_id = memberid;
 
    //   if (userExist) {
    //     return res.status(422).json({ error: "Task already exist!!" });
    //   }
    //   else {
        const dt = dateTime.create();
        const createdAt = dt.format("Y-m-d H:M:S");
        const task = new Task({
            user_id, user_name,committee_id, committee_name, task_desc,deadline,createdAt
        });
        await task.save();
        res.status(201).json({ message: "Committee Savd Successfully!!" });
    //   }
    } catch (err) {
      console.log(err);
    }
  });
  

  //All Tasks
  router.get("/api/task/alltasks", (req, res) => {
    Task.find({})
      .then((items) => res.json(items))
      .catch((err) => console.log(err));
  });
module.exports = router;
