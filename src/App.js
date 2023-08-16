import Login from './login';
import Home from './home';
import CreateStudent from './createStudent';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import UseToken from './hook/useToken';
import { useState } from 'react';
import useRFToken from './hook/useRFToken';
import { useEffect } from 'react';
function App() {
  const [isLoading, setIsLoading] = useState(true); // Thêm trạng thái loading
  const { isLogin, setIsLogin } = useRFToken(); // Sử dụng hook và nhận trạng thái và hàm cập nhật trạng thái
  const [user, setUser] = useState('');
  const { setAccessToken } = UseToken();

  useEffect(() => {
    console.log(isLogin)
  }, [isLogin]);

  const handleLoginSuccess = (userData) => {
    setUser(userData); // Cập nhật user thông tin
    setIsLogin(true); // Đánh dấu là đã đăng nhập
  };

  if (!isLogin) {
    return <Login setAccessToken={setAccessToken} setIsLogin={setIsLogin} />;
  }
  return (
    <Routes>
      <Route path="/login" element={<Home />} />
      <Route path="/home" element={<Home props={user} />} />
      <Route path="/create" element={<CreateStudent />} />
      <Route path="/" element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default App;
