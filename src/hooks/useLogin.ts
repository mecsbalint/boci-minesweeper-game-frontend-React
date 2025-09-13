import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/userService";
import {useAuthContext} from "./useAuthContext";
import { useState } from "react";
import { UserLogin, User } from "../types/User";
import { ExceptionResponseBody } from "../types/Exception";

type UseLoginResult = {
    errorEmail: string,
    errorPassword: string,
    isLoading: boolean | null,
    login: (submitObj: UserLogin) => Promise<void>
};

export function useLogin() : UseLoginResult {
    const [isLoading, setIsLoading] = useState<boolean | null>(null);
    const [errorEmail, setErrorEmail] = useState<string>("");
    const [errorPassword, setErrorPassword] = useState<string>("");
    const navigate = useNavigate();
    const {dispatch} = useAuthContext();

    async function login(submitObj : UserLogin) {
        setIsLoading(true);
        setErrorEmail("");
        setErrorPassword("");

        const responseObj = await loginUser(submitObj);
        
        if (responseObj.status === 404) {
            setErrorEmail((responseObj.body as ExceptionResponseBody)[0].message);
        } else if (responseObj.status === 401) {
            setErrorPassword((responseObj.body as ExceptionResponseBody)[0].message);
        } else if (responseObj.status === 200 && responseObj.body) {
            localStorage.setItem("bmgUser", JSON.stringify(responseObj.body));
            dispatch({type: "LOGIN", payload: (responseObj.body as User)});
            navigate("/");
        }
        
        setIsLoading(false);
    }

    return {errorEmail, errorPassword, isLoading, login};
}
