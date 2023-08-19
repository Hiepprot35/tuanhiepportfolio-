import UseToken from '../hook/useToken';
import { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
export  const LogOut=() =>{
    const navigate=useNavigate()
    const LogoutClick=()=>
    {
     localStorage.removeItem("AccessToken")
     window.location.reload();
     document.cookie = 'RefreshToken=; Max-Age=0;secure';
     navigate("/login", { replace: true });
        
    }
    return(
        
            <div>
            
            <button  className="login_button" onClick={LogoutClick}>Logout</button>
            </div>
        
    )
        

}