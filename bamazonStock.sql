CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(150) NOT NULL,
    department_name VARCHAR(150) NOT NULL,
    price DECIMAL(20,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('tennis ball', 'sporting goods', '2.50', '12'),
		('nes', 'video games', '150.00', '2'),
        ('nike shoes', 'athletic clothing', '100.00', '1'),
        ('adidas shoes', 'athletic clothing', '100.00', '1'),
        ('fresh bread loaf', 'food', '5.99', '2'),
        ('captain american replica shield', 'collectibles', '1000.00', '1'),
        ('iron man replica armor', 'collectibles', '1000000.00', '1'),
        ('fishing rod', 'sporting goods', '150.00', '3'),
        ('keurig machine', 'kitchen appliances', '200.00', '3'),
        ('dyson vacuum', 'household appliances', '200.00', '5');
        
SELECT * FROM products;