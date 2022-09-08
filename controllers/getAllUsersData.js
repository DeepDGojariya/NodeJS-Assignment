const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('../models/User')


const getAllUsersData = async(req,res)=>{
    const users = await User.find({})
    if(!users){
        return res.status(404).json({success:false,message:"No Users Data Found."})
    }else{
        let userArr = []
        users.map(user=>{
            userArr.push({
                name:user.name,
                email:user.email,
                phoneNo:user.phoneNo,
                img_url:user.img_url
            })
        })
        return res.status(200).json({success:true,usersData:userArr})
    }
}

module.exports = getAllUsersData