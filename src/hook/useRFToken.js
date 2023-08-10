import { useState } from "react";


export default function UseRFToken() {
    const getRFToken = () => {
        const tokenString = localStorage.getItem('AccessToken');
        const userToken = JSON.parse(tokenString);
        return userToken
    }
    const [token, setRFToken] = useState(getRFToken())
    const saveToken = (userToken) => {
        localStorage.setItem('AccessToken', JSON.stringify(userToken));
        setToken(userToken)
    }
    
    return{
        AccessToken: token,
        setAccessToken:saveToken,
  }
} 