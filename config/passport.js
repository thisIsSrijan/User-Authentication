const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

module.exports = function (passport){  //passport not included in this file but we will pass it from the App.js file
    passport.use(
        new LocalStrategy({usernameField: 'email'} , (email , password , done) =>{
            User.findOne({email: email})
                .then((user) => {
                    if(!user){
                        return done(null , false , {message : 'This email is not registered'});
                    }
                })
                .catch(err => console.log(err));
        })
    );
}