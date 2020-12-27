var mongoose   = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");


var data =[
	{
		name: "九寨沟",
		image:"https://p1-q.mafengwo.net/s7/M00/D2/DC/wKgB6lSiDL2AYHqQAAn1eisORm8596.png?imageMogr2%2Fthumbnail%2F%211020x540r%2Fgravity%2FCenter%2Fcrop%2F%211020x540%2Fquality%2F100",
		description:"美丽的地方啊！"
	},
	{
		name:"峨眉山",
		image:"https://p1.ssl.qhimg.com/dmsmty/1080_721_/t01b8f8904e1c09394b.jpg",
		description:"啊，又是一个多么美丽的地方呀！"

	},
	{
		name:"青城山",
		image:"https://p1.ssl.qhimg.com/dm/1000_416_/t017223a416c29a6a54.jpg?size=1140x416",
		description:"啊，这个地方是真的无聊，除了爬山还是爬山，累死个先人！"
	}
]

function seedDB(){
	// Remove all campgrounds
	Campground.remove({}, function(err){
		// if(err) {
		// 	console.log(err);
		// } else {
		// 	console.log("remove campground");
		// 	// Add a few campgrounds
		// 	data.forEach(function(seed){
		// 		Campground.create(seed, function(err, campground){
		// 			if(err) {
		// 				console.log(err);
		// 			} else {
		// 				console.log("Add a campground");
		// 				Comment.create(
		// 					{
		// 						text:"This is a comment about this place !",
		// 						author: "Yu"
		// 					}, function(err, comment){
		// 						if(err){
		// 							console.log(err);
		// 						} else {
		// 							campground.comments.push(comment);
		// 							campground.save();
		// 							console.log("Create a new comment")
		// 						}
		// 					});
		// 			}
		// 		});
		// 	});
		// }	
	});

	// Add a few comments
}

module.exports = seedDB;
