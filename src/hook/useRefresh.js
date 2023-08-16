import { useState, useEffect } from 'react';
import UseToken from './useToken';
import { useAuth } from '../context/userContext'
import Cookies from "js-cookie";

export const useRefresh = () => {
  const { AccessToken, setAccessToken } = UseToken();
  const { user2, setUser2 } = useAuth();
  const cookieValue = Cookies.get("RefreshToken") || "";

  const refreshAccessToken = async () => {
    
      const response = await fetch('http://localhost:4000/api/rfAccessToken', {
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
      return(data)
    };
    return refreshAccessToken

};
