const express = require('express');
const router = express.Router();


// import controllers
var Home = require('../controllers/home');
var Auth = require('../controllers/auth');


// welcome page
router.get('/', Home.first);

router.get('/login', function(req, res, next){
	res.render('signin');
});

router.get('/register', function(req, res, next){
	res.render('signup');
});

router.get('/forgotpassword', function(req, res, next){
	res.render('forgot');
});

router.get('/dashboard', function(req, res, next){
	res.render('dashboard/index');
});

router.get('/dashboard/settings', function(req, res, next){
	res.render('dashboard/settings');
});

router.get('/dashboard/students', function(req, res, next){
	res.render('dashboard/students');
});

router.get('/about', function(req,res,next){
	res.render('about');
})

// API routes

// Authentication routes
router.post('/api/register', Auth.register); // School administrator registration

router.post('/api/login', Auth.login); // School administrator login

router.get('/api/logout', Auth.logout);

// Passport authentication test confirmation
router.get('/api/profile', isAuthenticated, (req, res) => {
	res.status(200).send(req.user);
});

module.exports = router;

//Authentication middleware
function isAuthenticated(req, res, next) {
	if(req.isAuthenticated())
	   return next();
	else
	   return res.status(401).send({
		 error: 'User not authenticated'
	   })
}

// Updated Router here
/* GET home page. */
//router.get("/", Home.index);
router.get("/", function(req, res, next) {
 Home.find(function(err, fees) {
    res.render("index", { title: "School_fees_tracker"});
  });
});


