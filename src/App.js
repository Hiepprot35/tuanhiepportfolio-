import Login from './login';
import Home from './home';
import { TestComponent } from './test';
import CreateStudent from './createStudent';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import UseToken from './hook/useToken';

function App() {
  const {AccessToken, setAccessToken} = UseToken();
  if (!AccessToken) {
    return <Login setAccessToken={setAccessToken} />
  }
  return (
    <Routes>
      <Route path="/login" element={<Home />} />
      <Route path="/test" element={<TestComponent />} />

      <Route path="/home" element={<Home />} />
      <Route path="/create" element={<CreateStudent />} />

      <Route path="/" element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default App;
