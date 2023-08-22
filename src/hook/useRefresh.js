import { useState, useEffect } from 'react';
import UseToken from './useToken';
import useAuth from './useAuth';
import Cookies from "js-cookie";
import UseRfLocal from './useRFLocal';
export const useRefresh = () => {
  const {auth,setAuth}=useAuth()
  const { AccessToken, setAccessToken } = UseToken();
  const cookieValue = Cookies.get("RefreshToken") || "";
  const {RefreshToken}=UseRfLocal();
  const host=process.env.REACT_APP_DB_HOST;
  const tokenString = localStorage.getItem('RefreshToken');
  console.log(tokenString)
  const refreshAccessToken = async () => {
      const response = await fetch(`${host}/api/rfAccessToken`, {
        method: 'POST',
        credentials: 'include', // Đảm bảo gửi cookie khi gọi API
        headers:
        {
          'Authorization': `Bearer ${AccessToken}`,
          "RefreshToken": RefreshToken

        },
        body: JSON.stringify({
          "RefreshToken": "1"
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
