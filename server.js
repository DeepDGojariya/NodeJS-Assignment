//Imports
const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const auth = require('./middleware/jwtauth')

//mongoose connection
mongoose.connect('mongodb://localhost:27017/login-app-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

//dotenv config
dotenv.config()

//app
const app = express()
const port = 3000

//middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


//Routes
app.post('/api/v1/register', async(req, res) => {
    const {name,email,phoneNo,password,img_url} = req.body
    const hashedPass = await bcrypt.hash(password,1)
    const response = await User.create({
        name,
        email,
        phoneNo,
        password:hashedPass,
        img_url
    })

    return res.status(200).json(response)
})

app.post('/api/v1/login', async(req,res)=>{
    const{email,password} = req.body
    const user = await User.findOne({email}).lean()
    if(!user){
        return res.status(404).json({success:false,message:"Wrong email/Password"})
    }else{
        const isPasswordMatch = await bcrypt.compare(password,user.password)
        if(isPasswordMatch){
            const accessToken = jwt.sign({id:user._id}, process.env.JWT_SECRET);
            return res.status(200).json({success:true,message:"Logged In successfully",accessToken})    
        }
        return res.status(404).json({success:false,message:"Wrong email/Password"})
    }
})

app.get('/api/v1/get-self-data/:id',auth,async(req,res)=>{
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
})

app.get('/api/v1/get-all-users-data',auth,async(req,res)=>{
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
})

app.patch('/api/v1/update-info/:id',auth,async(req,res)=>{
    const user = User.findOne({_id:req.params.id})
    if(!user){
        return res.status(404).json({success:false,message:"User Does not exists."})   
    }else{
        const response = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        return res.status(201).json({success:true,newUserData:response})
    }
})

app.patch('/api/v1/change-password/:id',auth,async(req,res)=>{
    const {password} = req.body
    const user = await User.findOne({_id:req.params.id})
    if(!user){
        return res.status(404).json({success:false,message:"User Does not exists."})   
    }else{
        const hashedPass = await bcrypt.hash(password,1)
        const response = await User.findOneAndUpdate({ _id: req.params.id }, {$set:{password:hashedPass}}, { new: true, runValidators: true })
        return res.status(201).json({success:true,newUserData:response})
    }
})


//Starting the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})