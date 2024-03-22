const dotenv = require("dotenv");
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const uuid = require('uuid')
require("nodemailer");
const cors = require("cors");
app.use(cors());
var multer = require('multer');

const cookieParser = require("cookie-parser");
dotenv.config({path:'./config.env'});

require('./db/conn');

app.use(express.json());
app.use(cookieParser());
//router files
//User API router
app.use(require('./router/auth'));

// Committee APIs router
app.use(require("./router/committee"))
// Event APIs router
// app.use(require('./router/Event'));
// var event = multer({ dest: './router/Event' });
// app.use(event)
app.use(require("./router/event"));
app.use(require("./router/payment"));
app.use(require("./router/menu"));

app.use(require("./router/task"));



//connection
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`server started at ${PORT} port`);
  });

