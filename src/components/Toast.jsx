import React, { useEffect, useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';

const Toast = ({ product, duration = 3000, onClose }) => {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const intervalTime = 10; 
        const step = (intervalTime / duration) * 100;
        
        const timer = setInterval(() => {
            setProgress((prev) => (prev <= 0 ? 0 : prev - step));
        }, intervalTime);

        const timeout = setTimeout(onClose, duration);

        return () => {
            clearInterval(timer);
            clearTimeout(timeout);
        };
    }, [duration, onClose]);

    return (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[92%] md:w-full md:max-w-md z-[9999] animate-in fade-in slide-in-from-bottom-6 duration-300">
            <div className="bg-white/95 text-gray-900 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden border border-gray-100 backdrop-blur-md">
                
                <div className="p-4 flex items-center gap-4">
                    <div className="w-14 h-14 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm">
                        <img 
                            src={product.image} 
                            alt="" 
                            className="w-full h-full object-cover" 
                        />
                    </div>

                    <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-2 text-green-600 mb-0.5">
                            <CheckCircle2 size={14} strokeWidth={3} />
                            <span className="text-[10px] font-black uppercase tracking-widest">Añadido con éxito</span>
                        </div>
                        <h4 className="text-sm font-bold text-gray-900 truncate leading-tight">
                            {product.name}
                        </h4>
                        <p className="text-[11px] text-gray-500 font-medium">
                            Cantidad: <span className="font-bold text-gray-900">{product.quantity}</span>
                        </p>
                    </div>

                    <button 
                        onClick={onClose} 
                        className="p-2 bg-gray-200 hover:bg-gray-100 rounded-full transition-colors group cursor-pointer"
                    >
                        <X size={18} className="text-black group-hover:text-gray-600" />
                    </button>
                </div>

                <div className="h-1.5 w-full bg-gray-100">
                    <div 
                        className="h-full bg-orange-cruz transition-none ease-linear" 
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Toast;