import Product from "../models/product.model.js"
import mongoose from "mongoose";

export const getRoot = async (req,res) => {
    res.status(400).json({success:true,message:"Server is live!"})
}

export const createProduct = async (req,res) => {
    const product = req.body

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({success:false, message:"Please provide all fields"})
    }

    const newProduct = new Product(product)
    await newProduct.save().catch((error) => {
        console.error(`Error in Create product: ${error.message}`)
        res.status(500).json({success:false, message:"Server error"})
    })

    res.status(201).json({success:true, data:newProduct})
}

export const getProducts = async (req,res) => {
    const products = await Product.find({}).catch((error) => {
        console.log("Error in fetching products")
        res.status(500).json({success:false, message:"Server error"})
    })

    res.status(200).json({success:true, date:products})
}

export const updateProduct = async (req,res) => {
    const {id} = req.params
    const product = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invalid Product ID"})
    }

    const updatedProduct = await Product.findByIdAndUpdate(id,product,{new:true})
        .catch((error) => res.status(500).json({success:false, message:"Server error"}))

    res.status(200).json({success:true, data:updatedProduct})
}

export const deleteProduct = async (req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: "Invalid Product ID"})
    }

    await Product.findByIdAndDelete(id)
        .catch((error) => res.status(500).json({success:false, message:"Server Error"}))

    res.status(200).json({success: true, message: "Product deleted"})
}

