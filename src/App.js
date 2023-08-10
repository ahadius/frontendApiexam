import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar.jsx';
import Login from './components/login.jsx';
import Activity from './components/Activity.jsx';
import AddActivity from './components/AddActivity.jsx';
import Home from './components/Home.jsx';
import State from './context/state.js';
const App = () => {
  const [loggedin, setLoggedin] = useState(false);
  const [role, setrole] = useState("user")

  useEffect(() => {
    const secretLoginToken = localStorage.getItem('secret-login-token');
    const role = localStorage.getItem('secret-login-info');
    setLoggedin(secretLoginToken !== null);
    setrole(role)
  }, []);

  return (
    <div className="appbody">
      <State>
        <Router>

          {!loggedin ? (
            <Routes>
              <Route path="*" element={<Login />} />
            </Routes>

          ) : (
            <>
              <Navbar />
              <Routes>
                {role === "admin" ? (
                  <>
                    <Route path="/home" element={<Home />} />
                    <Route path="/add" element={<AddActivity />} />
                  </>
                ):(
                  <>
                  <Route path="/home" element={<Home />} />
                  <Route path="/" element={<Activity />} />
                </>
                )}
              </Routes>
            </>
          )}


        </Router>
      </State>
    </div>
  );
};

export default App;

