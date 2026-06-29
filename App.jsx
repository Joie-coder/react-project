import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import AboutUs from "./components/AboutUs";
import ProductList from "./components/ProductList";
import CartItem from "./components/CartItem";

import "./App.css";

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="overlay">
        <div className="content">

          <h1>Paradise Nursery</h1>

          <p>
            Welcome to Paradise Nursery, your one-stop shop for beautiful,
            healthy indoor plants that brighten every space.
          </p>

          <Link to="/products">
            <button className="get-started">
              Get Started
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            <>
              <LandingPage />
              <AboutUs />
            </>
          }
        />

        <Route
          path="/products"
          element={<ProductList />}
        />

        <Route
          path="/cart"
          element={<CartItem />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
