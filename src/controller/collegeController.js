const collegeModel = require("../model/collegeModel")
const internModel = require("../model/internModel")

const isValid =function(value){
    if(typeof (value)=== undefined || typeof (value)=== null){
        return false;
    }
    if(value.trim().length=== 0){
        return false;
    }
    if(typeof (value)=== "string" && (value).length > 0){
        return true;
    }
}

const createCollege = async function(req,res){
 try {
    const data = req.body
    if(Object.keys(data).length ==0){
        return res.status(400).send({status:false, msg: "Please Enter the college Information"})
    }
    if(!data.name){
        return res.status(400).send({status:false, msg: "Name is Required"}) 
    }
    const duplicateName = await collegeModel.findOne({name:data.name})
    if(duplicateName){
     return res.status(400).send({status:false, msg: "This College Name is already exist"})
    }
    if(!isValid(data.name)){
        return res.status(400).send({status:false, msg: "Please enter the Valid Name"}) 
    }
   
    if(!data.fullName){
        return res.status(400).send({status:false, msg: "Full Name is Required"}) 
    }
    if(!isValid(data.fullName)){
        return res.status(400).send({status:false, msg: "Please enter the Full Name"}) 
    }
    if(!data.logoLink){
        return res.status(400).send({status:false, msg: "Logo Link is Required"}) 
    }
    if(!/(:?^((https|http|HTTP|HTTPS){1}:\/\/)(([w]{3})[\.]{1})?([a-zA-Z0-9]{1,}[\.])[\w]*((\/){1}([\w@?^=%&amp;~+#-_.]+))*)$/.test(data.logoLink)){
        return res.status(400).send({status:false, msg: "please enter a valid logo"}) 
    }
    if(!isValid(data.logoLink)){
        return res.status(400).send({status:false, msg: "Please enter the Logo Link"}) 
    }
    const college = await collegeModel.create(data)
    return res.status(201).send({status:true, data: college})

 } catch (error) {
    return res.status(500).send({status:false, msg: error.message}) 
 }   
}


const collegeDetails = async function(req,res){
    try {
       const collegeName = req.query.name
       if(!collegeName){
           return res.status(400).send({status:false, msg: "Please Enter the College Name"})
       }
   const find =await collegeModel.findOne({name:collegeName})
   if(!find){
    return res.status(404).send({status:false, msg: "No College Found"}) 
   }
   const collegeId = find._id
   const interns= await internModel.find({collegeId:collegeId}).select({name:1,email:1,mobile:1})
   if(interns.length ==0){
    return res.status(404).send({status:false, msg: "No Intern applied for internship at this college"})  
   }
   const collegeData ={
       name: find.name,
       fullName: find.fullName,
       logoLink: find.logoLink,
       interest: interns 
   }
    return res.status(200).send({status:true, data: collegeData})
   
    } catch (error) {
       return res.status(500).send({status:false, msg: error.message}) 
    }   
   }

   module.exports.createCollege= createCollege
   module.exports.collegeDetails= collegeDetails