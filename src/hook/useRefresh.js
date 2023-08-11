import { useState, useEffect } from 'react';
import UseToken from './useToken';

export const useRefresh = () => {
  const { AccessToken, setAccessToken } = UseToken();
  console.log('Join Refresh')

  const refreshAccessToken = async () => {
    
      const response = await fetch('http://localhost:4000/api/rfAccessToken', {
        method: 'POST',
        credentials: 'include', // Đảm bảo gửi cookie khi gọi API
        headers:
        {
          'Authorization': `Bearer ${AccessToken}`
        }
      });

      const data = await response.json();
      return(data)
    };
    return refreshAccessToken

};
