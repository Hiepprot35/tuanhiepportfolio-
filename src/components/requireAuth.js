import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hook/useAuth";
import Dashboard from "./Dashboard/Dashboard";
import { useEffect } from "react";
import { useRefresh } from "../hook/useRefresh";
import UseToken from "../hook/useToken";
const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const refreshAccessToken = useRefresh()
    const { AccessToken, setAccessToken } = UseToken();

  
    return allowedRoles.includes(auth?.role) ? (
        <div>
            {auth?.role === 1 ? (
                <Outlet></Outlet>
) : null}
            {auth?.role === 2 ? (
                <Outlet></Outlet>

            ) : null}
        </div>
    ) : (
        console.log("ok")
    );
}

export default RequireAuth;