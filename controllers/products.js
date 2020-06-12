const Product = require('../model/product');
const Order = require('../model/order');

exports.getAllProducts = (req, res, next) => {
    Product.find().then((products) => {
        res.render('shop/products', {
            pageTitle: 'All Products',
            prod: products,
            path: '/products'
        });
    }
).catch(err => console.error(err));
}

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId).then((product) => {
        res.render('shop/product-detail', {
            product: product,
            pageTitle: product.title,
            path: '/products'
        })

    })
}

exports.getCompleteProducts = (req, res, next) => {
    Product.find().then((products) => {
        res.render('shop/index', 
        {prod: products, 
        pageTitle: 'Products',
        path: '/'
    });
    }
).catch(err => console.error(err))
}

exports.productsInCart = (req, res, next) => {
    req.user.populate('cart.items.productId')
    .execPopulate()
    .then(user => {
        const products = user.cart.items;
        res.render('shop/cart', {
            pageTitle: 'Cart',
            path: '/cart',
            products: products
        })
    }).catch(err => console.log(err))
};

exports.addProductToCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId).then(product => {
        return req.user.addToCart(product);
    }).then(result => {
        res.redirect('/cart');
    }).catch(err => console.log(err));
}


exports.getOrders = (req, res, next) => {
   Order.find({'user.userId': req.user._id})
    .then(orders => {
        res.render('shop/orders', {
            pageTitle: 'Checkout',
            path: '/orders',
            path: '/orders',
            orders: orders
        })
    }).catch(err => console.log(err))
    
}

exports.orderItem = (req, res, next) => {
    req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
        const products = user.cart.items.map(i => {
            return {quantity: i.quantity, product: {...i.productId._doc}}
        });
        const order = new Order({
            user: {
                name: req.user.name,
                userId: req.user
            },
            products: products
        });
        return order.save();
    }).then(result => {
        return req.user.clearCart();
    }).then(re => {
        res.redirect('/orders');
    })
    .catch(err => console.log(err));
}

exports.deleteCartProduct = (req, res, next) => {
    const deleteId = req.body.deleteId;
   req.user.removeCart(deleteId)
    .then(result => {
        res.redirect('/cart');
    })
    .catch(err => console.log(err));
}