import { useErrorContext } from "../../hooks/useErrorContext";

function ErrorToast(){
    const {isErrorActive, errors} = useErrorContext();

    return (
            <div className={`toast ${isErrorActive ? "" : "hidden"}`}>
                {
                    errors.map(error => {
                        return (
                            <div role="alert" className="alert alert-error">
                                <span>{`${error.code}: ${error.message}`}</span>
                            </div>
                        )
                    })
                }
            </div>
    )
}

export default ErrorToast;
