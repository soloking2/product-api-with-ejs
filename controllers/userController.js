const User = require('../model/user');

exports.sigup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password; 
  const user = new User(email, password);
  
  user.save().then(user => {
    console.log('created successfully');
  }).catch(err => console.log(err))

}
exports.login = (req, res, next) => {
  User.findById('5e9d96a676e11134f833d479')
  .then(user => {
    req.user = user;
    next();
  }).catch(err => console.log(err))

}