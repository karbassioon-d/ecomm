import './App.css'
import Home from './components/Home'
import Nav from './components/Nav'
import Products from './components/Products'
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
          <Route path="/products" element={<Products />} />
          <Route path="/marketing" element={<MarketingPage />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
