import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home';
import Login from './components/Login';
import UserLanding from './components/User/UserLanding';
import Admin from './components/Admin/Admin';
import ManageUsers from './components/Admin/ManageUsers';

function App() {
  return (
    <Router>
      <div className="Wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin/>}>
          <Route path="users" element={<ManageUsers/>}/>
          </Route>
          <Route path="/user" element={<UserLanding/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
