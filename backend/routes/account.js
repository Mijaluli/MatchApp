// Account.JS file to maintain every users account details(SignUp,Login,Orders) and handle routes 

//Including the required packages and assigning it to Local Variables
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
//const Order = require('../models/order');
const config = require('../config');
const checkJWT = require('../middlewares/check-jwt');


//Function to facilitate Sign Up feature 
router.post('/signup', (req, res, next) => {
 let user = new User();
 user.name = req.body.name;
 user.email = req.body.email;
 user.password = req.body.password;
 //user.picture = user.gravatar();
 user.isManager = req.body.isManager;

 User.findOne({ email: req.body.email }, (err, existingUser) => {
  if (existingUser) {
    res.json({
      success: false,
      message: 'Account with that email is already exist'
    });

  } else {
    user.save();

    var token = jwt.sign({
      user: user
    }, config.secret, {
      expiresIn: '7d'
    });

    res.json({
      success: true,
      message: 'Enjoy your token',
      token: token
    });
  }

 });
});

//Function to facilitate login feature
router.post('/login', (req, res, next) => {

  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) throw err;

    if (!user) {
      res.json({
        success: false,
        message: 'Authenticated failed, User not found'
      });
    } else if (user) {

      var validPassword = user.comparePassword(req.body.password);
      if (!validPassword) {
        res.json({
          success: false,
          message: 'Authentication failed. Wrong password'
        });
      } else {
        var token = jwt.sign({
          user: user
        }, config.secret, {
          expiresIn: '7d'
        });

        res.json({
          success: true,
          mesage: "Enjoy your token",
          token: token
        });
      }
    }

  });
});


//Function to handle Profile API (GET,POST) functionality for authenticated users 
router.route('/profile')
  .get(checkJWT, (req, res, next) => {
    User.findOne({ _id: req.decoded.user._id }, (err, user) => {
      res.json({
        success: true,
        user: user,
        message: "Successful"
      });
    });
  })
  .post(checkJWT, (req, res, next) => {
    User.findOne({ _id: req.decoded.user._id }, (err, user) => {
      if (err) return next(err);

      if (req.body.name) user.name = req.body.name;
      if (req.body.email) user.email = req.body.email;
      if (req.body.password) user.password = req.body.password;

     user.isManager = req.body.isManager;

      user.save();
      res.json({
        success: true,
        message: 'Successfully edited your profile'
      });
    });
  });

 

  
//Exporting the module 
module.exports = router;
