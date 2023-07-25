import { useState } from "react"

export default function LogOut({logout}) {
    const LogOutHandle = () => {
        logout();
        sessionStorage.removeItem("token")
    }
    return (
        <div className="LogoutElement">
            <button onClick={LogOutHandle}>
                LogOut
            </button>
        </div>
    )
}