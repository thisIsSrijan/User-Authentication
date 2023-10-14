const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require('passport');

// const ejs = require("ejs");
// const ejsLocals = require("ejs-locals");

const app = express();
const PORT = process.env.PORT || 5000 ;

//Passport congfig
require("./config/passport")(passport);

//DB Configuration
const db = require("./config/keys").MongoURI;

//Connect to Mongo
mongoose.connect(db , { useNewUrlParser: true})
    .then(() => { console.log("MongoDb connected...")})
    .catch(err => { console.log(err)})

//EJS
app.use(expressLayouts);
// app.engine('ejs', ejsLocals(ejs));
app.set('view engine' , 'ejs'); //make sure that this line is always below the app.use(expressLayouts)

//body-parser
app.use(express.urlencoded({extended: false}));  //dont need this now : app.use(bodyParser.urlencoded({extended: true})); as body parser is included in express

//express-session and flash-messages
//Copied this part from the npm docs of express-session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }))

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//flash-messages (global var)
app.use(flash());
app.use((req , res , next) =>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error  = req.flash('error');
    next();
})

//Routes
app.use('/' , require("./routes/index"));
app.use('/user' , require("./routes/user"));  //for user page


app.listen(PORT , ( ) =>{
    console.log("Server started on port "+`${PORT}`);
});
