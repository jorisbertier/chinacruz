import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Categories from './pages/Categories';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import './App.css';
import Home from './pages/Home';
import CategoryDetail from './pages/CategoryDetail';
import ScrollToTop from './components/ScrollTop';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <MainLayout>
          <ScrollToTop />
          <Routes>

            <Route path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:categoryName" element={<CategoryDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
            
            <Route path="*" element={<div className="py-20 text-center font-bold">404 | No encontrado</div>} />
          </Routes>
        </MainLayout>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;