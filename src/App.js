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
import { IsLoading } from './components/Loading';
function App() {
  const [isLoading, setIsLoading] = useState(true); // Thêm trạng thái loading
  const { isLogin, setIsLogin } = useRFToken(); // Sử dụng hook và nhận trạng thái và hàm cập nhật trạng thái
  const [user, setUser] = useState('');
  const { setAccessToken } = UseToken();

  const ROLES = [1, 2]
  useEffect(() => {
    console.log(isLogin)
    setIsLoading(false);
  }, [isLogin]);

  if (isLoading) {
    return <IsLoading></IsLoading>
  }
  
  if(!isLoading)
  {
    if (isLogin) {
    return (
      <Routes>
        <Route element={<RequireAuth allowedRoles={ROLES} />}>
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/home" element={<Home props={user} />} />
          <Route path="/" element={<Navigate to="/home"></Navigate>} />
          <Route path="/create" element={<CreateStudent />} />
          <Route path="/*" element={<Navigate to="/"></Navigate>} />

        </Route>


      </Routes>
    );

  }
  else {

    return (


      <Routes>

        {/* <Route path="*" element={<Navigate to="/"></Navigate>} /> */}
        {/* <Route path="*" element={<IsLoading />} /> */}

        <Route path="/" element={<FistHomePage />} />
        <Route path="/login" element={<Login setAccessToken={setAccessToken} setIsLogin={setIsLogin} />} />
      </Routes>
    )

  }
  }
}

export default App;
