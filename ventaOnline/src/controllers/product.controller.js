'use strict'

const {validateData, checkUpdate} = require('../utils/validate');
const Product = require('../models/products.model');
const User = require('../models/user.model');
const Category = require('../models/category.model');


exports.saveProduct = async (req, res)=>{
    try{
        const params = req.body;
        const data = {
            nameProduct: params.nameProduct,
            price: params.price,
            stock: params.stock,
            Category: params.Category
            

        };
        const msg = validateData(data);
        if(!msg){
        data.description = params.description;
        const product = new Category(data);
        await product.save();
        return res.send({message: 'Product saved'});
        }else return res.status(400).send(msg);
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.getProducts = async(req, res)=>{
    try{
        const products = await Category.find();
        return res.send({products});
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.getProduct = async(req, res)=>{
    try{
        const productId = req.params.id;
        const product = await Product.findOne({_id: productId});
        if(!product) return res.send({message: 'Category not found'});
        return res.send({product});
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.searchProduct = async(req, res)=>{
    try{
        const params = req.body;
        const data = {
            name: params.name
        };
        const msg = validateData(data);
        if(!msg){
            const product = await Product.find({name: {$regex:params.name, $options: 'i'}});
            return res.send({product});
        }else return res.status(400).send(msg);
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.updateProduct = async(req, res)=>{
    try{
        const params = req.body;
        const productId = req.params.id;
        const check = await checkUpdate(params);
        if(check === false) return res.status(400).send({message: 'Data not received'});
        const checkAdmin = await User.findOne({_id: params.user});
        if(!checkAdmin || checkAdmin.role !== 'ADMIN') return res.status(403).send({message: 'Acction unauthorized'});
        const updateProduct = await Product.findOneAndUpdate({_id: productId}, params, {new: true})
            .populate('user');
        if(!updateAnimal) return res.send({message: 'Category not found'});
        updateAnimal.user.password = undefined;
        updateAnimal.user.role = undefined;
        return res.send({message: 'Updated Product', updateProduct});
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.deleteProduct = async(req, res)=>{
    try{
        const productId = req.params.id;
        const permission = await checkPermission(productId, req.user.sub);
        if(!productDeleted) return res.status(500).send({message: 'Product not found or already deleted'});
        return res.send({productDeleted, message: 'Product deleted'});
    }catch(err){
        console.log(err);
        return err;
    }
} 