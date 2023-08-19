import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function useRFToken() {
  const [isLogin, setIsLogin] = useState(); // Trạng thái đăng nhập

  const checkRF = async () => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    
    const cookieValue = Cookies.get("RefreshToken") || "";
    
    try {
      const fetchApi = await fetch('http://localhost:4000/api/getRefreshToken',{
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          "RefreshToken": cookieValue
        })
      });
      
      if (fetchApi.status === 200) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    } catch (error) {
      console.error("Error fetching Refresh Token:", error);
      setIsLogin(false);
    }
  };
  
  useEffect(() => {
    checkRF();
  }, []); // [] để đảm bảo chỉ chạy một lần sau khi component mount

  return {isLogin,setIsLogin};
}
