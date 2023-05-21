import './App.css';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Menu from './components/Menu';
import React, { useState, useEffect } from 'react'
import Cart from './components/Cart';
import Home from './components/Home';
import AppRounter
  from './components/AppRounter';
import Table from './components/Table';
import { MenuList } from './data/MenuList'

function App() {
  const [cartItems, setCartItems] = useState([]);
  const handleAddItem = (image, name, price) => {
    const ProductExist = cartItems.find((product) => product.name === name);
    if (ProductExist) {
      setCartItems(
        cartItems.map((product) => {
          if (name === product.name) {
            return { ...product, quantity: product.quantity + 1 };
          } else {
            return product;
          }
        })
      );
    } else {
      const newCartItem = [...cartItems, { image, name, price, quantity: 1 }];
      setCartItems(newCartItem);
    }
  };

  const handleRemoveProduct = (image, name, price) => {
    const ProductExist = cartItems.find((item) => item.name === name);
    if (ProductExist.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.name !== name))
    }
    else {
      setCartItems(
        cartItems.map((item) => {
          if (item.name === name) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        })
      );
    }
  }

  return (
    <div className="App">
      <Router>
        <AppRounter cartItems={cartItems}></AppRounter>
        <Header cartItems={cartItems}
        ></Header>
        <Routes>
          <Route path="/table" element={<Table />} />
          <Route path="/home" element={<Home />} />
          <Route path='/cart' element={<Cart
            cartItems={cartItems}
            handleAddItem={handleAddItem}
            handleRemoveProduct={handleRemoveProduct}
          />} />
          <Route path='/menu' element={<Menu
            handleAddItem={handleAddItem}
            cartItems={cartItems}
          />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
