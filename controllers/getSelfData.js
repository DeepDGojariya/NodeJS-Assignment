const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('../models/User')

const getSelfData = async(req,res)=>{
    const user = await User.findOne({_id:req.params.id})
    if(!user){
        return res.status(404).json({success:false,message:"User Does not exists."})
    }else{
        const obj = {
            name:user.name,
            email:user.email,
            phoneNo:user.phoneNo,
            img_url:user.img_url
        }
        return res.status(200).json({success:true,userData:obj})    
    }
}


module.exports = getSelfData