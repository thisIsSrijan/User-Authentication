const express = require("express");
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth'); //object destructuring

router.get('/' , (req , res) =>{ 
    res.render('welcome');
});
router.get('/dashboard' , ensureAuthenticated , (req , res) =>{    //passing the ensureAuthenticated function to ensure security
    res.render('dashboard'  , {
        name: req.user.name
    });
});

module.exports = router ; 