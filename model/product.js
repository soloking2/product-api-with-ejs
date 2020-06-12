const mongoose = require('mongoose');

const {Schema} = mongoose;

const productModel = new Schema({
  title: {type: String, required: true},
  price: {type: Number, required: true},
  imageUrl: {type: String, required: true},
  description: {type: String, required: true},
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Product', productModel)