import UseToken from './hook/useToken';
import { useState } from 'react';
export  const LogOut=() =>{
    const LogoutClick=()=>
    {
     localStorage.removeItem("AccessToken")
     window.location.reload();
     document.cookie = 'tokenRefresh=; Max-Age=0;secure';
        
    }
    return(
        
            <div>
            
            <button onClick={LogoutClick}>Logout</button>
            </div>
        
    )
        

}