'use strict'

const Cart = require('../models/cart.model');
const Product = require('../models/products.model');
const { validateData } = require('../utils/validate');


exports.saveCart = async (req, res) => {
    try {
        const userId = req.user.sub;
        const params = req.body;
        const products = {
            product: params.product,
            quantity: params.quantity
        }
        const msg = validateData(products);
        
        if (!msg) {
            const searchProduct = await Product.findOne({_id: products.product});
            const search = await Cart.findOne({user: userId });
            if(searchProduct.stock > 0){
                if (search) {
                const update = await Cart.findOneAndUpdate({ _id: search.id }, { $push: { products: [{ product: products.product, quantity: products.quantity }] } });
                return res.send({ message: 'Product successfully added', update })
                }else{
                    return res.send({message: 'Product not correctly added'});
                }
            }
        }else return res.send(msg)
    } catch (err) {
        console.log(err);
        return err;
    }
}