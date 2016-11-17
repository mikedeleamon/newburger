/* 1-Manager-Schema
 * -/-/-/-/-/-/-/-/- */


/* INSTRUCTIONS: 
 * A) Create a store database in mysql: "CREATE DATABASE store0;"
 * B) Create the manager model with Sequelize CLI.
 * C) Extract the manager model into server.js 
 *    by requiring the model directory.
 * D) Sync your model with models.sequelize.sync()
 * E) Connect the above sync with a .then().
 			Inside the .then, write an anonymous function that
			uses the Manager model to create a manager in your database.
 * E) Run the file with node and check your mysql database 
 *    to check if it created the manager table and field
 * 
 * -/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/ */



// TODO: bring in our Sequelize models object


// TODO: Sync our models


// TODO: attach .then to the sync
//       and Create our Manager in the callback
// ================================================


var express = require('express');
var app = express();

// include bodyParser
var bodyParser = require('body-parser')

// bodyParser middleware
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));


var models=require('/models')
var sequelizeConnection = models.sequelize


sequelizeConnection.sync({ force: true })
.then(function(){ 
	return models.burger.create(
	{
		bname:'hamburger',
		eaten:false})
.then( return models.burger.create(
	{
		bname:'cheeseburger',
		eaten:false})
})


app.get('/:burger', function(req, res){

	
	var Burger = req.params.burger;

	
	models.burger.findOne({where: { name: Burger} })
	// we pass that instace to a callback
	.then(function(result){
		// then get the associated users
		return result.getUsers()
		// we pass those users into a second callback
		.then(function(burgers){
			// and send those users to the browser as json
			return res.json(burgers);
		})
	})
})

app.get('/:burger/create', function(req, res){

	
	var Burger = req.params.burger;

	
	models.burger.create({
		  bname: Burger,
		  eaten: false
		});
	})

app.get('/:burger/update', function(req, res){

	
	var Burger = req.params.burger;

	
	models.burger.update({
		  
		  eaten: true
		});
	})

