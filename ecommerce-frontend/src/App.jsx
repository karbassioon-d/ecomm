import './App.css'
import Home from './components/Home'
import Nav from './components/Nav'
import Product from './components/Product'
import MarketingPage from './components/MarketingPage';
import Cart from './components/cart';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
      <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/marketing" element={<MarketingPage />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
