const Product = require('../models/product');
const Cart = require('../models/cart');
exports.getProducts = (req, res, next) => {



  Product.fetchAll().then(([rows, fieldData]) => {
    res.render('shop/product-list', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch((err) => {
    console.log(error)
  })


};

exports.getProduct = (req, res, next) => {

  //we import product id of route address by using params syntax
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    //here we get raw object of productid, object
    res.render('shop/product-detail', { product: product, pageTitle: product.title, path: '/products' })
    //passsed path also that so that navigation .ejs file's active section can work
    //we passed our product object as key to render in views
  })
}
exports.getIndex = (req, res, next) => {
  //used that promise's to render values to ejs below;
  Product.fetchAll().then(([rows, fieldData]) => {
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch((err) => {
    console.log(error)
  })

};

exports.getCart = (req, res, next) => {


  Cart.getProductsFromFile((products) => {
    console.log("these are products fetched from cart added by user file", products)
    console.log("fetching completed ")
    // res1.sendFile(path1.join(rootDirectory, "views", "shop.html"));
  })


  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};


//used cart class of models cart.js to implement cart functionality 
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};


exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
