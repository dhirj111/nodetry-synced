const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};
//this returns parsed data of  products 

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Math.random().toString();
    //generated a unique id for each product and then saved it below in json array
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  // products => {
  //   res.render('admin/products', {
  //     prods: products,
  //     pageTitle: 'Admin Products',
  //     path: '/admin/products'
  //   });
  // }
  //we pasing a function like that as a callback below
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  //custom function to delete by id  for items[]
  static deletebyid(prodId) {
    fs.readFile(p, (err, fileContent) => {
      let prodasarray = JSON.parse(fileContent)
      const productIndex = prodasarray.findIndex(product => product.id == prodId);
      prodasarray.splice(productIndex, 1);
      fs.writeFile(p, JSON.stringify(prodasarray), err => {
        console.log(err);
      });

    })
    //id will be passed  just remove that specific product by using id from json



  }

  static findById(id, cb) {
    //here by getProductsFromFile method we get all product details in parsed format  ,we just filter 
    //id of our url provided product
    //after getting id matched product we will pass it to callback so that we can perform operations on details
    //of that id's product
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      //stored object of id's matched product and passed it to callback
      cb(product)
      //understand callback in Product.findById of dynamic router in controllers 
    })
  }
};
