var compression = require('compression')
var express = require('express')
var path = require('path')
var app = express()
var bodyParser = require('body-parser')
app.use(compression())
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/db')
// Initialize models
require("./models/orders.js")
const ordersModel = mongoose.model('orders')
require("./models/events.js")
const eventsModel = mongoose.model('events')



// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')))



// Events APIs
// GET /events
// display all events


app.get ("/events", (req, res) => {
	mongoose.model('events').find({}, (err, recs) => {
    	res.json(recs)  
	})
})


// Stripe POST
app.post ("/pay", (request, res) =>{
	// create a new order entry in db =>
	// order saved in db with new orderID
	// fetch new orderID
	// send this orderID to stripe together with the amount and token


	console.log("--request--", request)
// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
var stripe = require("stripe")("sk_test_mA0QCmRuBeXyE0S25rY56s71");

// Token is created using Stripe.js or Checkout!
// Get the payment token submitted by the form:
var token = request.body.token; // Using Express

// Charge the user's card:
var charge = stripe.charges.create({
  amount: Number(request.body.amount),
  currency: "eur",
  description: "Order number: " + request.body.orderID,
  source: token,
}, function(err, charge) {
  // asynchronously called

});

})



// POST /events/
// display all events
app.post ("/events/addevent", (req, res) => {
	eventsModel.create(req.body, (err, recs) => {
		console.log("---ADD EVENT RECS---", recs)
	    	console.log(err)
	    	res.json(recs)
	})
		
})


app.post ("/events/updateevent", (req, res) => {
	const event = req.body.event
    eventsModel.findOneAndUpdate({_id : event._id}, {$set: event }, {new: true} ,(err, recs) => {
    	console.log("Updated event",recs)
    	res.json(recs)
    })	
})

// remove event
app.post ("/events/deleteevent", (req, res) => {
	const event = req.body.event
    eventsModel.remove({_id : event._id}, (err, recs) => {
    	console.log("Deleted event", recs)
    	res.json(recs)
    })	
})

app.post ("/events/customer", (req, res) => {
	const customer = req.body.customer
	console.log("--- CUSTOMER req---", req.body)
	console.log("--- CUSTOMER req.body.customer---", req.body.customer)
	
    ordersModel.create(customer,(err,rec) => {
		console.log("---ADD CUSTOMER RECS---", rec)
	    	console.log(err)
	    	res.json(rec)
	})
		
	
})


// Import pwd form form mailer
var pwd = require('./modules/p').pwd
const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'vivobcn@gmail.com',
        pass: pwd,
    },
});

//handle contact form sending
app.post("/sendEmail", (req, res) => {
	const mailOptions = {
	    from: 'vivobcn@gmail.com',
	    // to: req.body.email,
	    to: 'vivobcn@gmail.com',
	    replyTo: req.body.email,
	    subject: "New message from " + req.body.name,
	    html: req.body.message,
	};
	transport.sendMail(mailOptions, (error, info) => {
	    if (error) {
	        console.log(error);
	        return res.redirect('/contacts')
	    }
	    console.log(`Message sent: ${info.response}`);
	    res.redirect('/contacts')
	});
})

// send all requests to index.html so browserHistory in React Router works
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

var PORT = process.env.PORT || 8080
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
