import express from 'express';

import { createProduct, deleteProduct, getSingleProduct, getProducts, updateProduct } from '../controllers/productController.js';

const router = express.Router();

// Create a product endpoint
router.post('/', createProduct); 

// Get all products
router.get('/', getProducts);

// Delete a product
router.delete('/:id', deleteProduct);

// Update a product
router.put('/:id', updateProduct);

// Get a single ptoduct
router.get('/:id', getSingleProduct);

export default router;