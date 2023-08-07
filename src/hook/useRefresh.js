import { useEffect } from 'react';
import UseToken from '../hook/useToken';

const UseRefresh = () => {
  const refreshAccessToken = async ({setAccessToken}) => {

    try {

      const response = await fetch('http://localhost:4000/api/rfAccessToken', {
        method: 'GET',
        credentials: 'include', // Đảm bảo gửi cookie khi gọi API
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setAccessToken(data.AccessToken); // Cập nhật AccessToken mới vào state
      return data.AccessToken;
    } catch (error) {
      console.log('Error:', error.message);
      return null;
    }
  };

  return refreshAccessToken;
};

export default UseRefresh;
