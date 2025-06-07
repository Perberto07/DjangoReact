// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/adminPanel/Dashboard';
import Home from './pages/home';
import Login from './pages/login';
import Customer from './pages/Customer/Customer';
import Product from './pages/Product/Product';
import Transactions from './pages/Transactions/Transactions';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
            <Dashboard />
            </ProtectedRoute>
            } />
          <Route path="/login" element={<Login/>} />
          <Route path="/customer" element={<Customer/>} />
          <Route path="/product" element={<Product/>} />
          <Route path="/transaction" element={<Transactions/>} />
      </Routes>
    </Router>
  );
}

export default App;