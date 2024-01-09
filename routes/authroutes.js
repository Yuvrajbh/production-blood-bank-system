// authRoutes.js
const express = require("express");
const { registerController, loginController, currentUserController } = require("../controllers/authcontroller");
const authmiddleware = require("../middlewares/authmiddleware");

const router = express.Router();

// Route for user registration

//REGISTER  POST
router.post('/register', registerController);


//LOGIN POST
router.post('/login',loginController);

//GET CURRENT USER
router.get('/current-user',authmiddleware, currentUserController);
module.exports = router;
