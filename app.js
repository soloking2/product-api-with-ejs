const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const mongoose = require('mongoose');

const errorController = require('./controllers/404');
const productsRoutes = require('./routes/products');
const adminRoutes = require('./routes/admin');
const userController = require('./controllers/userController');
const User = require('./model/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(userController.login);
app.use('/admin', adminRoutes);
app.use(productsRoutes);

app.use(errorController.pageNotFound);

mongoose.connect('mongodb://localhost/shop', {useUnifiedTopology: true, useNewUrlParser: true})
.then(result => {
  User.findOne().then(user => {
    if(!user) {
      const user = new User({
        name: 'Solomon',
        email: 'solobobo@gmail.com',
        cart: {
          items: []
        }
      });
      user.save();
    }
  })
  app.listen(5000);
}).catch(err => console.log(err));

