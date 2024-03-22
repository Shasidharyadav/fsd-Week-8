const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
                  
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    enum:[true,false],
    default: false
  },
  role_id:{
    type:Number,
    required:true,
    default:0
  },
  committee_id: {
    type: mongoose.Schema.ObjectId, 
    required: false,
  },

  roles: {
    type: String,
    required: false,
  },
  phone: {
    type: Number,
    required: false,
  },
  DOB: {
    type: Number,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  postal_code: {
    type: Number,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  createdAt: { 
    type: Date, 
    default: Date.now},

  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// hashing the password

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

//generating token

userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
     this.tokens = this.tokens.concat({token:token});
     await this.save();
     return token;

  } catch (err) {
    console.log(err);
  }
};

const User = mongoose.model("USER", userSchema);

module.exports = User;
