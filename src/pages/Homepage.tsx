import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { checkActiveMPGameStatus, checkActiveSPGameStatus, createMPGame, createSPGame } from "../services/gameService";
import { GameStatus } from "../types/Game";
import { useNavigate } from "react-router-dom";
import { useErrorContext } from "../hooks/useErrorContext";
import { ExceptionResponseBody } from "../types/Exception";
import { useLogout } from "../hooks/useLogout";

function HomePage() {
    const navigate = useNavigate()
    const {isLoggedIn} = useAuthContext();
    const {dispatch} = useErrorContext();
    const [SPGameInProgressState, setSPGameInProgressState] = useState<boolean>(false);
    const [MPGameInProgressState, setMPGameInProgressState] = useState<boolean>(false);
    const logout = useLogout();

    useEffect(() => {
        if (isLoggedIn) {
            checkActiveSPGameStatus().then(responseObj => {
                if (responseObj.status === 200) {
                    setSPGameInProgressState((responseObj.body as GameStatus).status)
                } else if (responseObj.status === 401 || (responseObj.status === 404 && (responseObj.body as ExceptionResponseBody).map(error => error.code).includes("USER_NOT_FOUND"))) {
                    logout();
                } else if (responseObj.status >= 400 && responseObj.status <= 599) {
                    dispatch(responseObj.body as ExceptionResponseBody)
                }
            });
            checkActiveMPGameStatus().then(responseObj => {
                if (responseObj.status === 200) {
                    setMPGameInProgressState((responseObj.body as GameStatus).status)
                } else if (responseObj.status === 401 || responseObj.status === 404 && (responseObj.body as ExceptionResponseBody).map(error => error.code).includes("USER_NOT_FOUND")) {
                    logout();
                } else if (responseObj.status >= 400 && responseObj.status <= 599) {
                    dispatch(responseObj.body as ExceptionResponseBody)
                }
            });
        }
    }, [isLoggedIn])

    async function handleNewSPGameClick() {
        const responseObj = await createSPGame();
        if (responseObj.status === 201) {
            navigate("/sp-game");
        } else if (responseObj.status >= 400 && responseObj.status <= 599) {
            dispatch(responseObj.body as ExceptionResponseBody)
        }
    }

    async function handleNewMPGameClick() {
        const responseObj = await createMPGame();
        if (responseObj.status === 201) {
            navigate("/mp-game/0");
        } else if (responseObj.status >= 400 && responseObj.status <= 599) {
            dispatch(responseObj.body as ExceptionResponseBody)
        }
    }

    function handleContinueSPGameClick() {
        navigate("/sp-game");
    }

    function handleContinueMPGameClick() {
        navigate("/mp-game/0");
    }

    function handleJoinGameBtnClick() {
        navigate("/lobby");
    }

    return (
        <div className={`grid justify-center gap-5 ${isLoggedIn ? "" : "hidden"}`}>
            <button type="button" className="btn btn-primary" onClick={handleNewSPGameClick}>New Single Player Game</button>
            <button type="button" className={`btn btn-primary ${SPGameInProgressState ? "" : "hidden"}`} onClick={handleContinueSPGameClick}>Continue Single Player Game</button>
            <button type="button" className="btn btn-primary" onClick={handleJoinGameBtnClick}>Join Multiplayer Game</button>
            <button type="button" className="btn btn-primary" onClick={handleNewMPGameClick}>New Multiplayer Game</button>
            <button type="button" className={`btn btn-primary ${MPGameInProgressState ? "" : "hidden"}`} onClick={handleContinueMPGameClick}>Continue Multiplayer Game</button>
        </div>
    )
}

export default HomePage;
