module.exports = {
    ensureAuthenticated : function (req ,res , next) {
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg' , 'Your session seems to be expired. Please re-login');
        res.redirect('/user/login');
    }
}

//isAuthenticated() is provided by passport