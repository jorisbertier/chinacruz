import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import data from '../data/products.json';
import ProductCard from "../components/ProductCard";

const ProductList = () => {
    const { categoryName, subCategoryName } = useParams();

    const displayedProducts = data.products.filter(p => 
        p.category === categoryName && p.subcategory === subCategoryName
    );


    return (
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
            <div className="flex items-center gap-3 mb-8">
                <Link to={`/categories/${categoryName}`} className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
                    <ArrowLeft size={20} />
                </Link>
                <h1 className="text-2xl md:text-4xl font-black text-orange-cruz uppercase italic tracking-tighter">
                    {subCategoryName}
                </h1>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
                {displayedProducts.length > 0 ? (
                    displayedProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <div className="col-span-full py-20 text-center text-gray-400 font-bold italic">
                        No hay productos en esta sección.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductList;