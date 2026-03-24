import { ShoppingCart, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {

    const [quantity, setQuantity] = useState(1);

    const { addToCart } = useCart();

    return (
        <div className="group bg-white rounded-xl md:rounded-2xl border border-gray-100 p-2 md:p-3 hover:shadow-md transition-all animate-in fade-in zoom-in duration-300 flex flex-col h-full">

            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-50 mb-2">
                <img 
                    src={product.images[0]} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    alt={product.name}
                />
                {product.discount_price && (
                    <span className="absolute top-1.5 left-1.5 bg-red-500 text-white text-[7px] md:text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-tighter">
                        -{Math.round((1 - product.discount_price / product.price) * 100)}%
                    </span>
                )}
            </div>

            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-1 mb-3 border border-gray-100">
                <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 hover:bg-white cursor-pointer hover:text-orange-cruz rounded-md transition-all text-gray-400 active:scale-90"
                >
                <Minus size={12} />
                </button>
                <span className="text-xs font-black text-gray-900 w-8 text-center">{quantity}</span>
                <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 hover:bg-white cursor-pointer hover:text-orange-cruz rounded-md transition-all text-gray-400 active:scale-90"
                >
                    <Plus size={12} />
                </button>
            </div>

            <div className="flex flex-col flex-grow px-0.5">
                <div className="flex justify-between items-start mb-1 gap-1">
                    <span className="text-[7px] md:text-[9px] font-bold text-indigo-500 uppercase tracking-widest truncate">
                        {product.subcategory}
                    </span>
                    <span className="text-[10px] md:text-[8px] text-gray-400 font-medium flex items-center gap-0.5 whitespace-nowrap">
                        <span className="font-bold text-gray-500">Código:</span> {product.product_code}
                    </span>
                </div>

                <h3 className="text-[11px] md:text-sm font-bold text-gray-900 line-clamp-2 leading-tight mb-2 h-7 md:h-10">
                    {product.name}
                </h3>
                
                <div className="flex justify-between items-end mt-auto pt-2 border-t border-gray-50">
                    <div className="flex flex-col gap-0.5">
                        <div className="flex flex-col">
                            <span className="text-[7px] md:text-[9px] text-gray-400 font-bold uppercase leading-none">Precio Unidad</span>
                            <span className="text-[10px] md:text-sm font-bold text-gray-900">
                                {product.price.toFixed(2)} Bs
                            </span>
                        </div>

                        {product.discount_price && (
                            <div className="flex flex-col mt-0.5">
                                <span className="text-[7px] md:text-[9px] text-orange-500 font-black uppercase leading-none">Precio por Mayor</span>
                                <span className="text-xs md:text-base font-black text-orange-600">
                                    {product.discount_price.toFixed(2)} Bs
                                </span>
                            </div>
                        )}
                    </div>
                    
                    <button onClick={() => addToCart(product, quantity)} className="p-1.5 bg-gray-900 text-white cursor-pointer rounded-lg hover:bg-orange-600 transition-colors active:scale-90 shadow-sm">
                        <ShoppingCart size={12} className="md:w-4 md:h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;