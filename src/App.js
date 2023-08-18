import Login from './components/login';
import Home from './components/home';
import CreateStudent from './components/createStudent';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import UseToken from './hook/useToken';
import { useState } from 'react';
import useRFToken from './hook/useRFToken';
import { useEffect } from 'react';
import RequireAuth from './components/requireAuth';
import useAuth from './hook/useAuth';
import Dashboard from './components/Dashboard/Dashboard'
import FistHomePage from './components/Homepage/firstHomepage';
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
  const ROLES = [

    1,
    2
  ]
  
  // if (!isLogin) {
  //   return 
    
    
  //     <Login setAccessToken={setAccessToken} setIsLogin={setIsLogin} />;
    
  // }
  return (
    <Routes>
      <Route element={<RequireAuth allowedRoles={ROLES} />}>
        <Route path="/dashboard" element={<Dashboard  />} />

        <Route path="/home" element={<Home props={user} />} />
      </Route>

      <Route path="/create" element={<CreateStudent />} />
      <Route path="/" element={<FistHomePage />} />
      <Route path="/login" element={<Login setAccessToken={setAccessToken} setIsLogin={setIsLogin} />} />

    </Routes>
  );
}

export default App;
