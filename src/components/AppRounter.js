import { BrowserRouter as Router, Routes, Route, Redirect, useNavigate, Navigate } from 'react-router-dom'
import React from 'react'

function AppRounter({ cartItems }) {
  
  return (
    <Routes>
      {/* <Route path="/*" element={localStorage.getItem("accessToken") ? <Admin cartItems={cartItems} /> : <Navigate to="/login" />} /> */}
      <Route path='/login' element={<Login />} />
    </Routes>
  );
}

function Admin({ cartItems }) {
  const navigate = useNavigate();
  const [items, setItems] = React.useState(cartItems);

  function logout() {
    setItems({});
    localStorage.removeItem("accessToken")
    navigate("/login", { replace: true });
  }
  return <div>
    <h2>
      Admin
    </h2>
    <button onClick={logout}>Logout</button>
  </div>
}

function Login() {
  const navigate = useNavigate();
  function login() {
    localStorage.setItem("accessToken", true)
    navigate("/home", { replace: true });
  }

  return (
    <div>
      <h2>Login</h2>
      <button onClick={login}>Login</button>
    </div>
  );


}

export default AppRounter