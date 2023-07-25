import Login from './login';
import ApiFetch from './apifetch';
import { useState } from 'react';
import CreateStudent from './createStudent';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import UseToken from './useToken';

function App() {
  const {token,setToken}=UseToken()
  if(!token) {
    return <Login setToken={setToken} />
  }
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<ApiFetch />} />
        <Route path="/create" element={<CreateStudent />} />

        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
  );
}

export default App;
