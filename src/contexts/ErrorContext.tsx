import { createContext, PropsWithChildren, useEffect, useReducer } from "react";
import { ExceptionResponseBody } from "../types/Exception";

type ErrorState = {
    errors: ExceptionResponseBody
    isErrorActive: boolean
};

type ErrorAction =
    | {type: "UPDATE", payload: ExceptionResponseBody}
    | {type: "CLEAR"};

type ErrorContextType = ErrorState & {
    dispatch: React.Dispatch<ErrorAction>
}

export const ErrorContext = createContext<ErrorContextType | null>(null);

export function errorReducer(state: ErrorState, action: ErrorAction): ErrorState {
    switch (action.type) {
        case "UPDATE":
            return {isErrorActive: true, errors: [...state.errors, ...action.payload]}
            case "CLEAR":
            return {isErrorActive: false, errors: []}
    }
}

export function ErrorContextProvider({children}: PropsWithChildren) {
    const [state, dispatch] = useReducer(errorReducer, {errors: [], isErrorActive: false} as ErrorState);

    useEffect(() => {
        if (!state.isErrorActive) return;

        const timer = setTimeout(() => {
            dispatch({type: "CLEAR"});
        }, 1000);

        return () => clearTimeout(timer);
    }, [state]);

    return (
        <ErrorContext.Provider value={{...state, dispatch}} >
            {children}
        </ErrorContext.Provider>
    )
}
