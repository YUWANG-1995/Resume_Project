var express = require("express");
var router = express.Router({mergeParams: true}); // 为了得到link里的id,所以将app里的前半部link后comment里的后半部link合并，这样能够轻易得到
var Campground = require("../models/campground");
var Comment    = require("../models/comment");
var middleware = require("../middleware");


// NEW COMMENT PAGE
router.get("/new", middleware.isLoggedIn, function(req, res){
	// find campground by id
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground: campground});
		}
	});
}); 

// NEW COMMENT CREATE PAGE
router.post("/", middleware.isLoggedIn, function(req, res){
	// look up campground using ID
	Campground.findById(req.params.id, function(err, campground){
		if(err) {
			console.log(err);
			redirect("/campgrounds");
		} else {
			// create new comment
			Comment.create(req.body.comment, function(err, comment){
				if(err) {
					console.log(err);
				} else {
					// add username and id to comment
					// 把user models里的id 和username 传递给 comment model，然后供comment使用。
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					// save comment
					comment.save();
					campground.comments.push(comment);
					campground.save();
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});
// comment route: EDIT COMMENT
router.get("/:comment_id/edit", middleware.checkCommentOwnership,  function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComments){
		if(err) {
			res.redirect("back");
		} else {
			res.render("comments/edit", {campground_id: req.params.id, comment: foundComments} );
		}
	});
});

// COMMENT UPDATE:
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updateComment){
		if(err) {
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// COMMENT DELETE ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err) {
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
}); 


module.exports = router;