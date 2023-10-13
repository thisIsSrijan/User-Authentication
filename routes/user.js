const express = require("express");
const bcrypt = require('bcryptjs');  //for hashing and salting passwords
const mongoose = require("mongoose");
const router = express.Router();

//requiring the User model
const User = require("../models/User");

//for localhost:5000/user/login page
router.get("/login", (req, res) => {
  res.render("login");
});

//for localhost:5000/user/register page
router.get("/register", (req, res) => {
  res.render("register");
});

//Register-handling for post
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  //Check required fields
  if (!name || !email || !password || !password2) {
    errors.push({
      msg: " Please fill in all fields",
    });
  }

  //Check password match
  if (password !== password2) {
    errors.push({
      msg: " Passwords do not match",
    });
  }

  //Check password length
  if (password.length < 4) {
    errors.push({
      msg: "Password length must be atleast 4 characters long",
    });
  }

  //reRender in case of error
  if (errors.length > 0) {   //es-6 THEREFORE DIRECT PASS AND NO NEED OF errors: errors , name: name, ...
    res.render("register", {
      errors, //We want to loop through the error messages to display on reRender
      name, //We want the form to hold the input fields and not clear it on reRendering for error
      email,
      password,
      password2,
    });
  } else {
    //Validating the uniqueness of the email through our database
    User.findOne({ email: email })
     .then((user) => {
      //user exists
      if (user) {
        errors.push({ msg: "email is already regsitered" });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
            name,
            email,
            password
        });

        //hashing newUser's password
        bcrypt.genSalt(10 , (err ,salt) => 
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if(err) throw err;

            newUser.password = hash; //set password to hashed pass
            
            //saving our user in the database
            newUser.save()
                .then(user => {
                    console.log("user successfully registered");   
                    req.flash('success_msg' , "You are now successfully registered"); 
                    res.redirect("/user/login");
                })
                .catch(err => console.log("err"));
        }))

        console.log(newUser);
        // res.send("HEllo! "+ newUser.name);
      }
    });
  }
});

module.exports = router;
