import {create} from 'zustand';

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({products}),
    //Add a new product
    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.image) {
            return {success:false, message: "Veuillez remplir tous les champs !"}
        }
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        });
        
        const data = response.json();
        set((state) => ({products: [...state.products, data.data]}));
        return {success:true, message: "Produit ajouté avec succès !"}
    },

    // Fetch products
    fetchProduct: async () => {
        const response = await fetch('/api/products');
        const data = await response.json();
        set({products: data.data});
    },

    // Edit a product
    updateProduct: async (pid, updatedProduct) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProduct)

        });
        const data = await res.json();
        if(!data.success) {
            return {success:false, message: data.message}
            set((state) => ({products: state.products.map((product) => product._id === id ? data.data : product)}));
        }
        set((state) => ({products: state.products.map((product) => product._id === id ? data.data : product)}));
        return {success:true, message: data.message};
        
    },

    // Delete a product
    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: 'DELETE',
        });
        
        const data = res.json();
        if(!data.success) {
            set((state) => ({products: state.products.filter((product) => product._id !== pid)}));
            return {success:false, message: data.message};
        } else {
            set((state) => ({products: state.products.filter((product) => product._id !== pid)}));
            return {success:true, message: data.message};
        }
        
        // set((state) => ({products: state.products.filter((product) => product._id !== id)}));
        // return {success:true, message: data.message};
        // return {success:true, message: data.message};
    }
}));
