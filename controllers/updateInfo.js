const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = require('../models/User')

const updateInfo = async(req,res)=>{
    const user = User.findOne({_id:req.params.id})
    if(!user){
        return res.status(404).json({success:false,message:"User Does not exists."})   
    }else{
        const response = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        return res.status(201).json({success:true,newUserData:response})
    }
}

module.exports = updateInfo