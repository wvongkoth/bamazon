var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  port	   :  3306,
  password : 'root',
  database : 'bamazon'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  start();
});

function start(){
	inquirer.prompt([
	{
		name: "purchase",
		type: "rawlist",
		message: "What would you like to do?",
		choices: ["View all items available.", "I don't want to do anything."]
	}
	]).then(function(answer){
		if(answer.purchase === "View all items available."){
			viewItems();
		}
		else if(answer.purchase === "I don't want to do anything."){
			console.log("Have a nice day!")
		}
	})
};

function viewItems(){
		connection.query("SELECT * FROM products", function(err, results){
			if(err) throw err;
			inquirer
			.prompt([
			{
				name: 'choice',
				type: 'rawlist',
				message: 'What would you like to purchase?',
				choices: function(){
					var choiceArray = [];
					for(var i = 0; i < results.length; i++){
						choiceArray.push(results[i].product_name);
					}
					return choiceArray;
				}
			},
			{
				name: "itemSelect",
				type: "input",
				message: "How many would you like to buy?"
			}
			])
			.then(function(answer){
				var chosenItem;
				var chosenItemStock;
		        for (var i = 0; i < results.length; i++) {
		          if (results[i].product_name === answer.choice) {
		            chosenItem = results[i].product_name;
		            chosenItemStock = results[i].stock_quantity;
		          }
		        }

		        if(chosenItemStock < answer.itemSelect){
		        	console.log('Not enough in stock')
		        	connection.end();
		        }
		        else if(chosenItemStock > answer.itemSelect){
		        	console.log('Successful purchase');
		        	connection.end();
		        }  				
			})
		}	
	)}