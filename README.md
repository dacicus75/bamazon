# bamazon
## Description

This application implements a simple command line based storefront using the npm [inquirer](https://www.npmjs.com/package/inquirer) package and the MySQL database backend together with the npm [mysql](https://www.npmjs.com/package/mysql) package. The application presents one interface: **customer** .


### Customer 

The customer interface allows the user to view the current inventory of store items: item IDs, product name, department in which the item is located and price. The user is then able to purchase one of the existing items by entering the item ID and the desired quantity. If the selected quantity is currently in stock, the user's order is fulfilled, displaying the total purchase price and updating the store database. If the desired quantity is not available, the user is prompted to modify their order.

###Screenshot
![bamazonPicture](https://user-images.githubusercontent.com/46613441/56402115-0bf0f500-622a-11e9-8d0a-5aa6f26177f5.png)


###Video Presentation

[bamazonPresentation.pptx](https://github.com/dacicus75/bamazon/files/3096799/bamazonPresentation.pptx)
