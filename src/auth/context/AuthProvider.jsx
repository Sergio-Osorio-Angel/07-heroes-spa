import { useReducer } from "react";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";
import { types } from "../types/types";

export function AuthProvider({ children }) {

    const initialState = {
        logged: false
    }

    function initializer() {
        const user = JSON.parse(localStorage.getItem('user'));
        return {
            logged: !!user,
            user: user
        }
    }

    const [authState, dispatch] = useReducer(authReducer, initialState, initializer);
    
    function login(id, username, password) {
        const user = {
            id: id,
            username: username
        }
        const action = {
            type: types.login,
            payload: {
                ...user,
                password: password
            }
        }
        localStorage.setItem('user', JSON.stringify(user));
        dispatch(action);
    }

    function logout(){
        localStorage.removeItem('user');
        const action = {
            type: types.logout
        }
        dispatch(action);
    }
    
    return (
        <AuthContext.Provider value={{ authState, login: login, logout:logout}}>
            {children}
        </AuthContext.Provider>
    )
}
