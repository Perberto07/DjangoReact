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
        <Route path="/" element={<Login/>} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/customer" element={<ProtectedRoute><Customer/></ProtectedRoute>} />
          <Route path="/product" element={<ProtectedRoute><Product/></ProtectedRoute>} />
          <Route path="/transaction" element={<ProtectedRoute><Transactions/></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;