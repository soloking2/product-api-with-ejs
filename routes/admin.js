const express = require('express');

const adminController = require('../controllers/admin');
const router = express.Router();

router.get('/add-products', adminController.getProducts);

router.get('/products', adminController.getAdminProducts);

router.get('/products/:productId', adminController.editProduct);

router.post('/edit-product', adminController.postEditProduct);

router.post('/add-product', adminController.postProduct);

router.post('/delete-product', adminController.deleteProduct);

module.exports = router;