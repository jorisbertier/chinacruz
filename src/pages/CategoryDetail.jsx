import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import data from '../data/products.json';
import ProductCard from "../components/ProductCard";

const CategoryDetail = () => {
    const { categoryName } = useParams();
    const [selectedSub, setSelectedSub] = useState(null);

    const baseProducts = data.products.filter(p => p.category === categoryName);
    const subCategories = [...new Set(baseProducts.map(p => p.subcategory))];

    const displayedProducts = selectedSub 
        ? baseProducts.filter(p => p.subcategory === selectedSub)
        : baseProducts;

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
            <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-10">
                <Link to="/categories" className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-2xl md:text-4xl font-black uppercase italic tracking-tighter">
                    {categoryName} <span className="text-orange-cruz">Cruz</span>
                </h1>
            </div>

            <div className="flex gap-2 md:gap-4 mb-8 md:mb-12 overflow-x-auto pb-2 no-scrollbar">
                <button 
                    onClick={() => setSelectedSub(null)}
                    className={`px-4 md:px-6 py-2 rounded-full cursor-pointer text-[10px] md:text-sm font-bold transition-all border ${
                        selectedSub === null 
                        ? 'bg-orange-cruz text-white border-orange-cruz shadow-md shadow-orange-200' 
                        : 'bg-white text-gray-600 border-gray-100 hover:border-orange-cruz'
                    }`}
                >
                    Todos
                </button>
                {subCategories.map(sub => (
                    <button 
                        key={sub} 
                        onClick={() => setSelectedSub(sub)}
                        className={`px-4 md:px-6 py-2 rounded-full cursor-pointer text-[10px] md:text-sm font-bold transition-all border whitespace-nowrap ${
                            selectedSub === sub 
                            ? 'bg-orange-cruz text-white border-orange-cruz shadow-md shadow-orange-200' 
                            : 'bg-white text-gray-600 border-gray-100 hover:border-orange-cruz'
                        }`}
                    >
                        {sub}
                    </button>
                ))}
            </div>
                        

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                {displayedProducts.length > 0 ? (
                    displayedProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center text-gray-400 font-bold italic">
                        No hay productos :(
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryDetail;