const express = require('express');

const router = express.Router();
const productsController = require('../controllers/products');


router.get('/', productsController.getCompleteProducts);
router.get('/products', productsController.getAllProducts);

router.get('/products/:productId', productsController.getProduct)

router.get('/cart', productsController.productsInCart);
router.post('/cart', productsController.addProductToCart);

router.get('/orders', productsController.getOrders);

router.post('/order-item', productsController.orderItem);

router.post('/delete-cart-product', productsController.deleteCartProduct)

module.exports = router;