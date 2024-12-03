import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/panjaloga" element={<Panchaloga />} />
          <Route path="/rudh" element={<Rudraksha />} />
          <Route path="/karungali" element={<Karungali />} />
          <Route path="/statues" element={<Statues />} />
          <Route path="/puresilver" element={<PureSilver />} />
          <Route path="/maalai" element={<Maalai />} />
          <Route path="/admin" element={<AdminPanel />} />

          {/* Add other routes here */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
