import { useState, useEffect } from 'react';
import UseToken from './useToken';
import { useAuth } from '../context/userContext'

export const useRefresh = () => {
  const { AccessToken, setAccessToken } = UseToken();
  const { user2, setUser2 } = useAuth();

  const refreshAccessToken = async () => {
      console.log(user2.MSSV)
      const response = await fetch('http://localhost:4000/api/rfAccessToken', {
        method: 'POST',
        credentials: 'include', // Đảm bảo gửi cookie khi gọi API
        headers:
        {
          'Authorization': `Bearer ${AccessToken} ${user2.MSSV}`,
          'MSSV':`${user2.MSSV}`

        }
      });

      const data = await response.json();
      return(data)
    };
    return refreshAccessToken

};
