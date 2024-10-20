const express = require("express")
const { 
  registerController, 
  loginController, 
  google, 
  getUserProfile } = require("../Controllers/userControllers");
const isAuth = require("../middleware/isAuth");
const router = express.Router()

router.get('/me', isAuth, getUserProfile)
router.post('/register', registerController)
router.post('/login', loginController)
router.post('/google', google)

router.get('/logout', (req, res) => {
  console.log('logout');
  res.status(200).json({ message: 'Logged out successfully' });
});


module.exports = router