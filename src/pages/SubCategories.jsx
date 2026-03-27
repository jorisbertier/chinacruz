import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import data from '../data/products.json';

const SubCategories = () => {
    const { categoryName } = useParams();

    const subCategories = [...new Set(
        data.products
            .filter(p => p.category === categoryName)
            .map(p => p.subcategory)
    )];

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex items-center gap-4 mb-10">
                <Link title="Volver" to="/categories" className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-4xl font-black uppercase tracking-tighter">
                    Subcategorías <span className="text-orange-cruz">{categoryName}</span>
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {subCategories.map((sub) => (
                    <Link 
                        key={sub}
                        to={`/categories/${categoryName}/${sub}`}
                        className="group relative h-48 overflow-hidden rounded-3xl bg-gray-100 flex items-center justify-center border-2 border-transparent hover:border-orange-cruz transition-all"
                    >
                        {/* Tu peux ajouter une image par défaut ou une logique d'image ici */}
                        <div className="text-center z-10">
                            <h3 className="text-2xl font-bold text-gray-800 group-hover:text-orange-cruz transition-colors">
                                {sub}
                            </h3>
                            <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold">Explorar</p>
                        </div>
                        {/* Effet de fond au survol */}
                        <div className="absolute inset-0 bg-orange-50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                ))}
                {subCategories.length === 0 && (
                    <div className="col-span-full py-20 text-center text-gray-400 font-bold italic">
                        No hay subcategorías disponibles.
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubCategories;