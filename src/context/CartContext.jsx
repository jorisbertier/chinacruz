import React, { createContext, useContext, useState } from 'react';
import Toast from '../components/Toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [toast, setToast] = useState(null);

    const addToCart = (product, quantity) => {
        const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingIndex = currentCart.findIndex(item => item.product_code === product.product_code);

        const productData = {
            product_code: product.product_code,
            name: product.name,
            price: product.discount_price || product.price,
            image: product.images ? product.images[0] : product.image,
            quantity: quantity,
            subcategory: product.subcategory
        };

        if (existingIndex > -1) {
            currentCart[existingIndex].quantity += quantity;
            productData.quantity = currentCart[existingIndex].quantity;
        } else {
            currentCart.push(productData);
        }

        localStorage.setItem('cart', JSON.stringify(currentCart));
        window.dispatchEvent(new Event('cartUpdated'));

        setToast(null);

        setToast({
            name: product.name,
            image: product.images ? product.images[0] : product.image,
            quantity: quantity
        });
    };

    return (
        <CartContext.Provider value={{ addToCart }}>
            {children}
            {toast && (
                <Toast 
                    product={toast} 
                    onClose={() => setToast(null)} 
                />
            )}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);