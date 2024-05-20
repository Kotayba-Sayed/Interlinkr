import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";


const RequireAuth = () => {
    const { token } = useAuth();
    const location = useLocation();

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    } 
    // console.log("token username", token.username)

    return (
        <Outlet />
    )
}
    
export default RequireAuth;
