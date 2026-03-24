import React, { use, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import cartLogo from '../assets/cart.png';
import CartItem from '../components/CartItem';

const Cart = () => {
    // const [items, setItems] = useState([
    //     { id: 1, name: 'Sneakers Midnight', category: 'Calzado', price: 89.99, quantity: 1, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400' },
    //     { id: 2, name: 'Reloj Minimalista', category: 'Accesorios', price: 125.00, quantity: 2, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' },
    //     { id: 3, name: 'Auriculares Max', category: 'Electrónica', price: 199.90, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' }
    // ]);

    const [items, setItems] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setItems(savedCart);
    }, []);

    const updateLocalStorage = (newItems) => {
        setItems(newItems);
        localStorage.setItem('cart', JSON.stringify(newItems));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    const handleUpdateQuantity = (productCode, change) => {
        const newItems = items.map(item => {
            if (item.product_code === productCode) {
                const newQty = Math.max(1, item.quantity + change);
                return { ...item, quantity: newQty };
            }
            return item;
        });
        updateLocalStorage(newItems);
    };

    const handleRemoveItem = (productCode) => {
        const newItems = items.filter(item => item.product_code !== productCode);
        updateLocalStorage(newItems);
    };

    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

const sendWhatsAppOrder = () => {
        const phoneNumber = "59169766455";
        
        const cartDetails = items.map(item => 
            `• ${item.name}\n  Cod: ${item.product_code}\n  Cant: ${item.quantity} x ${item.price.toFixed(2)} Bs`
        ).join('\n\n');

        const message = 
                        `Hola, me gustaría realizar el siguiente pedido:\n\n` +
                        `${cartDetails}\n\n` +
                        `*Total: ${subtotal.toFixed(2)} Bs*`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    };


    if (items.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center animate-in fade-in duration-500">
                    <div className="w-48 h-48 md:w-64 md:h-64 bg-gray-100 rounded-full flex items-center justify-center mb-8">
                        <img src={cartLogo} className="w-32 h-32 md:w-48 md:h-48 object-contain" alt="Empty" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Tu carrito está vacío :(</h2>
                    <Link to="/categories" className="bg-orange-cruz text-white px-8 py-3 rounded-xl font-bold mt-4 hover:scale-105 transition-all">
                        Empezar a comprar
                    </Link>
                </div>
            );
        }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
            <div className="flex items-center gap-3 mb-8">
                <Link to="/categories" className="p-2 hover:bg-gray-100 rounded-full text-black">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-2xl md:text-4xl font-black tracking-tighter uppercase italic">
                    Tu <span className="text-orange-cruz">Carrito</span>
                </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <CartItem 
                            key={item.product_code} 
                            item={item} 
                            onUpdateQuantity={handleUpdateQuantity}
                            onRemove={handleRemoveItem}
                        />
                    ))}
                </div>

                {/* (Sticky) */}
                <div className="lg:col-span-1">
                    <div className="bg-gray-900 rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8 text-white sticky top-24 shadow-xl">
                        <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6">Resumen</h3>
                        
                        <div className="space-y-2 md:space-y-3 mb-4 md:mb-6 text-gray-400 text-xs md:text-sm">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span className="text-white font-mono">{subtotal.toFixed(2)} Bs</span>
                            </div>
                            {/* <div className="flex justify-between">
                                <span>Envío</span>
                                <span className="text-green-400 font-bold text-[10px]">GRATIS</span>
                            </div> */}
                        </div>

                        <div className="h-[1px] bg-white/10 mb-4 md:mb-6"></div>

                        <div className="flex justify-between items-end mb-6 md:mb-8">
                            <span className="text-gray-400 text-[10px] font-bold uppercase">Total</span>
                            <span className="text-2xl md:text-3xl font-black italic tracking-tighter">
                                {subtotal.toFixed(2)} Bs
                            </span>
                        </div>

                        {/* Bouton plus compact sur mobile */}
                        <button onClick={sendWhatsAppOrder} className="w-full bg-orange-cruz py-3 md:py-4 cursor-pointer rounded-xl font-black uppercase text-xs md:text-sm tracking-widest hover:bg-indigo-500 transition-all active:scale-95 shadow-lg shadow-indigo-500/10">
                            Pagar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;