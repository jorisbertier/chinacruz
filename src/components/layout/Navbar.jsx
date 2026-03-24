import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import logo from '../../assets/logo.png';
import letrita from '../../assets/logoLetrita.png';


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
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                
                <Link to="/" className="flex items-center gap-2 group">
                <img src={letrita} alt="Logo" className="w-100 h-auto object-contain hidden sm:block" />
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
            <div className='fixed gap-4 w-full z-50 bg-white/80 h-10 backdrop-blur-md border-b border-b-gray-100 flex items-center pl-10 text-black text-sm font-bold uppercase tracking-widest'>
                <h1>Categoria</h1>
                <h1>Categoria</h1>
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