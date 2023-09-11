import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import UseRfLocal from "./useRFLocal";
import { useRefresh } from "./useRefresh";
export default function useLogin() {
  const [isLogin, setIsLogin] = useState(); // Trạng thái đăng nhập
  const {RefreshToken}=UseRfLocal()
  const checkRF = async () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    const host =process.env.REACT_APP_DB_HOST
    const cookieValue = Cookies.get("RefreshToken") || "";
    
    try {
      const fetchApi = await fetch(`${host}/api/getRefreshToken`,{
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          "RefreshToken": RefreshToken
        })
      });
      
      if (fetchApi.status === 200) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    } catch (error) {
      setIsLogin(false);
    }
  };
  
  useEffect(() => {
    checkRF();
  }, []); // [] để đảm bảo chỉ chạy một lần sau khi component mount

  return {isLogin,setIsLogin};
}
