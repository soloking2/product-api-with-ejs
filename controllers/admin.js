const mongodb = require('mongodb');
const Product = require('../model/product');
exports.getProducts = (req, res, next) => {
    res.render('admin/edit-product', 
    {pageTitle: 'Products',
    path: '/admin/add-products',
    editMode: false
    })
};

exports.postProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const product = new Product({
        title: title, 
        price: price,
        description: description, 
        imageUrl: imageUrl,
        userId: req.user
    });
    
    product.save().then(() => {
        console.log('created successfully');
        res.redirect('/admin/products');
    }).catch(err => console.log(err));
    
}

exports.editProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) return res.redirect('/');

    const productId = req.params.productId;
    Product.findById(productId).then((products) => {
        if(!products) res.redirect('/');
        res.render('admin/edit-product', 
        {pageTitle: 'Edit Product',
        path: '/admin/edit-products',
        editMode: editMode,
        product: products
        })

    })
};

exports.postEditProduct = (req, res, next) => {
const prodId = req.body.productId;
const updatedName = req.body.title;
const updatedImageUrl = req.body.imageUrl;
const updatedPrice = req.body.price;
const updatedDesc = req.body.description;
Product.findById(prodId).then(product => {
    product.title = updatedName;
    product.price = updatedPrice;
    product.description = updatedDesc;
    product.imageUrl = updatedImageUrl;

    return product.save();
}).then(
    result => console.log('UPDATED PRODUCT')
).catch(err => console.log(err))
res.redirect('/admin/products');
}

exports.deleteProduct = (req, res, next) => {
const deleteId = req.body.deleteId;
Product.findByIdAndRemove(deleteId).then(() => {
    console.log('Deleted successfully');
    res.redirect('/admin/products')
}).catch(err => console.log(err))
}

exports.getAdminProducts = (req, res, next) => {
    Product.find().then((products) => {
        res.render('admin/product-list', {
            pageTitle: 'Admin Products',
            path: '/admin/products',
            prod: products
        })
        
    })
}
