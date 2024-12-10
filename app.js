const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const Sequelize = require('sequelize');
const sequelize = require('./util/database');
const app = express();
const Product = require('./models/product');
const User = require('./models/user')

//imported cart and cart-item so that we can use diffrent associations here
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')
app.set('view engine', 'ejs');
app.set('views', 'views');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
//removed that test code of db
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//as user is created by demo sync below , we used below middleware to store user in req.user so
//that it can used in whole app conveniantly  
app.use((req, res, next) => {
  console.log("inside  recently build method")
  User.findByPk(1).then(user => {
    req.user = user;
    console.log("suer is her e as", user, "ended here ___________454_____")
    next();
    //important next() to make this middleware jump
  }).catch(err =>
    console.log(err)
  )
});
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' })
//it(belong to) automatically adds new users id column to product table)

User.hasMany(Product)
//This means that one User can be associated with multiple Products or he 
//can own multiple products as a seller

//----------------------------------------

User.hasOne(Cart)
//A User can have one Cart. The Cart table will get a foreign key, typically 
//named userId, to link the cart to its user.
// resultant - A new column userId is added to store the ID of the user who owns the cart.

Cart.belongsTo(User)
//this synatx is optional and same as above  both adds a key to cart 
//It means each Cart belongs to one User ,This is just inverse of above
//The Cart table is linked to the User table through a foreign key, userId.

Cart.belongsToMany(Product, { through: CartItem });
//This establishes a many-to-many relationship between Cart and Product via an 
//intermediate table/model called CartItem
//A Cart can contain many Products.

Product.belongsToMany(Cart, { through: CartItem });
//This establishes the inverse many-to-many relationship, where a Product can belong to multiple Carts.
//A Product can appear in multiple Carts.
//The relationship is also defined through the same CartItem junction table.

sequelize.sync().then(result => {
  return User.findByPk(1)
  //here it just sees if user already exists otherwise we jump to next .then to create a dummy user 
})
  .then(user => {
    //as there  is no user we just created a demo user
    if (!user) {
      return User.create({ name: 'bherulaal', email: 'test@test.com' })
    }
    return user;
  })

  .then(user => {

    return user.createCart()
    //sequalize magic to create Cart with prevalue of userId in cart

  })
  .then(cart => {
    app.listen(4000)
  })
  .catch(err => {
    console.log(err);
  });

// "this repo is update version of nodetry repo of same 
// user to sync project with trainer  , here html view files are changed to ejs  files "