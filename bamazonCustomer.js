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
			head: ["Item ID", "Product Name", "Department Name", "Price $", "Quantity"],
			colWidths: [10,25,25,10,15]
		});
		for(var i = 0; i < res.length; i++){
			displayTable.push(
				[res[i].item_id,res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
				);
		}
		console.log(displayTable.toString());
        purchasePrompt();
       
	});
}
function validateInput(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a whole number.';
	}
}

function purchasePrompt(){
	inquirer.prompt([
	{
		name: "ID",
		type: "input",
		message:"Please enter Item ID you would like to purchase.",
		validate: validateInput,
		filter:Number
	},
	{
		name:"Quantity",
		type:"input",
		message:"How many items do you wish to purchase?",
		validate: validateInput,
		filter:Number
	},

 ]).then(function(answers){
	 var quantityNeeded = answers.Quantity;
	 
	 var IDrequested = answers.ID;
	 
 	purchaseOrder(IDrequested, quantityNeeded);
 });
};

function purchaseOrder(ID, amtNeeded){
	//console.log(typeof ID);
	connection.query("Select * FROM products WHERE item_id = " + ID, function(err,res){
		if(err){console.log(err)};
		
		if(amtNeeded <= res[0].stock_quantity){
			var totalCost = res[0].price * amtNeeded;
			console.log("Your order is in stock! ".green +res[0].stock_quantity);
			console.log("Your total cost for " + amtNeeded + " " +res[0].product_name + " is $" + totalCost.toFixed(2) + " Thank you for you purchase!");
			//var updateQuantity = res[0].stock_quantity - amtNeeded;
			//console.log(updateQuantity);
			
			connection.query("UPDATE products SET stock_quantity = stock_quantity -  ? WHERE item_id = ?",
							[amtNeeded, ID], );

		} else {
			console.log("We apologize, we do not have enough: " .red +res[0].product_name + " to complete your order.".red);
		};
        continueShopping();
      
	});
};

function continueShopping(){

    inquirer.prompt([
    {
        type: "confirm",
        name: "yesNo",
        message: "Would you like to buy another item?"
    }
    ]).then( function(response) {

        if(response.yesNo){

           displayProducts();
        } else {

           connection.end();
        }
	});
}
