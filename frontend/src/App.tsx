
import './App.css'
import { BrowserRouter as Router, Route,Routes } from "react-router-dom";
import React from 'react'
import LoginPage from './components/LoginPage'
import RegisterPage from './components/RegisterPage'
import InvoiceGenerator from './components/InvoiceGenerator';
import InvoicesList from './components/InvoicesList';

const App = () => {
  return (
    <div>
     <Router>
      <Routes>
      <Route path="/" Component={InvoiceGenerator} />
      <Route path="/invoices" Component={InvoicesList} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/register" Component={RegisterPage} />
      </Routes>
    </Router>
    </div>
  )
}

export default App
