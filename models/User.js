const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNo: { type: String, required: true },
    password: { type: String, required: true },
    img_url: { type: String, required: true },
},
    { collection: 'UserData' }
)

const model = mongoose.model('UserSchema', UserSchema)

module.exports = model