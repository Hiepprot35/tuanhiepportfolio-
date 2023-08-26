import Login from './components/login';
import Home from './components/home';
import CreateStudent from './components/createStudent';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import UseToken from './hook/useToken';
import { useState } from 'react';
import useLogin from './hook/useLogin';
import { useEffect } from 'react';
import RequireAuth from './components/requireAuth';
import useAuth from './hook/useAuth';
import Dashboard from './components/Dashboard/Dashboard'
import FistHomePage from './components/Homepage/firstHomepage';
import { IsLoading } from './components/Loading';
import DangKiLopHoc from './components/dangkilophoc';
import Chuongtrinhdaotao from './chuongtrinhdaotao';
import { useRefresh } from './hook/useRefresh';
import ChatApp from './components/chatApp';
import io from 'socket.io-client';

function App() {

  const [isLoading, setIsLoading] = useState(true); // Thêm trạng thái loading
  const { isLogin, setIsLogin } = useLogin(); // Sử dụng hook và nhận trạng thái và hàm cập nhật trạng thái
  const [user, setUser] = useState('');
  const { auth } = useAuth()
  const { AccessToken, setAccessToken } = UseToken();
  const ROLES = [1, 2]
  useEffect(() => {
    setIsLoading(false);
  }, [isLogin]);
 
  const refreshAccessToken = useRefresh()
  useEffect(() => {
    async function fetchData() {
      try {
        const refreshedData = await refreshAccessToken();
        console.log(refreshedData)
        refreshedData.AccessToken ? setAccessToken(refreshedData.AccessToken) : console.log("OKE")

      } catch (error) {
        // Xử lý lỗi nếu cần
      }
    }


    fetchData();


  }, []);
  if (isLoading) {
    return <IsLoading></IsLoading>
  }

  if (!isLoading) {
    if (isLogin) {
      if (auth.role === 1) {

        return (
          <Routes>
            <Route element={<RequireAuth allowedRoles={ROLES} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dangkilop" element={<DangKiLopHoc />} />
              <Route path="/chuongtrinhdaotao" element={<Chuongtrinhdaotao />} />
              <Route path="/chat" element={<ChatApp />} />
              <Route path="/home" element={<Home  />} />
              <Route path="/" element={<Navigate to="/home"></Navigate>} />
              <Route path="/create" element={<CreateStudent />} />
              <Route path="/*" element={<Navigate to="/"></Navigate>} />
            </Route>
          </Routes>
        );
      }
      else if (auth.role === 2) {
        return (
          <Routes>
            <Route element={<RequireAuth allowedRoles={ROLES} />}>
              {/* <Route path="/" element={<Dashboard />} /> */}
              <Route path="/" element={<Home/>} />

            </Route>
          </Routes>
        )
      }
    }
    else {

      return (


        <Routes>
              <Route path="/chat" element={<ChatApp />} />

          <Route path="*" element={<Navigate to="/"></Navigate>} />
          {/* <Route path="*" element={<IsLoading />} /> */}
          <Route path="/create" element={<CreateStudent />} />

          <Route path="/" element={<FistHomePage />} />
          <Route path="/login" element={<Login setAccessToken={setAccessToken} setIsLogin={setIsLogin} />} />
        </Routes>
      )

    }
  }
}

export default App;
