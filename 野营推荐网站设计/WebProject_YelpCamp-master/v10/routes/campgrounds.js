var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");



// HOME PAGE
// INDEX - show all campgrounds
router.get("/", function(req, res) {
	// Get all campground from database
	Campground.find({}, function(err, allCampgrounds){
		if(err) {
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds:allCampgrounds});
		}
	});
	
});


// CAMPGROUND CREAT PAGE
//  Add new campground to Database
router.post("/", middleware.isLoggedIn, function(req, res){ 
	// get data from form and add campground to array
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name: name, price: price, image: image, description: desc, author: author};
	// campgrounds.push(newCampground);
	// create a new campground to save Database
	Campground.create(newCampground, function(err, newlyCreate){
		if(err) {
			console.log("CREATE ERROR !");
		} else {
			// redirect to campground page
			console.log(newlyCreate);
			res.redirect("/campgrounds");
		}
	});
});


// NEW CAOMPGROUND PAGE
// SHOW FORM to create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("campgrounds/new");
});

// DETAIL PAGE:
//  SHOW - shows more information about one campground
router.get("/:id", function(req, res){
	// find the campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err) {
			console.log(err);
		} else {
			// render show template with that campground
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});	
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	
		Campground.findById(req.params.id, function(err, foundCampground){
			res.render("campgrounds/edit", {campground: foundCampground});
		});
});

// UPDATE CAMPGROUND ROUTE

router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	// find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updateCampground){
			res.redirect("/campgrounds/" + req.params.id);
	});
	// redirect somewhere(show page)
});

// DELETE CAMPRGOUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findByIdAndRemove(req.params.id, function(err){
		
			res.redirect("/campgrounds");
	});	
})


module.exports = router;