// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/home';
import Login from './pages/login';
import Customer from './pages/Customer/Customer';
import Product from './pages/Product/Product';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/customer" element={<Customer/>} />
          <Route path="/product" element={<Product/>} />
      </Routes>
    </Router>
  );
}

export default App;