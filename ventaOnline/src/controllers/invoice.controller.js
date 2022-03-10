'use strict'

const Product = require('../models/products.model');
const Cart = require('../models/cart.model');
const Invoice = require('../models/invoice.models');

exports.prueba = (req, res)=>{
    return res.send({message: 'La funcion prueba esta ejecutandose'});
};

exports.savePurchase = async (req, res) => {
    try {
        const userId = req.user.sub;
        const cart = await Cart.findOne({ user: userId });

        if (cart) {
            for (var i = 0; i < cart.products.length; i++) {
                const productId = cart.products[i].product;
                const quantity = cart.products[i].quantity;

                const product = await Product.findOne({ _id: productId });
                const subtract = product.stock - quantity;

                if (subtract < 0) return res.send({ message: 'Out of stock' });
                const data1 = {
                    stock: subtract
                }
                await Product.findOneAndUpdate({ _id: productId }, data1, { new: true })
            }
            return res.send({ message: 'Complete invoice!', cart });
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}
