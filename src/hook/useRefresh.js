import { useState, useEffect } from 'react';
import UseToken from './useToken';
import useAuth from './useAuth';
import Cookies from "js-cookie";
import UseRfLocal from './useRFLocal';
export const useRefresh = () => {
  const { auth, setAuth } = useAuth()
  const { AccessToken, setAccessToken } = UseToken();
  const cookieValue = Cookies.get("RefreshToken") || "";
  const { RefreshToken } = UseRfLocal();
  const host = process.env.REACT_APP_DB_HOST;
  const refreshAccessToken = async () => {
    try {
      const response = await fetch(`${host}/api/rfAccessToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AccessToken}`,
          "RefreshToken": RefreshToken

        },
        body: JSON.stringify({
          "RefreshToken": RefreshToken
        })
      });

      if (!response.ok) {
        throw new Error('Refresh token request failed');
      }

      const data = await response.json();
      const { Role, UserID, Username } = data;
      setAuth({ role: Role, userID: UserID, username: Username });
      return data;
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle the error, perhaps by notifying the user or retrying
    }
  };
  return refreshAccessToken

};
