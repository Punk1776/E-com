import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { Shop } from "./pages/shop/shop";
import { About } from "./components/About";
import { Cart } from "./pages/cart/cart";
import { ShopContextProvider } from "./context/shop-context";
import ProductList from './components/ProductList';
import SignUp from "./pages/signup/signup";
import Login from "./pages/login/login";

function App() {
  return (
    <div className="App">
      <ShopContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/About" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            {/* Update the routes for login and signup */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/products/:id" element={<ProductList />} />
            <Route path="/products" element={<ProductList />} />
          </Routes>
        </Router>
      </ShopContextProvider>
    </div>
  );
}

export default App;
