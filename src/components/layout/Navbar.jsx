import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

const [cartCount, setCartCount] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];

    console.log('Cart loaded from localStorage:', savedCart);
    return savedCart.reduce((acc, item) => acc + item.quantity, 0);
});

useEffect(() => {
    const updateCount = () => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        const total = savedCart.reduce((acc, item) => acc + item.quantity, 0);
        setCartCount(total);
    };

    window.addEventListener('cartUpdated', updateCount);
    
    window.addEventListener('storage', updateCount);

    return () => {
        window.removeEventListener('cartUpdated', updateCount);
        window.removeEventListener('storage', updateCount);
    };
}, []);

    return (
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
            
            <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-orange-cruz rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase">
                China<span className="text-orange-cruz">cruz</span>
            </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
            <Link to="/categories" className="text-sm font-bold text-gray-500 hover:text-orange-cruz uppercase tracking-widest transition-colors">Categorías</Link>
            <Link to="/contact" className="text-sm font-bold text-gray-500 hover:text-orange-cruz uppercase tracking-widest transition-colors">Contacto</Link>
            
            <Link to="/cart" className="relative p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
                <ShoppingCart size={20} className="text-gray-700" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full font-bold">{cartCount}</span>
            </Link>
            </div>

            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
            </button>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
            <div className="md:hidden bg-white border-t p-6 flex flex-col gap-4 animate-in slide-in-from-top-2">
            <Link to="/categories" onClick={() => setIsOpen(false)} className="text-lg font-bold">Catálogo</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="text-lg font-bold">Contacto</Link>
            <Link to="/cart" onClick={() => setIsOpen(false)} className="text-lg font-bold text-orange-cruz">Carrito ({cartCount})</Link>
            </div>
        )}
        </nav>
    );
};

export default Navbar;