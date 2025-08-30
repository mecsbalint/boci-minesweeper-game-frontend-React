import { useEffect, useReducer } from "react";
import { createContext } from "react";
import { User } from "../types/User";

type AuthAction = 
    | {type: "LOGIN", payload: User}
    | {type: "LOGOUT"};

type AuthContextType = AuthState & {
    dispatch: React.Dispatch<AuthAction>
}

type AuthState = {
    user: User | null,
    isLoggedIn: boolean | null | "null"
} 

export const AuthContext = createContext<AuthContextType | null>(null);

export function authReducer(state : AuthState, action : AuthAction) {
    switch (action.type) {
        case "LOGIN":
            return {user: action.payload, isLoggedIn: true}
        case "LOGOUT":
            return {user: null, isLoggedIn: false}
        default:
            return state;
    }
}

export function AuthContextProvider({children} : React.PropsWithChildren) {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        isLoggedIn: null
    } as AuthState);

    useEffect(() => {
        let user : User | null; 
        
        const userStringified : string | null = localStorage.getItem("bmgUser");

        if (userStringified !== null) {
            user = JSON.parse(userStringified);
        } else {
            user = null;
        }
        
        if (user) {
            dispatch({type: "LOGIN", payload: user});
        } else {
            dispatch({type: "LOGOUT"})
        }
    }, []);

    console.log("AuthContext state: " + state);

    return (
        <AuthContext.Provider value={{...state, dispatch}} >
            {children}
        </AuthContext.Provider>
    )
}
