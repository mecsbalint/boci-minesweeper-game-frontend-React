import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect } from "react";
import SPGameField from "../components/SPGameField/SPGameField";

function SPGamePage() {
    const navigate = useNavigate();
    const {isLoggedIn} = useAuthContext();

    useEffect(() => {
        isLoggedIn === false && navigate("/login");
    }, [isLoggedIn, navigate]);

    return (
        <div className="">
            <SPGameField />
        </div>
    )
}

export default SPGamePage;
