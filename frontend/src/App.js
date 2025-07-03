// src/App.jsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/adminPanel/Dashboard';
import Home from './pages/home';
import Login from './pages/login';
import Customer from './pages/Customer/Customer';
import Product from './pages/Product/Product';
import Transactions from './pages/Transactions/Transactions';
import ProtectedRoute from './components/ProtectedRoute';
import TransactionPanel from './pages/adminPanel/Transaction/TransactionPanel';
import Reports from './pages/adminPanel/Report/Reports';
import TransactionDetailPage from './pages/Transactions/TransactionDetailPage';
import Category from './pages/adminPanel/Category/Category';
import Users from './pages/adminPanel/User/Users';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Route */}
        <Route path="/" element={<Login />} />
        
        {/* Main App Routes */}
        <Route path="/home" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        
        <Route path="/customer" element={
          <ProtectedRoute>
            <Customer />
          </ProtectedRoute>
        } />
        
        <Route path="/product" element={
          <ProtectedRoute>
            <Product />
          </ProtectedRoute>
        } />
        
        <Route path="/transaction" element={
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        } />
        
        <Route path="/transaction/:id" element={
          <ProtectedRoute>
            <TransactionDetailPage />
          </ProtectedRoute>
        } />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard/transaction-panel" element={
          <ProtectedRoute>
            <TransactionPanel />
          </ProtectedRoute>
        } />

        <Route path="/dashboard/Report" element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/category" element={
          <ProtectedRoute>
            <Category />
          </ProtectedRoute>
        } />
        <Route path="/dashboard/user" element={
          <ProtectedRoute>
            <Users/>
          </ProtectedRoute>
        } />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;