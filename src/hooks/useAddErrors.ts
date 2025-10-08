import { ExceptionResponseBody } from "../types/Exception";
import { useErrorContext } from "./useErrorContext";

function useAddErrors() {

    function addErrors(errors: ExceptionResponseBody) {
        const {dispatch} = useErrorContext();

        dispatch({type: "UPDATE", payload: errors});
    }

    return {addErrors};
}

export default useAddErrors;
