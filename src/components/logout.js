import UseToken from '../hook/useToken';
import { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
export  const LogOut=() =>{
    const navigate=useNavigate()
    const LogoutClick=()=>
    {
     localStorage.removeItem("AccessToken")
     localStorage.removeItem("RefreshToken")

     window.location.reload();
     navigate("/home", { replace: true });
        
    }
    return(
        
            <div>
            
            <button  className="login_button" onClick={LogoutClick}>Logout</button>
            </div>
        
    )
        

}