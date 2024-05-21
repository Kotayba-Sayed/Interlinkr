import { useNavigate, Outlet } from 'react-router-dom';
import { useUsername } from '../context/UserContext';
import { useAuth } from '../context/AuthProvider';

const ProtectedRoute = () => {
    const { username } = useUsername();
    const { setToken } = useAuth();
    const { setUsername } = useUsername();
    const navigate = useNavigate();

    const handleLogout = () => {
        setToken();
        setUsername();
        navigate("/", { replace: true });
    };

    console.log(username)
    console.log(username === 'admin')
    return (
        username === 'admin' ? <Outlet /> : handleLogout()
    );

};

export default ProtectedRoute;
