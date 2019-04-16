var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
var colors = require("colors");

var connection = mysql.createConnection({
	host:"localhost",
	port:3306,
	user:"root",
	password:"password",
	database:"bamazon_db"
});

connection.connect(function(err){
	if(err)throw err;
	console.log(colors.cyan("You are connected to Bamazon store as id #" + connection.threadId));
	displayProducts();
});

var displayProducts = function(){
	var query = "Select * FROM products";
	connection.query(query, function(err, res){
		if(err) throw err;
		var displayTable = new Table ({
			head: ["Item ID", "Product Name", "Department Name", 
			"Price $", "Quantity on Hand"],
			colWidths: [10,25,25,10,14]
		});
		for(var i = 0; i < res.length; i++){
			displayTable.push(
				[res[i].item_id,res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
				);
		}
		console.log(displayTable.toString());
        purchasePrompt();
        //connection.end();
	});
}

function purchasePrompt(){
	inquirer.prompt([
	{
		name: "ID",
		type: "input",
		message:"Please enter Item ID you would like to purchase.",
		filter:Number
	},
	{
		name:"Quantity",
		type:"input",
		message:"How many items do you wish to purchase?",
		filter:Number
	},

 ]).then(function(answers){
	 var quantityNeeded = answers.Quantity;
	 
	 var IDrequested = answers.ID;
	 
 	purchaseOrder(IDrequested, quantityNeeded);
 });
};

function purchaseOrder(ID, amtNeeded){
	connection.query('Select * FROM products WHERE item_id = ' + ID, function(err,res){
		if(err){console.log(err)};

		if(amtNeeded <= res[0].stock_quantity){
			var totalCost = res[0].price * amtNeeded;
			console.log("Your order is in stock! ".green +res[0].stock_quantity);
			console.log("Your total cost for " + amtNeeded + " " +res[0].product_name + " is $" + totalCost + " Thank you for you purchase!");

			connection.query("UPDATE products SET stock_quantity = stock_quantity - " + amtNeeded + "WHERE item_id = " + ID);

		} else {
			console.log("We apologize, we do not have enough: " .red +res[0].product_name + " to complete your order.");
		};
        displayProducts();
        //connection.end();
	});
};


displayProducts(); 