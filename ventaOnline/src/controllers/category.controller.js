'use strict'

const {validateData, checkUpdate} = require('../utils/validate');
const Category = require('../models/category.model');
const User = require('../models/user.model');
const Product = require ('../models/products.model');

exports.saveCategory = async (req, res)=>{
    try{
        const params = req.body;
        const data = {
            nameCategory: params.nameCategory,
            description: params.description,
            product: params.product

        };
        const msg = validateData(data);
        if(!msg){
        data.description = params.description;
        const category = new Category(data);
        await category.save();
        return res.send({message: 'Category saved'});
        }else return res.status(400).send(msg);
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.getCategories = async(req, res)=>{
    try{
        const categories = await Category.find();
        return res.send({categories});
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.getCategory = async(req, res)=>{
    try{
        const categoryId = req.params.id;
        const category = await Category.findOne({_id: categoryId});
        if(!category) return res.send({message: 'Category not found'});
        return res.send({category});
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.searchCategory = async(req, res)=>{
    try{
        const params = req.body;
        const data = {
            name: params.name
        };
        const msg = validateData(data);
        if(!msg){
            const category = await Category.find({name: {$regex:params.name, $options: 'i'}});
            return res.send({category});
        }else return res.status(400).send(msg);
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.updateCategory = async(req, res)=>{
    try{
        const params = req.body;
        const categoryId = req.params.id;
        const check = await checkUpdate(params);
        if(check === false) return res.status(400).send({message: 'Data not received'});
        const checkAdmin = await User.findOne({_id: params.user});
        if(!checkAdmin || checkAdmin.role !== 'ADMIN') return res.status(403).send({message: 'Acction unauthorized'});
        const updateCategory = await Category.findOneAndUpdate({_id: categoryId}, params, {new: true})
            .populate('user');
        if(!updateCategory) return res.send({message: 'Category not found'});
        updateCategory.user.password = undefined;
        updateCategory.user.role = undefined;
        return res.send({message: 'Updated category', updateCategory});
    }catch(err){
        console.log(err);
        return err;
    }
}

exports.deleteCategory = async(req, res)=>{
    try{
        const categoryDef = await Category.findOne({name: 'default'})
        const categoryId = req.params.id;
        const categoryExist = await Category.findOne({_id:categoryId});
        if (categoryExist){
            const productCategory = await Product.find({category:categoryId});
            if(!productCategory){
                await Category.findOneAndDelete({_id:categoryId});
                return res.send({message:'Category successfully deleted'});
            }else{
                await Product.updateMany({category:categoryId}, {category:categoryDef._id},{multi:true});
                await Category.findByIdAndDelete({_id:categoryId});
                return res.send({message:'Category successfully deleted'});
            }
        }else{
            return res.status(404).send('Category not found or already deleted');
        }
        
    }catch(err){
        console.log(err);
        return err;
    }
}