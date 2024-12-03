const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const Sequelize = require('sequelize');
const sequelize = require('./util/database');

const app = express();
const Product = require('./models/product');
const User = require('./models/user')
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
    console.log("suer is her e as" , user ,"ended here ___________454_____")
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
//This means that one User can be associated with multiple Products

//if we use sequlize.sync then it automatically uploads data to matching columns table
//if table doesn't exist then it creates by using model files 
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
    app.listen(4000)
  })
  .catch(err => {
    console.log(err);
  });

// "this repo is update version of nodetry repo of same 
// user to sync project with trainer  , here html view files are changed to ejs  files "