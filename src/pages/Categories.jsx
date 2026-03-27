import { Link } from 'react-router-dom';
import BannerCarousel from '../components/BannerCarousel';
import { useState } from 'react';
import { Search } from 'lucide-react';
import test from '../assets/carousel/test.jpeg';

const categories = [
    { id: 1, name: 'Electrónica', img: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500', grid: 'md:col-span-2 md:row-span-2' },
    { id: 2, name: 'Moda', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500', grid: 'md:col-span-1 md:row-span-1' },
    { id: 3, name: 'Hogar', img: 'https://images.unsplash.com/photo-1484101403033-57105e2b77ca?w=500', grid: 'md:col-span-1 md:row-span-1' },
    { id: 4, name: 'Accesorios', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', grid: 'md:col-span-2 md:row-span-1' },
    { id: 5, name: 'Test', img: test, grid: 'md:col-span-1 md:row-span-2' },

];

const Categories = () => {

    const [searchTerm, setSearchTerm] = useState("");

    const filteredCategories = categories.filter((cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section className="px-6 max-w-7xl mx-auto">
        <div>
            <BannerCarousel />
        </div>
        <div className="mb-12 flex-row flex justify-between items-center">
            <div>
                <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Explora <span className="text-orange-cruz">el catálogo</span></h2>
                <p className="text-gray-500 mt-2">Encuentra exactamente lo que buscas.</p>
            </div>
            <div className="relative w-full md:w-80 group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Search size={18} className="text-gray-400 group-focus-within:text-orange-cruz transition-colors" />
                </div>
                <input
                    type="text"
                    placeholder="Buscar categoría..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-50 border-2 border-gray-100 py-3.5 pl-12 pr-4 rounded-2xl text-sm font-medium focus:bg-white focus:border-orange-cruz focus:ring-4 focus:ring-orange-500/10 outline-none transition-all shadow-sm"
                />
                {searchTerm && (
                    <button 
                        onClick={() => setSearchTerm("")}
                        className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-600"
                    >
                        <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-md">Esc</span>
                    </button>
                )}
            </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
                {filteredCategories.length > 0 ? (
                    filteredCategories.map((cat) => (
                        <Link 
                            to={`/categories/${cat.name}`} 
                            key={cat.id} 
                            className={`relative group overflow-hidden rounded-[2.5rem] shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${cat.grid}`}
                        >
                            <img 
                                src={cat.img} 
                                alt={cat.name} 
                                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                                <span className="text-orange-cruz text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                    Ver productos
                                </span>
                                <h3 className="text-white text-3xl font-bold tracking-tight">{cat.name}</h3>
                            </div>
                        </Link>
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center">
                        <p className="text-gray-400 font-medium text-lg">No encontramos ninguna categoría con "{searchTerm}"</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Categories;