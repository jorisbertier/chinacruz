import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';
import productsData from '../data/products.json';

const ProductDetail = () => {
    const { productCode } = useParams();
    const navigate = useNavigate();

    const product = productsData.products.find(p => p.product_code === productCode);

    if (!product) {
        return <div className="py-20 text-center">Producto no encontrado</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
            <button 
                onClick={() => navigate(-1)} 
                className="flex items-center gap-2 text-gray-500 hover:text-orange-cruz mb-8 transition-colors"
            >
                <ArrowLeft size={20} />
                <span className="font-bold uppercase tracking-widest text-xs">Volver</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="rounded-[2.5rem] overflow-hidden bg-gray-50 shadow-xl border border-gray-100">
                    <img 
                        src={product.images ? product.images[0] : product.image} 
                        alt={product.name}
                        className="w-full h-full object-contain aspect-square hover:scale-105 transition-transform duration-500"
                    />
                </div>

                <div className="space-y-6">
                    <div>
                        <span className="text-orange-cruz font-black uppercase tracking-[0.2em] text-xs">
                            {product.subcategory}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mt-2 italic uppercase">
                            {product.name}
                        </h1>
                        <p className="text-gray-400 text-sm mt-1 font-mono">{product.product_code}</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="text-3xl font-black text-gray-900 italic">
                            {product.discount_price || product.price}€
                        </span>
                        {product.discount_price && (
                            <span className="text-xl text-gray-300 line-through font-bold">
                                {product.price}€
                            </span>
                        )}
                    </div>

                    <p className="text-gray-600 leading-relaxed text-lg">
                        {product.description}
                    </p>

                    <div className="pt-8 border-t border-gray-100">
                        <button className="w-full md:w-auto bg-orange-cruz text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-orange-600 transition-all active:scale-95 shadow-lg shadow-orange-500/20">
                            <ShoppingCart size={20} />
                            Añadir al carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;