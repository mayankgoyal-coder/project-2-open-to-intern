const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      require: "Please enter the College Name",
    },

    fullName: {
      type: String,
      trim: true,
      require: "Please Enter the Full Name",
    },
    logoLink: {
      type: String,
      trim: true,
      require: "Please Enter the Logo Link",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("college", collegeSchema);
