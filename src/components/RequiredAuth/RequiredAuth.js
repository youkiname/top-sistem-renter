import { Navigate, useLocation } from "react-router-dom";

export function RequireAuth({ children }) {
    const auth = localStorage.getItem("auth")
    let location = useLocation();

    if (!auth) {
        return <Navigate to="/auth" state={{ from: location }} replace />;
    } else {
        return children;
    }
}