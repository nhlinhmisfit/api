var express = require('express');
var mongojs = require('mongojs');
var bodyParser = require('body-parser');

var app = express();
var db = mongojs('contactlist', ['contactlist']);

//config folder
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/app"))	;
app.use(bodyParser.json());
//list contact
app.get('/contactlist', function (req, res) {
	console.log("I have received on request");
	db.contactlist.find(function (err, docs) {
		console.log(docs);
		res.json(docs);
	})
});

//add contact
app.post('/contactlist', function (req, res) {
	console.log(req.body);
	db.contactlist.insert(req.body, function (err, doc) {
		res.json(doc);
	})
});
//remove contact
app.delete('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	});
});	
//edit contact
app.get('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
		res.json(doc);
	})
})
//update
app.put('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	console.log(req.body.name);
	db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)}, 
		update: {$set: {
			email: req.body.email,
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			gender: req.body.gender,
			phone: req.body.phone,
			addr: req.body.addr
		}}, 
		new: true}, function (err, doc) {
			res.json(doc);
		});
})

//config server's port
var port = process.env.PORT || 3500;

app.listen(port);
console.log("Server running on port " + port);