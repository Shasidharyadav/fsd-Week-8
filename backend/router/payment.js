const cors = require("cors");
const dateTime = require("node-datetime");
var MongoClient = require("mongodb").MongoClient;
ObjectId = require("mongodb").ObjectID;
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

const uuid = require("uuid").v4;
const stripe = require("stripe")(

    "sk_test_51LKbQ9KAjzxspP2ZE33RmdtsLrCEdJ44F9H393TLI1ttnrdI2Y2ctNS2JUwa9jXb5jmg1c3oPeCestl8Y2ChXjPa00aKWE4VHU"
);
const app = express();

router.use(bodyparser.urlencoded({ extended: false }));
router.use(bodyparser.json());
router.use(cors());



//payment checkout
// router.post("/checkout", async (req, res) => {
//     console.log("Request:", req.body);

//     let error;
//     let status;
//     const { token, event_id, user_id, event_name} = req.body;
//     console.log("tokensssss:", token.id);
//     console.log("userid:", product.userid);
//     try {
//     //   const planExist = await Purchase.find({ user_id: product.userid });
//       // const userExist = await User.find({ username: req.body.username });
//     //   console.log("user found:", planExist);
//       if (planExist.length > 0) {
//         console.log("plan is there");
//         status = "Plan Purchase already exist";
//         return res.status(400).send({ message: "plan already exists" });
//       } else {
//         console.log("no plan");
//         const customer = await stripe.customers.create({
//           email: token.email,
//           source: token.id,
//         });
//         console.log("customer:", customer);
//         const products = await stripe.products.create({
//           name: product.plan_name,
//         });
//         const price = await stripe.prices.create({
//           unit_amount: product.price * 100,
//           currency: "INR",
//           recurring: { interval: "month" },
//           product: products.id,
//         });

//         const idempotencyKey = uuid();
//         console.log("idempotency keyyy", idempotencyKey);
//         const subscription = await stripe.subscriptions.create({
//           customer: customer.id,
//           items: [{ price: price.id }],
//         });
//         console.log(subscription.id);
//         const user_id = product.userid;
//         const plan_id = product.planid;
//         const plan_price = product.price;
//         const plan_name = product.plan_name;
//         const email_limit = product.email_limit;
//         const sub_id = subscription.id;
//         const amount = product.price;
//         const dt = dateTime.create();
//         const date = dt.format("Y-m-d H:M:S");
//         console.log(product);

//         const list_limit = product.lists;
//         // const date =
//         // transaction_id,

//         const trans = new Transaction({
//           user_id,
//           plan_id,
//           sub_id,
//           amount,
//           date,
//         });
//         trans.save();
//         const transaction_id = trans._id;
//         const purchase = new Purchase({
//           user_id,
//           plan_id,
//           plan_name,
//           plan_price,
//           email_limit,
//           list_limit,
//           sub_id,
//           transaction_id,
//           date,
//         });
//         purchase.save();
//         // console.log("Subscription:", { subscription });
//         status = "Payment Successful!!";
//         res.status(200).json({ message: "Plan Saved Successfully!!!" });
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       status = "failure in payment";
//     }

//     // res.json({ error, status });
//   });

//   router.post('/create-checkout-session', async (req, res) => {
//     console.log(req.body)

//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           price_data: {
//             currency: 'usd',
//             product_data: {
//               name: 'T-shirt',
//             },
//             unit_amount: 2000,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: 'http://localhost:4242/success',
//       cancel_url: 'http://localhost:4242/cancel',
//     });

//     res.redirect(303, session.url);
//   });
router.post('/create-checkout-session', function (req, res) {
    // console.log(req.body);

    stripe.customers.create({
        email: req.body.token.email,
        source: req.body.token.id,
    })
        .then((customer) => {

            return stripe.charges.create({
                amount: req.body.Amount * 100,     
                description: req.body.event_name,
                currency: 'INR',
                customer: customer.id
            });
        })
        .then((charge) => {
            // console.log(charge.customer)
            let customer_id = charge.customer;
            const amount = req.body.Amount;
            let { user_id, event_id, event_name, user_name } = req.body;
            const dt = dateTime.create();
            const date = dt.format("Y-m-d H:M:S");
            const charge_id = charge.id;
            const receipt = charge.receipt_url;
            const transaction = new Transaction({
                customer_id, charge_id, user_id, user_name, event_id, event_name, amount, date, receipt
            });
            transaction.save();
            res.status(201).json({ receipt });
        })
        .catch((err) => {
            res.send(err)       // If some error occurs
        });
})

// Retrieve payment Details

router.get("/api/all-payments", (req, res) => {
    Transaction
        .find({})
        .then((transactions) => {
            Event
                .find({})
                .then((events) => {
                    User.find({})
                        .then((users) => res.status(200).json({ transactions, events, users }))
                        .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
})

// Particular Transaction Details
router.post("/api/transaction/details", async (req, res) => {
    const { transaction_id } = req.body;
    if (!transaction_id) {
        return res.status(422).json({ error: "Error in Getting transaction Details" });
    }
    Transaction
        .find({ _id: transaction_id })
        .then((transaction) => {
            // console.log(transaction.event_id)
            // console.log(transaction.user_id)
            // console.log(transaction)
            const user_id = transaction.user_id;
            const event_id = transaction.event_id;
            console.log(user_id, event_id,transaction._id)
            Event
                .find({ _id: event_id })
                .then((event) => {
                    User
                        .find({ _id: user_id })
                        .then((user) => res.status(200).json({ transaction, event, user }))
                        .catch((err) => console.log(err))
                }
                )
                .catch((err) => console.log(err))
        }
        )
        .catch((err) => console.log(err));
});
// var nietos = [];
// nietos.push({ "01": nieto.label, "02": nieto.value });
// for (const item of items) {
// stripe.charges.retrieve(
//     item.charge_id,
//     function (err, charge) {
//         // asynchronously called
//         const customerId = charge.customer;
//     }
// );
// }
module.exports = router;
