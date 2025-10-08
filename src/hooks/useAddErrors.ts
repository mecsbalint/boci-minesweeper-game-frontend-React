import { ExceptionResponseBody } from "../types/Exception";
import { useErrorContext } from "./useErrorContext";

function useAddErrors() {
    const {dispatch} = useErrorContext();

    function addErrors(errors: ExceptionResponseBody) {
        dispatch({type: "UPDATE", payload: errors});
    }

    return {addErrors};
}

export default useAddErrors;
