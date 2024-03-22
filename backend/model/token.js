const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "userSchema",
		unique: true,
	},
	token: { type: String, required: true },
	createdAt: { type: Date, default: Date.now,  maxAge: 30 * 24 * 3600000 },
});

module.exports = mongoose.model("token", tokenSchema);