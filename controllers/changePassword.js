const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = require('../models/User')






const changePassword = async(req,res)=>{
    const {password} = req.body
    const user = await User.findOne({_id:req.params.id})
    if(!user){
        return res.status(404).json({success:false,message:"User Does not exists."})   
    }else{
        const hashedPass = await bcrypt.hash(password,1)
        const response = await User.findOneAndUpdate({ _id: req.params.id }, {$set:{password:hashedPass}}, { new: true, runValidators: true })
        return res.status(201).json({success:true,newUserData:response})
    }
}

module.exports = changePassword