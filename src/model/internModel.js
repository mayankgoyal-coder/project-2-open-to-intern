const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const internSchema = new mongoose.Schema(
  {
     name: {
      type: String,
      trim:true,
      require: "Please Enter Your name Dude"
        },

      email:  {
        type: String,
        require: 'email should be present',
        unique: true,
        trim:true,
        lowercase:true,
      //   validate: {
      //     validator: function(email) {
      //         return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
      //     },
      //     message: "Please enter a valid email", isAsync: false
      // }
      },
      
       mobile: {
        type: Number, 
        required: 'Mobile Number should be present',
        unique: true,
        trim:true,
        // validate: {
        //   validator: function(mobile) {
        //       return /^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile);
        //   },
        //   message: "Please enter a valid Mobile Number", isAsync: false 
        // }
      },
       collegeId: {
           type:ObjectId,
            ref: 'college' 
        },
        isDeleted: {
            type:Boolean, 
            default: false
          }

},{ timestamps: true }
);

module.exports = mongoose.model("intern", internSchema);