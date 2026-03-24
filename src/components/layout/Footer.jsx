import {  MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
            <div className='h-36 bg-yellow-300 bg-center px-6 rounded-[3rem] mx-6 mb-12 flex items-center justify-center text-center'>
                <h3 className='text-white text-2xl'>📍4to anillo y av. Beni (a lado de farmacorp)  📍3er anillo interno y Roca y Coronado (Central) 📍Av. Virgen de Luján y Calle 7
</h3>
            </div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">

            <div className="space-y-4">
                <h3 className="text-xl font-black tracking-tighter uppercase">
                    China<span className="text-orange-cruz">cruz</span>
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                    Producto calidaso a precios increíbles. ¡Tu tienda de confianza!
                </p>
            </div>

            <div>
            <h4 className="font-bold mb-6 text-gray-900">Navegación</h4>
            <ul className="space-y-4 text-sm text-gray-500">
                <li className="hover:text-orange-cruz cursor-pointer">Inicio</li>
                <li className="hover:text-orange-cruz cursor-pointer">Categorías</li>
                <li className="hover:text-orange-cruz cursor-pointer">Ofertas</li>
            </ul>
            </div>

            <div>
            <h4 className="font-bold mb-6 text-gray-900">Contacto</h4>
            <ul className="space-y-4 text-sm text-gray-500">
                <li className="flex items-center gap-3"><MapPin size={16}/> Santa Cruz, Bolivia</li>
                <li className="flex items-center gap-3"><Phone size={16}/> +591 900 000 000</li>
                <li className="flex items-center gap-3"><Mail size={16}/> info@chinacruz.com</li>
            </ul>
            </div>

            {/* <div>
            <h4 className="font-bold mb-6 text-gray-900">Newsletter</h4>
                <div className="flex flex-col gap-3">
                    <input 
                    type="email" 
                    placeholder="Tu email" 
                    className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                    <button className="bg-orange-cruz text-white py-2 rounded-xl text-sm font-bold hover:bg-orange-cruz transition-all">
                    Suscribirse
                    </button>
                </div>
            </div> */}
        </div>
        
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-50 text-center text-xs text-gray-400">
            © 2026 Chinacruz.
        </div>
        </footer>
    );
};

export default Footer;