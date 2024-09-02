import Product from "../models/product.js";
import mongoose from "mongoose";

export const createProduct = async (req, res) => {
    const product = req.body;
    if(!product.name || !product.image || !product.price) {
        return res.status(400).json({message: 'Veuillez renseigner tous les champs'}); // Return a 400 status code with a JSON response
    }

    const newProduct = new Product(product)

    try {
        await newProduct.save();
        res.status(201).json({success:true, message: 'Produit ajouté avec succès', data: newProduct}); // Return a 201 status code with a JSON response
    } catch (error) {
        console.error("Problème d'ajout de produit", error.message);
        res.status(500).json({success:false, message: 'Erreur de serveur'}); // Return a 500 status code with a JSON response

    }
};

export const getProducts = async (req, res) => {
    try {
        const product = await Product.find({});
        // if(!product) {
        //     return res.status(404).json({success:false, message: 'Aucun produit trouvé'});
        // } 
        return res.status(200).json({success:true, message: 'Produits récupérés avec succès', data: product});

    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message: 'Erreur de serveur'}); // Return a 500 status code with a JSON response
    }
};

export const deleteProduct = async (req, res) => {
    const {id} = req.params; // Get the id from the URL

    try {
        const product = await Product.findByIdAndDelete(id);
        if(!product) {
            res.status(404).json({success:false, message: 'Produit non trouvé'}); // Return a 404 status code with a JSON response
        } else {
            res.status(200).json({success:true, message: 'Produit supprimé avec succès'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message: 'Erreur de serveur'}); // Return a 500 status code with a JSON response

    }
};

export const updateProduct = async (req, res) => {
    const {id} = req.params; // Get the id from the URL
    const product = req.body; // Get the product data from the request body

    try {
        const updateProduct = await Product.findByIdAndUpdate(id, product);
        if(!updateProduct) {
            res.status(404).json({success:false, message: 'Produit non trouvé'}); // Return a 404 status code with a JSON response
        } else {
            const updatedProduct = await Product.findById(id);
            res.status(200).json({success:true, message: 'Produit mis à jour avec succès', data: updatedProduct});
        }

    } catch (error) {
        console.log(error); // Log the error
        res.status(500).json({success:false, message: 'Erreur de serveur'});
    }
};

export const getSingleProduct = async (req, res) => {
    const {id} = req.params; // Get the id from the URL
    try {
        const product = await Product.findById(id);
        // Check if the product exists 
        if(!product) {
            res.status(404).json({success:false, message: 'Produit non trouvé'});
        } else {
            res.status(200).json({success:true, message: 'Produit trouvé avec succès', data: product});
        }
    } catch (error) {
        console.log(error);        
    }
};