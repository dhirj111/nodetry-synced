const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./util/database')
const errorController = require('./controllers/error');
//not in nodetry
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

//removed that test code of db
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(4000);


// "this repo is update version of nodetry repo of same 
// user to sync project with trainer  , here html view files are changed to ejs  files "