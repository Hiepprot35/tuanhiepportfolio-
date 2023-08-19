import UseToken from '../hook/useToken';
import { useState } from 'react';
import { Navigate  } from 'react-router-dom';
export  const LogOut=() =>{
    const LogoutClick=()=>
    {
     localStorage.removeItem("AccessToken")
     window.location.reload();
     document.cookie = 'RefreshToken=; Max-Age=0;secure';
     <Navigate to="/login" replace={true} />
        
    }
    return(
        
            <div>
            
            <button onClick={LogoutClick}>Logout</button>
            </div>
        
    )
        

}