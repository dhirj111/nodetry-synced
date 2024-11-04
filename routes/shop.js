const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);


router.get('/products/:productId', shopController.getProduct);

//we will get diffrent values of productid and we used a diffrent route handler in
//controller file to get details of a specific page
//remember we are trying to pass  this :productId to controller's function ,


router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart)

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;
