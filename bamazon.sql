DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products (
	item_id INTEGER(6) NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(100),
	department_name VARCHAR(100),
	price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
	PRIMARY KEY (item_id)
);
SELECT * FROM products;

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity) 
VALUES (101, "blue ray player", "electronics", 79.99, 20),
	   (201, "Art of the Deal", "books", 00.01, 10),
	   (301, "lamp", "household", 29.99, 5),
	   (401, "sweater", "clothes", 19.99, 11),
	   (501, "shoes", "footwear", 39.99, 14),
	   (601, "chips", "grocery", 2.99, 18),
	   (701, "gloves", "seasonal", 4.99, 02),
	   (801, "oil", "automotive", 6.99, 09),
	   (901, "formula", "baby", 19.99, 16),
	   (1001, "car", "toys", 5.99, 19)
