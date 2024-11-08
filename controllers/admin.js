const Product = require('../models/product');
const router = require('../routes/admin');
const { route } = require('../routes/admin');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  //it will be setted as we get by query of url
  if (!editMode) {
    return res.redirect('/')
  }
  const prodId = req.params.productId;
  //used class static method to get whole id's object
  Product.findById(prodId, product => {

    if (!product) {
      return res.redirect('/')
    }

    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      //done a special property so that we can do front accordingly in ejs  as true
      editing: editMode,
      product: product
      // formsCSS: true,
      // productCSS: true,
      // activeAddProduct: true
    });

  });

}

exports.postdeleteproduct = (req, res, next) => {

  const prodId = req.params.productId;
  console.log(prodId)
Product.deletebyid(prodId)
res.redirect('/admin/products')

  
}



exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
