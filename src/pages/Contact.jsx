const Contact = () => {
    return (
        <section className="py-20 px-6 bg-indigo-50/50">
        <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100 overflow-hidden flex flex-col md:flex-row">
            
            <div className="bg-indigo-600 p-12 text-white md:w-1/3 flex flex-col justify-between">
            <div>
                <h2 className="text-3xl font-bold mb-6 italic text-indigo-200">Chinacruz</h2>
                <p className="text-indigo-100 leading-relaxed">¿Tienes preguntas? Nuestro equipo está listo para ayudarte.</p>
            </div>
            <div className="space-y-4 text-sm font-medium">
                <p className="flex items-center gap-3"><Mail size={18}/> support@chinacruz.com</p>
                <p className="flex items-center gap-3"><Phone size={18}/> +34 900 123 456</p>
            </div>
            </div>

            {/* Form Side */}
            <div className="p-12 md:w-2/3">
            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase text-gray-400">Nombre</label>
                    <input type="text" className="border-b-2 border-gray-100 py-2 focus:border-indigo-600 outline-none transition-colors" placeholder="Tu nombre" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase text-gray-400">Email</label>
                    <input type="email" className="border-b-2 border-gray-100 py-2 focus:border-indigo-600 outline-none transition-colors" placeholder="tu@email.com" />
                </div>
                </div>
                <div className="flex flex-col gap-2">
                <label className="text-xs font-bold uppercase text-gray-400">Mensaje</label>
                <textarea rows="4" className="border-b-2 border-gray-100 py-2 focus:border-indigo-600 outline-none transition-colors resize-none" placeholder="¿En qué podemos ayudarte?"></textarea>
                </div>
                <button className="w-full bg-gray-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg active:scale-95">
                Enviar Mensaje
                </button>
            </form>
            </div>
        </div>
        </section>
    );
};

export default Contact;