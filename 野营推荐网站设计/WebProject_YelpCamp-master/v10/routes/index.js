var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");



// HOME PAGE
router.get("/", function(req, res) {
	res.render("landing");
});


// SIGN UP PAGE 
// show register form
router.get("/register", function(req, res){
	res.render("register");
});
//handle sign up logic
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err,user){
		if(err) {
			req.flash("error", err.message);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/campgrounds");
		});
	});		
});


// LOG IN PAGE
// show log in form
router.get("/login", function(req, res){
	res.render("login", {message: req.flash("error")});
})
// handle log in logic
// app.post("/login", middleware, callback)
router.post("/login", passport.authenticate("local",
	 {
		successRedirect: "/campgrounds",
		failureRedirect: "/login"
	}), function(req,res){
	
});


// LOG OUT PAGE
// logic route 
router.get("/logout", function(req, res){
	req.logout();
	req.flash("error", "Already Log out !");
	res.redirect("/campgrounds");
});


module.exports = router;
