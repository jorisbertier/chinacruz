import { Trash2, Plus, Minus, Hash } from 'lucide-react';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
    return (
        <div className="flex items-center gap-3 md:gap-6 p-3 md:p-5 bg-white border border-gray-100 rounded-[1.5rem] md:rounded-[2rem] hover:shadow-lg transition-all group">
            {/* Image */}
            <div className="w-20 h-20 md:w-28 md:h-28 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>

            {/* Détails */}
            <div className="flex-grow min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className="hidden md:block text-[9px] font-bold uppercase text-orange-cruz tracking-widest">
                        {item.subcategory}
                    </span>
                    <span className="text-[8px] text-gray-400 font-mono flex items-center gap-0.5">
                        <Hash size={8} /> {item.product_code}
                    </span>
                </div>
                
                <h3 className="text-sm md:text-lg font-bold text-gray-900 truncate leading-tight">
                    {item.name}
                </h3>
                
                <p className="font-black text-orange-cruz mt-1 text-sm md:text-base">
                    {item.price.toFixed(2)} Bs
                </p>
            </div>

            <div className="flex flex-col items-end gap-3">
                <button 
                    onClick={() => onRemove(item.product_code)}
                    className="text-gray-300 hover:text-red-500 transition-colors p-1"
                >
                    <Trash2 size={18} />
                </button>
                
                <div className="flex items-center bg-gray-50 rounded-lg md:rounded-full p-1 border border-gray-100 shadow-sm">
                    <button 
                        onClick={() => onUpdateQuantity(item.product_code, -1)}
                        className="p-1 md:p-2 text-gray-400 hover:text-orange-cruz transition-colors"
                        disabled={item.quantity <= 1}
                    >
                        <Minus size={14}/>
                    </button>
                    
                    <span className="w-6 text-center font-bold text-xs md:text-sm text-gray-900">
                        {item.quantity}
                    </span>
                    
                    <button 
                        onClick={() => onUpdateQuantity(item.product_code, 1)}
                        className="p-1 md:p-2 text-gray-400 hover:text-orange-cruz transition-colors"
                    >
                        <Plus size={14}/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;