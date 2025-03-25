import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import MapView from './MapView';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            SyncThreads Map App
          </Typography>
          {isLoggedIn && <Button color="inherit" onClick={handleLogout}>Logout</Button>}
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/" element={isLoggedIn ? <Dashboard /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/map/:cardId" element={isLoggedIn ? <MapView /> : <LoginPage setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </div>
  );
}

export default App;