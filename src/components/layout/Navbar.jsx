import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Search } from 'lucide-react';
import logo from '../../assets/logoLetritaWhite.png';
import productsData from '../../data/products.json';


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const [cartCount, setCartCount] = useState(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
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

    const searchResults = useMemo(() => {
        if (!searchTerm.trim() || !Array.isArray(productsData?.products)) {
            return [];
        }
        
        return productsData.products
            .filter(product => 
                product?.name && 
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .slice(0, 10);
    }, [searchTerm]);

    const handleSelectProduct = (product) => {
        console.log("Producto seleccionado:", product.product_code);
        setSearchTerm("");
        navigate(`/product/${product.product_code}`);
    };

    return (
        <nav className="fixed w-full z-50 bg-orange-cruz backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group z-10">
                <img src={logo} alt="Logo" className="w-80 h-auto object-contain hidden sm:block" />
                </Link>

            <div className="relative w-full md:w-64 lg:w-80 group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search 
                        size={16} 
                        className="text-gray-400 group-focus-within:text-orange-cruz group-focus-within:scale-110 transition-all duration-300" 
                    />
                </div>

                <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-100/50 border border-transparent py-2.5 pl-11 pr-10 rounded-full text-sm font-medium placeholder:text-gray-500 placeholder:font-normal focus:bg-white focus:border-orange-cruz/30 focus:ring-4 focus:ring-orange-500/5 outline-none transition-all duration-300 hover:bg-gray-100"
                />

                {searchTerm && (
                    <button 
                        onClick={() => setSearchTerm("")}
                        className="absolute inset-y-0 right-3 flex items-center group/btn cursor-pointer"
                    >
                        <div className="p-1 rounded-full bg-gray-200/50 group-hover/btn:bg-orange-cruz/10 transition-colors">
                            <X size={14} className="text-gray-500 group-hover/btn:text-orange-cruz" />
                        </div>
                    </button>
                )}
                {searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="p-2 uppercase text-[10px] font-black text-gray-400 tracking-widest border-b border-gray-50">
                            Sugerencias
                        </div>
                        {searchResults.map((product) => (
                            <button
                                key={product.product_code}
                                onClick={() => handleSelectProduct(product)}
                                className="w-full flex items-center gap-3 p-3 cursor-pointer hover:bg-orange-50 transition-colors text-left group"
                            >
                                <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-50">
                                    <img 
                                        src={product.images ? product.images[0] : product.image} 
                                        alt="" 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
                                    />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-sm font-bold text-gray-900 truncate">
                                        {product.name}
                                    </span>
                                    <span className="text-[10px] text-orange-cruz font-medium uppercase">
                                        En {product.subcategory}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

            </div>
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