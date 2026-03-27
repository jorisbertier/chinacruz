import { useEffect, useMemo, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    ShoppingCart, Menu, X, ChevronRight, Search, 
    MapPin, MessageSquare, BookOpen, Heart, 
    User, HelpCircle, ChevronLeft 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/logoLetritaWhite.png';
import productsData from '../../data/products.json';

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeMegaMenu, setActiveMegaMenu] = useState(false);
    const [mobileStep, setMobileStep] = useState('main');
    const navigate = useNavigate();

    // --- CART ---
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

    // --- CATEGORY (Exract from JSON) ---
    const categoriesData = useMemo(() => {
        if (!productsData?.products) return [];
        const cats = {};
        productsData.products.forEach(p => {
            if (p.category) {
                if (!cats[p.category]) cats[p.category] = new Set();
                if (p.subcategory) cats[p.category].add(p.subcategory);
            }
        });
        return Object.keys(cats).map(cat => ({
            name: cat,
            subcategories: Array.from(cats[cat])
        }));
    }, []);

    // --- SEARCH RESULTS ---
    const searchResults = useMemo(() => {
        if (!searchTerm.trim() || !Array.isArray(productsData?.products)) return [];
        return productsData.products
            .filter(product => 
                product?.name?.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .slice(0, 7);
    }, [searchTerm]);

    const handleSelectProduct = (productCode) => {
        setSearchTerm("");
        navigate(`/product/${productCode}`);
    };

    return (
        <nav className="fixed w-full z-[100] shadow-lg font-sans">
            <div className="bg-orange-cruz text-white relative z-50">
                <div className="max-w-7xl mx-auto px-4 h-20 flex justify-between items-center gap-6">
                    <Link to="/" className="flex-shrink-0">
                        <img src={logo} alt="Logo" className="h-12 sm:h-12 md:h-14 w-auto object-contain" />
                    </Link>

                    {/* Barre de recherche (Desktop) */}
                    <div className="hidden md:flex flex-1 justify-center px-4">
                        <motion.div 
                            initial={false}
                            animate={{ width: searchTerm || isOpen ? "100%" : "90%" }}
                            className="relative w-full max-w-xl group"
                        >
                            {/* Conteneur principal */}
                            <div className="relative flex items-center">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search 
                                        size={18} 
                                        className="text-gray-400 group-focus-within:text-orange-cruz transition-colors duration-300" 
                                    />
                                </div>

                                <input
                                    type="text"
                                    placeholder="Buscar productos..."
                                    value={searchTerm}
                                    onFocus={() => setIsOpen(true)}
                                    onBlur={() => setIsOpen(false)}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-white border border-transparent py-2.5 pl-11 pr-10 rounded-2xl text-sm text-gray-800 placeholder:text-gray-400 
                                            focus:bg-[#f2f2f7] focus:ring-2 focus:ring-black/5 focus:outline-none 
                                            shadow-sm focus:shadow-xl transition-all duration-300 ease-out"
                                />

                                {/* Bouton X interactif */}
                                <AnimatePresence>
                                    {searchTerm && (
                                        <motion.button
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.5 }}
                                            onClick={() => setSearchTerm("")}
                                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer transition-opacity"
                                        >
                                            <div className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-500 transition-colors">
                                                <X size={14} strokeWidth={3} />
                                            </div>
                                        </motion.button>
                                    )}
                                </AnimatePresence>
                            </div>

                            <AnimatePresence>
                                {searchTerm && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-gray-100 z-50"
                                    >
                                        <div className="p-2 text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4 pt-4">
                                            Resultados sugeridos
                                        </div>
                                        <div className="py-2">
                                            {searchResults.map((product) => (
                                                <button 
                                                    key={product.product_code} 
                                                    onClick={() => handleSelectProduct(product.product_code)}
                                                    className="w-full flex items-center gap-4 px-4 py-3 hover:bg-orange-50 transition-colors text-left group/item"
                                                >
                                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-100">
                                                        <img src={product.images[0]} alt="" className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-gray-800 group-hover/item:text-orange-cruz transition-colors">{product.name}</span>
                                                        <span className="text-[10px] text-gray-400 font-medium uppercase">{product.category}</span>
                                                    </div>
                                                    <ChevronRight size={14} className="ml-auto text-gray-300 opacity-0 group-hover/item:opacity-100 transition-all transform translate-x-[-10px] group-hover/item:translate-x-0" />
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    <div className="flex items-center gap-3 md:gap-6">
                        {/* <div className="hidden lg:flex flex-col items-center group cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
                            <Heart size={22} className="group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] mt-1 font-bold uppercase tracking-tighter">Deseos</span>
                        </div>
                        <div className="hidden lg:flex flex-col items-center group cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
                            <User size={22} className="group-hover:scale-110 transition-transform" />
                            <span className="text-[10px] mt-1 font-bold uppercase tracking-tighter">Mi Cuenta</span>
                        </div>
                         */}
                        <Link to="/cart" className="relative flex flex-col items-center group">
                            <div className="relative p-1">
                                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 md:h-6" />
                                <span className="absolute -top-1 -right-2 bg-yellow-400 text-orange-cruz text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-orange-cruz shadow-lg">
                                    {cartCount}
                                </span>
                            </div>
                            <span className="hidden sm:block text-[16px] mt-1 font-bold">Carrito</span>
                        </Link>

                        {/* Burger Menu Mobile */}
                        <button className="md:hidden cursor-pointer p-2 hover:bg-white/10 rounded-lg transition-colors" onClick={() => setIsOpen(true)}>
                            <Menu className="w-7 h-7" />
                        </button>
                    </div>
                </div>
            </div>

            {/* --- SECTION SUB-NAVBAR --- */}
            <div className="hidden md:block bg-white border-b border-gray-100 relative z-40">
                <div className="max-w-7xl mx-auto px-4 h-12 flex items-center gap-10">
                    <button 
                        onMouseEnter={() => setActiveMegaMenu(true)}
                        className={`flex items-center cursor-pointer gap-2 h-full font-bold text-[16px] transition-all border-b-2 ${activeMegaMenu ? 'text-orange-cruz border-orange-cruz' : 'text-black border-transparent hover:text-orange-cruz'}`}
                    >
                        <Menu size={18} /> Ver Categorías
                    </button>
                    
                    <div className="flex items-center gap-8">
                        <Link to="/sucursales" className="flex items-center gap-2 text-black text-[16px] font-bold hover:text-orange-cruz transition-colors">
                            <MapPin size={18}/> Sucursales
                        </Link>
                        <Link to="/contact" className="flex items-center gap-2 text-black text-[16px] font-bold hover:text-orange-cruz transition-colors">
                            <MessageSquare size={18}/> Contacto
                        </Link>
                    </div>

                    <div className="ml-auto flex items-center gap-2 text-black text-[11px] font-black uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                        <HelpCircle size={14} /> Ayuda en línea
                    </div>
                </div>
            </div>

            {/* --- MEGA MENU DESKTOP --- */}
            <AnimatePresence>
                {activeMegaMenu && (
                    <div className="hidden md:block" onMouseLeave={() => setActiveMegaMenu(false)}>
                        <motion.div 
                            initial={{ opacity: 0, y: -10 }} 
                            animate={{ opacity: 1, y: 0 }} 
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute left-0 w-full bg-white shadow-2xl border-t border-gray-100 z-30"
                        >
                            <div className="max-w-7xl mx-auto p-10 grid grid-cols-4 lg:grid-cols-5 gap-10">
                                {categoriesData.map((cat, idx) => (
                                    <div key={idx} className="flex flex-col gap-4">
                                        <h3 className="font-black text-gray-900 border-b-2 border-orange-cruz/20 pb-2 text-[12px] uppercase tracking-wider italic flex items-center justify-between">
                                            {cat.name}
                                            <ChevronRight size={14} className="text-orange-cruz" />
                                        </h3>
                                        <ul className="flex flex-col gap-2.5">
                                            {cat.subcategories.map((sub, sIdx) => (
                                                <li key={sIdx}>
                                                    <Link 
                                                        to={`/category/${cat.name}/${sub}`} 
                                                        onClick={() => setActiveMegaMenu(false)}
                                                        className="text-gray-500 hover:text-orange-cruz text-[13px] font-medium transition-all hover:translate-x-1 inline-block"
                                                    >
                                                        {sub}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                        <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] -z-10" />
                    </div>
                )}
            </AnimatePresence>

            {/* --- MOBILE MENU LATERAL--- */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 z-[110] backdrop-blur-sm md:hidden"
                        />

                        <motion.div 
                            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 240 }}
                            className="fixed inset-y-0 left-0 w-[85%] max-w-xs bg-white z-[120] shadow-2xl flex flex-col md:hidden"
                        >
                            <div className="p-5 bg-orange-cruz text-white flex items-center justify-between">
                                {mobileStep === 'categories' ? (
                                    <button onClick={() => setMobileStep('main')} className="flex cursor-pointer items-center gap-2 font-black uppercase text-sm">
                                        <ChevronLeft size={20} /> Volver
                                    </button>
                                ) : (
                                    <span className="font-black italic tracking-tighter text-lg tracking-widest">MENU</span>
                                )}
                                <button onClick={() => {setIsOpen(false); setMobileStep('main');}} className="p-1.5 bg-white/20 rounded-full">
                                    <X size={20}/>
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto bg-white">
                                {mobileStep === 'main' ? (
                                    <div className="flex flex-col py-2">
                                        <div className="px-5 py-4">
                                            <div className="relative">
                                                <input 
                                                    type="text" 
                                                    placeholder="¿Qué estás buscando?" 
                                                    className="w-full bg-gray-100 rounded-lg py-3 px-10 text-sm focus:outline-none border border-gray-200"
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                />
                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            </div>
                                        </div>

                                        <button 
                                            onClick={() => setMobileStep('categories')} 
                                            className="flex items-center justify-between cursor-pointer px-6 py-5 border-b border-gray-50 font-black text-gray-800 uppercase text-[12px] tracking-widest active:bg-orange-50"
                                        >
                                            <span className="flex items-center gap-3"><Menu size={18} className="text-orange-cruz"/> Categorías</span>
                                            <ChevronRight size={18} className="text-gray-300" />
                                        </button>
                                        
                                        <Link to="/sucursales" className="flex items-center gap-3 px-6 py-5 border-b border-gray-50 font-black text-gray-800 uppercase text-[12px] tracking-widest">
                                            <MapPin size={18} className="text-orange-cruz"/> Sucursales
                                        </Link>
                                        <Link to="/contact" className="flex items-center gap-3 px-6 py-5 border-b border-gray-50 font-black text-gray-800 uppercase text-[12px] tracking-widest">
                                            <MessageSquare size={18} className="text-orange-cruz"/> Contacto
                                        </Link>
                                    </div>
                                ) : (
                                    <motion.div 
                                        initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                                        className="flex flex-col"
                                    >
                                        {categoriesData.map((cat, idx) => (
                                            <div key={idx} className="border-b border-gray-100">
                                                <div className="px-6 py-4 bg-gray-50/80 font-black text-orange-cruz text-[11px] uppercase tracking-[0.2em] border-l-4 border-orange-cruz">
                                                    {cat.name}
                                                </div>
                                                {cat.subcategories.map((sub, sIdx) => (
                                                    <Link 
                                                        key={sIdx} 
                                                        to={`/category/${cat.name}/${sub}`} 
                                                        onClick={() => setIsOpen(false)}
                                                        className="flex items-center justify-between px-8 py-4 active:bg-orange-50 border-b border-gray-50 last:border-0"
                                                    >
                                                        <span className="text-gray-700 font-bold text-sm">{sub}</span>
                                                        <ChevronRight size={14} className="text-gray-300" />
                                                    </Link>
                                                ))}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;