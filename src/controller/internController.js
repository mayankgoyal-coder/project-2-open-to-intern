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

const createIntern = async function(req,res){
    try {
       const data = req.body

       if(Object.keys(data).length ==0){
           return res.status(400).send({status:false, msg: "Please Enter Your Information"})
       }

       if(!data.name){
        return res.status(400).send({status:false, msg: "Name is Required"}) 
    }
   
       if(!isValid(data.name)){
           return res.status(400).send({status:false, msg: "Please Enter Your Name Dude"}) 
       }
   
       if(!data.email){
           return res.status(400).send({status:false, msg: "email should be present"}) 
       }
       if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)){
        return res.status(400).send({status:false, msg: "Please enter a valid email"}) 
       }
       const duplicateEmail = await internModel.findOne({email:data.email})
       if(duplicateEmail){
        return res.status(400).send({status:false, msg: "email is already exist"})
       }

       if(!data.mobile){
           return res.status(400).send({status:false, msg: "Mobile Number should be present"}) 
       }
       if(!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(data.mobile)
       ){
        return res.status(400).send({status:false, msg:"Please enter a valid Mobile Number"})
       }
       const duplicateMobile = await internModel.findOne({mobile:data.mobile})
       if(duplicateMobile){
        return res.status(400).send({status:false, msg: "Mobile Number is already exist"})
       }

       if(!data.collegeName){
        return res.status(400).send({status:false, msg: "CollegeName should be present"}) 
    }
    const find = await collegeModel.findOne({name:data.collegeName, isDeleted:false}).select({_id:1})
    if(find.length<=0){
        return res.status(404).send({status:false, msg: "No College Exist with this Name"}) 
    } 
    
    const id= find._id;
    data.collegeId= id
    
       const intern = await internModel.create(data)
       return res.status(201).send({status:true, data: intern})
   
    } catch (error) {
       return res.status(500).send({status:false, msg: error.message}) 
    }   
   }

   module.exports.createIntern= createIntern