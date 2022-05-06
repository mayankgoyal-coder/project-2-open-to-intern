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
      // validate:{
      // validator : function(value) {
      //   return   /(:?^((https|http|HTTP|HTTPS){1}:\/\/)(([w]{3})[\.]{1})?([a-zA-Z0-9]{1,}[\.])[\w]*((\/){1}([\w@?^=%&amp;~+#-_.]+))*)$/.test(value);
      // },
      // message: "please enter a valid logo",
      // }
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },{ timestamps: true }
);

module.exports = mongoose.model("college", collegeSchema);
