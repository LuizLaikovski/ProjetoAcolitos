import { Navigate } from "react-router";
import type { JSX } from "react/jsx-dev-runtime";

interface ProtectedRouteProps {
    children: JSX.Element;
    canEdit?: boolean;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const token = localStorage.getItem('token');

    if (!token) return <Navigate to="/" replace />;

    return children
}

export default ProtectedRoute;