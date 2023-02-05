import { useContext, useEffect } from "react"
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../auth"

export function PrivateRoute({ children }) {

    const { authState } = useContext(AuthContext);
    const { pathname, search } = useLocation();

    useEffect(() => {
        const lastPath = pathname + search;
        localStorage.setItem('lastPath', lastPath);
    }, [pathname, search])
    
    return (authState.logged)
        ? children
        : <Navigate to="/login"></Navigate>
}
