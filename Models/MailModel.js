const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const MailSchema = mongoose.Schema(
  {
    date: {
      type: String,
      required: false,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    subject: {
      type: String,
      required: false,
    },
    msgContent: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Mail", MailSchema);
