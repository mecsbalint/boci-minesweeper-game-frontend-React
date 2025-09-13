import { createContext, PropsWithChildren, useEffect, useReducer } from "react";
import { ExceptionResponseBody } from "../types/Exception";

type ErrorState = {
    errors: ExceptionResponseBody
    isErrorActive: boolean
};

type ErrorAction = ExceptionResponseBody;

type ErrorContextType = ErrorState & {
    dispatch: React.Dispatch<ErrorAction>
}

export const ErrorContext = createContext<ErrorContextType | null>(null);

export function errorReducer(state: ErrorState, action: ErrorAction): ErrorState {
    return {isErrorActive: action.length > 0, errors: action}
}

export function ErrorContextProvider({children}: PropsWithChildren) {
    const [state, dispatch] = useReducer(errorReducer, {errors: [], isErrorActive: false} as ErrorState);

    useEffect(() => {
        setTimeout(() => {
            dispatch([]);
        }, 5000)
    }, [state]);

    return (
        <ErrorContext.Provider value={{...state, dispatch}} >
            {children}
        </ErrorContext.Provider>
    )
}
