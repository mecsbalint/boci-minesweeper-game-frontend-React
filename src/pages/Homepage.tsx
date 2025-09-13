import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { checkActiveGameStatus, createGame } from "../services/gameService";
import { GameStatus } from "../types/Game";
import { useNavigate } from "react-router-dom";
import { useErrorContext } from "../hooks/useErrorContext";
import { ExceptionResponseBody } from "../types/Exception";

function HomePage() {
    const navigate = useNavigate()
    const {isLoggedIn} = useAuthContext();
    const {dispatch} = useErrorContext();
    const [gameInProgressState, setGameInProgressState] = useState<boolean>(false)

    useEffect(() => {
        if (isLoggedIn) {
            checkActiveGameStatus().then(responseObj => {
                if (responseObj.status === 200) {
                    setGameInProgressState((responseObj.body as GameStatus).status)
                } else if (responseObj.status >= 400 && responseObj.status <= 599) {
                    dispatch(responseObj.body as ExceptionResponseBody)
                }
            })
        }
    }, [isLoggedIn])

    async function handleNewGameClick() {
        const responseObj = await createGame();
        if (responseObj.status === 201) {
            navigate("/sp-game");
        } else if (responseObj.status >= 400 && responseObj.status <= 599) {
            dispatch(responseObj.body as ExceptionResponseBody)
        }
    }

    function handleContinueGameClick() {
        navigate("/sp-game");
    }

    return (
        <div className={`grid justify-center gap-5 ${isLoggedIn ? "" : "hidden"}`}>
            <button type="button" className="btn btn-primary" onClick={handleNewGameClick}>New Game</button>
            <button type="button" className={`btn btn-primary ${gameInProgressState ? "" : "hidden"}`} onClick={handleContinueGameClick}>Continue Game</button>
        </div>
    )
}

export default HomePage;
