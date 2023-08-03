import { useState } from "react";


export default function UseToken() {
  

    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        console.log("render count: " )
        return userToken?.token
    }
    const [token, setToken] = useState(getToken())
    const saveToken = (userToken) => {
        console.log(saveToken)
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token)
    }
    const removeToken = () => {
        console.log("remove token")
        localStorage.removeItem("token")

    }
    return{
        setToken:saveToken,
        token: token,
        deleteToken:removeToken
  }
} 