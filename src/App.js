import Login from './login';
import Home from './home';
import CreateStudent from './createStudent';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import UseToken from './useToken';

function App() {
  console.log("a")
  const { token, setToken } = UseToken()
  if (!token) {
    return <Login setToken={setToken} />
  }
  return (
    <Routes>
      {/* <Route path="/login" element={<Home />} /> */}

      <Route path="/home" element={<Home />} />
      <Route path="/create" element={<CreateStudent />} />

      <Route path="/" element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default App;
