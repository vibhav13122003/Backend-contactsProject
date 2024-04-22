const express=require('express');
const router=express.Router();
const { registerUser, loginUser, currentUser } = require('../controllers/userControllers');
const validateToken = require("../middleware/validateToken");

router.post('/register',registerUser)
router.post('/current',validateToken, currentUser)
router.post('/login', loginUser)

module.exports=router