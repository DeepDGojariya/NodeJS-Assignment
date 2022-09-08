const express = require('express')
const router = express.Router()
const auth = require('../middleware/jwtauth')
const register = require('../controllers/register') 
const login = require('../controllers/login')
const getSelfData = require('../controllers/getSelfData')
const getAllUsersData = require('../controllers/getAllUsersData')
const updateInfo = require('../controllers/updateInfo')

const changePassword = require('../controllers/changePassword')


router.route('/register').post(register)
router.route('/login').post(login)
router.route('/get-self-data/:id').get(auth,getSelfData)
router.route('/get-all-users-data').get(auth,getAllUsersData)
router.route('/update-info/:id').patch(auth,updateInfo)
router.route('/change-password/:id').patch(auth,changePassword)


module.exports = router 