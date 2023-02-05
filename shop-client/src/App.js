import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./public/home/Home";
import Navbar from "./public/home/Navbar";
import Footer from "./public/home/Footer";
import ItemDetails from "./components/ItemDetails";
import CartMenu from "./public/menu/CartMenu";
import WishMenu from "./public/menu/WishMenu";
import Checkout from "./public/checkout/Checkout";
import Confirmation from "./public/checkout/Confirmation";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="item/:itemId" element={<ItemDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout/success" element={<Confirmation />} />
        </Routes>
        <CartMenu />
        <WishMenu />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
