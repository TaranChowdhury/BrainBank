const mongoose = require("mongoose");

const Project = new mongoose.Schema({
  title: { type: String, required: true },
  file: {
    path: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
  },
  users: [
    {
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserMatch",
        required: true,
      },
    },
  ],
  createdAt: { type: Date, required: true },
});

module.exports = mongoose.model("Project", Project);
