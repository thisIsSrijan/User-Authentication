const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { serialize } = require("mongodb");
const { serializeUser } = require("passport");

module.exports = function (passport){  //passport not included in this file but we will pass it from the App.js file
    passport.use(
        new LocalStrategy({usernameField: 'email'} , (email , password , done) =>{
            //Match user email
            User.findOne({email: email})
                .then((user) => {
                    if(!user){
                        return done(null , false , {message : 'This email is not registered'});
                    }

                    //match user password
                    bcrypt.compare(password , user.password , (err  , isMatch) =>{
                        if(err) throw err;

                        if(isMatch) {
                            return done(null , user);
                        } else{
                            return done(null , false , {message: 'Password is incorrect'});
                        }
                    });
                })
                .catch(err => console.log(err));
        })
    );

    passport.serializeUser((user , done) =>{  //which data to be stored in the cookie
        done(null , user.id);
    })

    passport.deserializeUser((id , done) =>{  //retrieving data from the previosly stored session
        User.findById(id)        //note that Model.findById(id) no longer accepts callback functions
            .then((user) => {
                done(null , user);
            })
            .catch( (err) =>{
                console.log(err);
            })
    })
}

//(id , user) =>{
//   done(err , user);