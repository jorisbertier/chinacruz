import { Link } from 'react-router-dom';

const categories = [
    { id: 1, name: 'Electrónica', img: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500', grid: 'md:col-span-2 md:row-span-2' },
    { id: 2, name: 'Moda', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500', grid: 'md:col-span-1 md:row-span-1' },
    { id: 3, name: 'Hogar', img: 'https://images.unsplash.com/photo-1484101403033-57105e2b77ca?w=500', grid: 'md:col-span-1 md:row-span-1' },
    { id: 4, name: 'Accesorios', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500', grid: 'md:col-span-2 md:row-span-1' },
];

const Categories = () => {
    return (
        <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="mb-12">
            <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">Explora <span className="text-orange-cruz">el catálogo</span></h2>
            <p className="text-gray-500 mt-2">Encuentra exactamente lo que buscas.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px]">
            {categories.map((cat) => (
            <Link 
                to={`/categories/${cat.name}`} 
                key={cat.id} 
                className={`relative group overflow-hidden rounded-[2rem] shadow-xl transition-all hover:-translate-y-2 ${cat.grid}`}
            >
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-8">
                <h3 className="text-white text-2xl font-bold">{cat.name}</h3>
                </div>
            </Link>
            ))}
        </div>
        </section>
    );
};

export default Categories;