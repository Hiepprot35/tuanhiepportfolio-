import { useState, useEffect } from 'react';
import UseToken from './useToken';
import useAuth from './useAuth';
import Cookies from "js-cookie";

export const useRefresh = () => {
  const {auth,setAuth}=useAuth()
  const { AccessToken, setAccessToken } = UseToken();
  const cookieValue = Cookies.get("RefreshToken") || "";

  const refreshAccessToken = async () => {
    
      const response = await fetch('https://tuanhiepprot3api.onrender.com/api/rfAccessToken', {
        method: 'POST',
        credentials: 'include', // Đảm bảo gửi cookie khi gọi API
        headers:
        {
          'Authorization': `Bearer ${AccessToken}`
        },
        body: JSON.stringify({
          "RefreshToken": cookieValue
        })
      });

      const data = await response.json();
      const role=data.Role
      const userID=data.UserID
      const username=data.Username
      console.log(data)
      setAuth({role,userID,username})
      return(data)
    };
    return refreshAccessToken

};
