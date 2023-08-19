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

    useEffect(() => {
        async function fetchData() {
            try {
                const refreshedData = await refreshAccessToken();
                refreshedData.AccessToken ? setAccessToken(refreshedData.AccessToken) : console.log("OKE")

                // Tiếp tục xử lý dữ liệu sau khi làm mới access token
            } catch (error) {
                // Xử lý lỗi nếu cần
            }
        }

        fetchData();

    }, []);
  
    return allowedRoles.includes(auth?.role) ? (
        <div>
            {auth?.role === 1 ? (
                // Thực hiện hành động khi vai trò là 1 (ví dụ: hiển thị nội dung cho vai trò 1)
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