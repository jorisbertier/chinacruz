import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = ({ children }: any) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="pt-24"> 
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;