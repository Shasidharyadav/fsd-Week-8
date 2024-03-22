
const cors = require("cors");
const dateTime = require("node-datetime");
var MongoClient = require("mongodb").MongoClient;
ObjectId = require("mongodb").ObjectID;

// const uuid = require('uuid')

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");

require("../db/conn");
const User = require("../model/userSchema");


const Token = require("../model/token");
const verifyEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const tokenSchema = require("../model/token");

const { Router } = require("express");
const bodyparser = require("body-parser");
const Transaction = require("../model/transactionSchema")
const Committee = require("../model/committeeSchema");
const Event = require("../model/eventSchema")
const Menu = require("../model/menuSchema")

const Task = require("../model/taskSchema")

const uuid = require("uuid").v4;

const app = express();

router.use(bodyparser.urlencoded({ extended: false }));
router.use(bodyparser.json());
router.use(cors());

router.post("/", (req, res) => {
  res.send("hello world from server router js");
});


// register
router.post("/register", async (req, res) => {
  const { name, email, password, cpassword } = req.body;

  if (!name || !email || !password || !cpassword) {
    return res
      .status(422)
      .json({ error: "plz fill all the fields properly!! " });
  }

  try {
    let userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already exist!!" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "password doesn't match!!" });
    } else {
      const user = new User({ name, email, password, cpassword });
      await user.save();

      //send verification Email
      const token = await new Token({
        userId: user.id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();

      // console.log(token);
      const url = `${process.env.BASE_URL}${user.id}/verify/${token.token}`;
      // console.log(url);
      await verifyEmail(user.email, "Verify Email", url);
      res.status(201).json({ message: "Registered Successfully!!" });
    }
  } catch (err) {
    console.log(err);
  }
});


//verification email
router.get("/:id/verify/:token", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid token" });

    User.findByIdAndUpdate(
      req.params.id,
      { verified: true },
      (error, data) => {
        if (error) {
          console.log("error in updating");
        } else {
          "data updated", data;
        }
      }
    );
    await token.remove();
    res.status(200).send({ message: "Email verified successfully!! " });
  } catch (error) {
    console.log("errorrrrrrr");
  }
});
// verify email
// if (!userLogin.verified) {
//   let token = await Token.findOne({ userId: userLogin._id });
//   console.log("find the token", token);
//   if (!token) {
//     const token = await new Token({
//       userId: userLogin.id,
//       token: crypto.randomBytes(32).toString("hex"),
//     }).save();
//     const url = `${process.env.BASE_URL}${userLogin.id}/verify/${token.token}`;
//     await verifyEmail(userLogin.email, "Verify Email", url);
//   }
//   return res
//     .status(400)
//     .send({ message: "Verification Email sent to your account" });
// }
//login route

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
      return res.status(400).json({ error: "Plz Fill the data" });
    }

    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      const token = await userLogin.generateAuthToken();
      //cookie storage
      res.cookie("jwtoken", token, {
        maxAge: 30 * 24 * 3600000,
        httpOnly: true,
      });
      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credentials !!" });
      } else {
        res.status(200).json(userLogin);
      }
    }

    else {
      res.status(401).json({ error: "Invalid Credentials for token!!" });
    }
  } catch (err) {
    console.log(err);
  }
});
// date
const dt = dateTime.create();
const date = dt.format("Y-m-d H:M:S");

//about user currently login data

router.get("/about", authenticate, (req, res) => {
  res.send(req.rootUser);
});

// User Profile
router.get("/about/profile", authenticate, (req, res) => {
  // console.log(req.rootUser)
  // res.send(req.rootUser);
  const rootUser = req.rootUser;
  var user = [];
  user.push(rootUser);
  // console.log(user);
  const committee_id = user[0].committee_id;
  const user_id = user[0]._id
  Committee.find({ _id: committee_id })
    .then((committee) => {
      Transaction.find({ user_id: user_id })
        .then((transactions) => res.status(200).json({ committee, transactions, user }))
        .catch((err) => console.log(err))
    })
    .catch((err) => console.log(err))
});

// All registered users
router.get("/api/allmembers", (req, res) => {
  User.find({})
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

// Fetch Registered Member Details
router.post("/api/member/details", async (req, res) => {
  const { member_id } = req.body;
  if (!member_id) {
    return res.status(422).json({ error: "Error in Getting Member Details" });
  }
  User
    .find({ _id: member_id })
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

// count of all collections
router.get("/api/count", (req, res) => {
  Committee.countDocuments().then((com_count) => {
    User.countDocuments().then((usercount) => {
      Event.countDocuments().then((eventcount) => {
        Transaction.countDocuments().then((transcount) => {
          Menu.countDocuments().then((menucount) => {
            Task.countDocuments().then((taskcount) => {
              res.json([com_count, usercount,eventcount,transcount,menucount,taskcount])
            }
            )
          }
          )
        })
      }
      )
    })
    // res.json(count);
  });
});

// member detail with all member

module.exports = router;
