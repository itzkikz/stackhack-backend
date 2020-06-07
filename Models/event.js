const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    mobile: {
      type: Number,
    },
    email: {
      type: String,
    },
    id_image: {
      type: String,
    },
    reg_type: {},
    tickets: {
      type: Number,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("Event", eventSchema);
