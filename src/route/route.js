const express = require('express');
const router = express.Router();

const collegeController= require("../controller/collegeController")
const internController= require("../controller/internController")


router.post("/functionup/interns",internController.createIntern)
router.post("/functionup/colleges", collegeController.createCollege)
router.get("/functionup/collegeDetails",collegeController.collegeDetails)


module.exports = router;