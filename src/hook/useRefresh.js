import { useState, useEffect } from 'react';
import UseToken from './useToken';

export const useRefresh = () => {
  const { AccessToken, setAccessToken } = UseToken();
  const { user2, setUser2 } = useAuth();

  const refreshAccessToken = async () => {
    
      const response = await fetch('http://localhost:4000/api/rfAccessToken', {
        method: 'POST',
        credentials: 'include', // Đảm bảo gửi cookie khi gọi API
        headers:
        {
          'Authorization': `git ${AccessToken}`,
          'MSSV':`${user2.MSSV}`

        }
      });

      const data = await response.json();
      return(data)
    };
    return refreshAccessToken

};
