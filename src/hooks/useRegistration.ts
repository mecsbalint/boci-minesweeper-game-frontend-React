import { useState } from "react";
import { signUpUser } from "../services/userService";
import { useNavigate } from "react-router-dom";
import { UserRegistration } from "../types/User";
import { ExceptionResponseBody } from "../types/Exception";

type UseRegistrationResult = {
    error: string,
    isLoading: boolean | null,
    signUp: (submitObj: UserRegistration) => Promise<void>
}

export function useRegistration() : UseRegistrationResult {
    const [isLoading, setIsLoading] = useState<boolean | null>(null);
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();
    
    async function signUp(submitObj : UserRegistration) {
        setIsLoading(true);
        setError("");

        const responseObj = await signUpUser(submitObj);

        if (responseObj.status === 409) {
            setError((responseObj.body as ExceptionResponseBody)[0].message);
        } else if (responseObj.status === 201) {
            navigate("/login");
        }
        
        setIsLoading(false);
    }

    return {error, isLoading, signUp};
}