import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { checkActiveGameStatus, createGame } from "../services/gameService";
import { GameStatus } from "../types/Game";
import { useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate()
    const {user, isLoggedIn} = useAuthContext();
    const [gameInProgressState, setGameInProgressState] = useState<boolean>(false)

    useEffect(() => {
        if (isLoggedIn) {
            checkActiveGameStatus().then(responseObj => {
                if (responseObj.status === 200) {
                    setGameInProgressState((responseObj.body as GameStatus).status)
                }
            })
        }
    }, [isLoggedIn])

    async function handleNewGameClick() {
        const responseStatus = await createGame();
        if (responseStatus === 201) {
            navigate("/sp-game");
        }
    }

    function handleContinueGameClick() {
        navigate("/sp-game");
    }

    return (
        <div className={isLoggedIn ? "" : "hidden"}>
            <button type="button" className="btn btn-primary" onClick={handleNewGameClick}>New Game</button>
            <button type="button" className={`btn btn-primary ${gameInProgressState ? "" : "hidden"}`} onClick={handleContinueGameClick}>Continue Game</button>
        </div>
    )
}

export default HomePage;
