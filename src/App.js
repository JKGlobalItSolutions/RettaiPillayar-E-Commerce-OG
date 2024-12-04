import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Import components
import Header from "./Components/Header/Header";
import Home from './Pages/Home';
import About from './Pages/About';
import AdminPanel from './Admin/AdminPanel';
import Panchaloga from './Pages/Panchaloga';
import Rudraksha from './Pages/Rudraksha';
import Karungali from './Pages/Karungali';
import Statues from './Pages/Statues';
import PureSilver from './Pages/PureSilver';
import Maalai from './Pages/Maalai';

// Import auth context
import { AuthProvider, useAuth } from './Auth/AuthContext';
import Login from './Admin/Login';

// PrivateRoute component
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return user ? (
    <>
     
      {children}
    </>
  ) : (
    <Navigate to="/login" />
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
            <Route path="/panjaloga" element={<PrivateRoute><Panchaloga /></PrivateRoute>} />
            <Route path="/rudh" element={<PrivateRoute><Rudraksha /></PrivateRoute>} />
            <Route path="/karungali" element={<PrivateRoute><Karungali /></PrivateRoute>} />
            <Route path="/statues" element={<PrivateRoute><Statues /></PrivateRoute>} />
            <Route path="/puresilver" element={<PrivateRoute><PureSilver /></PrivateRoute>} />
            <Route path="/maalai" element={<PrivateRoute><Maalai /></PrivateRoute>} />
            <Route path="/admin" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

