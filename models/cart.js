const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);


//{"products":[{"id":"989280","qty":2},{"id":"80280280","qty":1}],"totalPrice":78} we want to store 
//something like this in json format by below class
module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      //we created //this json text { products: [], totalPrice: 0 }
      //we will  perform all operations on this object and will stringify and store it as json file
      if (!err) {
        cart = JSON.parse(fileContent);
        //if there is a cart means !err , then we stored all values in parsed format
      }
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        prod => prod.id === id
        //here we seen that inside parsed cart , is tapped product already present and 
        //stored its location 
      );
      const existingProduct = cart.products[existingProductIndex];
      //here we stored product id and price by  index
      let updatedProduct;
      // Add new product/ increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      });
    });
  }
};
