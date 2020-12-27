// use npm to install different libraries
var express   	  = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require('mongoose'),
    flash         = require("connect-flash"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment"),
    User          = require("./models/user"),
    seedDB        = require("./seeds")

// =====================
// get different routes
// =====================
var commentsRoutes    = require("./routes/comments"),
	campgroundRoutes  = require("./routes/campgrounds"),
	indexRoutes        = require("./routes/index")



// =======================================
// set mongoDB and passport configuration 
// =======================================

// set MongoDB enviroment and connect to target database via mongodb server
mongoose.connect('mongodb://localhost:27017/yelp_camp_v10', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));

// other environment sets.
app.use(bodyParser.urlencoded({extend: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

// Passport Configuration
app.use(require("express-session")({  // express-session用于记录客户状态的机制，与cookie不同，session保存于服务器上。
	secret:"Yu Wang",  //一个string 字符，服务器端的签名，任意值都行。
	resave:false,     //resave 是否强制保存如果没有任何更改
	saveUninitialized:false  //是否强制将未初始化的session储存下来。
}));


// 初始化passport的中间件
app.use(passport.initialize()); //初始化passport。
app.use(passport.session());  // 如果你的登陆状态是需要持续的话，也需要初始化session

//Use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// 下面两行，允许应用程序选择适当的数据库/对象映射器，而不需要身份验证层的验证。
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// ================
// middleware
// ================

// middleware to hide login & sign up buttons or log out button.
// and it will run in every single route to check current status and tell the computer and to diplay the right buttons.
// 每次只要调用currentUser的时候就会执行这个function。
app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");

	next();
});

// ==============
// use routes
// ==============
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentsRoutes);



app.listen("3000", function() {
	console.log("YelpCamp Server has started !");
});