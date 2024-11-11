//removed file and path as we are not working with them anymore
//also removed all inner method code of performing operation on files

const db =require('../util/database');
module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {


  }

  // products => {
  //   res.render('admin/products', {
  //     prods: products,
  //     pageTitle: 'Admin Products',
  //     path: '/admin/products'
  //   });
  // }
  //we pasing a function like that as a callback below
  static fetchAll() {

    return db.execute('SELECT *FROM products')
    //return value will be a promise 
  }

  //custom function to delete by id  for items[]
  static deletebyid(prodId) {


  }


  static findById(id) {

  }
};
