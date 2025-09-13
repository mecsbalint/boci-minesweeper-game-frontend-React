import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import SPGameField from "../components/SPGameField/SPGameField";
import { Cell, Coordinates, GameModel, PlayerMove } from "../types/Game";
import { createGame, getCurrentGame, makePlayerMove } from "../services/gameService";
import { useErrorContext } from "../hooks/useErrorContext";
import { ExceptionResponseBody } from "../types/Exception";

function SPGamePage() {
    const navigate = useNavigate();
    const {isLoggedIn} = useAuthContext();
    const [game, setGame] = useState<GameModel | null>(null);
    const {dispatch} = useErrorContext()

    useEffect(() => {
        if (isLoggedIn) {
            if (!game) {
                getCurrentGame().then(response => {
                    if (response.status === 200) {
                        setGame(response.body as GameModel);
                    } else if (response.status >= 400 && response.status <= 599) {
                        dispatch(response.body as ExceptionResponseBody)
                    }
                });
            }
        } else if (isLoggedIn === false) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);


    async function handleNewGameClick() {
        const responseObj = await createGame();
        if (responseObj.status === 201) {
            getCurrentGame().then(response => {
                if (response.status === 200) {
                    setGame(response.body as GameModel);
                } else if (response.status >= 400 && response.status <= 599) {
                    dispatch(response.body as ExceptionResponseBody)
                }
            });
        } else if (responseObj.status >= 400 && responseObj.status <= 599) {
            dispatch(responseObj.body as ExceptionResponseBody)
        }
    }

    async function clickHandler(coordinates: Coordinates, mouseButton: 0 | 2) : Promise<void> {
        if (game?.state && ['INITIALIZED', 'STARTED'].includes(game?.state)) {
            const action_type = mouseButton === 0 ? "REVEAL" : "FLAG";
    
            const key = game?.cells.keys().find(coor => coor.x === coordinates.x && coor.y === coordinates.y);
            let actionCell: Cell | undefined;
            if (key) {
                actionCell = game?.cells.get(key);
            }
    
            if (actionCell?.state === "hidden" || (actionCell?.state === "flagged" && action_type === "FLAG")) {
                const playerMove: PlayerMove = {coordinates, action_type};
                const responseObj = await makePlayerMove(playerMove);
                if (responseObj.status === 200) {
                    setGame(responseObj.body as GameModel);
                } else if (responseObj.status >= 400 && responseObj.status <= 599) {
                    dispatch(responseObj.body as ExceptionResponseBody)
                }
            }
        }
    }

    return game !== null ? (
            <>
            <div>
                <SPGameField
                    game={game}
                    clickHandler={clickHandler}
                />
            </div>
            <div className={`text-center ${game.state === "FINISHED_LOST" || game.state === "FINISHED_WON" ? "" : "hidden"}`}>
                <p className="text-white p-5 text-xl">
                    {game.state === "FINISHED_LOST" ? "You Lost" : "You Won"}
                </p>
                <button type="button" className="btn btn-primary" onClick={handleNewGameClick}>New Game</button>
            </div>
            </>

        ) : (
            <div>
                Loading
            </div>
        );
}

export default SPGamePage;
