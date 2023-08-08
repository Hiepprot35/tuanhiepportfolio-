import Login from './login';
import Home from './home';
import CreateStudent from './createStudent';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import UseToken from './hook/useToken';
import { useState } from 'react';

function App() {
  const [user,setUser]=useState('');
  const {AccessToken, setAccessToken} = UseToken();
  if (!AccessToken) {
    return <Login setAccessToken={setAccessToken} />
  }
  return (
    <Routes>
      <Route path="/login" element={<Home />} />

      <Route path="/home" element={<Home />} />
      <Route path="/create" element={<CreateStudent />} />

      <Route path="/" element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default App;
