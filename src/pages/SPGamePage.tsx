import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect, useState } from "react";
import GameField from "../components/GameField/GameField";
import { Match, PlayerMove } from "../types/Game";
import { createSPGame, getCurrentGame, makePlayerMove } from "../services/gameService";
import { ExceptionResponseBody } from "../types/Exception";
import useAddErrors from "../hooks/useAddErrors";

function SPGamePage() {
    const navigate = useNavigate();
    const {isLoggedIn, user} = useAuthContext();
    const [match, setMatch] = useState<Match | null>(null);
    const {addErrors} = useAddErrors();

    useEffect(() => {
        if (isLoggedIn === true) {
            if (!match) {
                getCurrentGame(user.jwt).then(response => {
                    if (response.status === 200) {
                        setMatch(response.body as Match);
                    } else if (response.status >= 400 && response.status <= 599) {
                        addErrors(response.body as ExceptionResponseBody);
                    }
                });
            }
        } else if (isLoggedIn === false) {
            navigate("/login");
        }
    }, [isLoggedIn, navigate]);


    async function handleNewGameClick() {
        if (isLoggedIn !== true) return;
        const responseObj = await createSPGame(user.jwt);
        if (responseObj.status === 201) {
            getCurrentGame(user.jwt).then(response => {
                if (response.status === 200) {
                    setMatch(response.body as Match);
                } else if (response.status >= 400 && response.status <= 599) {
                    addErrors(response.body as ExceptionResponseBody);
                }
            });
        } else if (responseObj.status >= 400 && responseObj.status <= 599) {
            addErrors(responseObj.body as ExceptionResponseBody);
        }
    }

    async function clickHandler(playerMove: PlayerMove) : Promise<void> {
        if (isLoggedIn !== true) return;
        const responseObj = await makePlayerMove(user.jwt, playerMove);
        if (responseObj.status === 200) {
            setMatch(responseObj.body as Match);
        } else if (responseObj.status >= 400 && responseObj.status <= 599) {
            addErrors(responseObj.body as ExceptionResponseBody);
        }
    }

    return match !== null ? (
            <div className="grid grid-cols-1 h-min">
                <div>
                    <GameField
                        match={match}
                        clickHandler={clickHandler}
                    />
                </div>
                <div className={`text-center ${match.state === "FINISHED" ? "" : "hidden"}`}>
                    <p className="text-white p-5 text-xl">
                        {match.winnerId === user?.id ? "You Won" : "You Lost"}
                    </p>
                    <button type="button" className="btn btn-primary" onClick={handleNewGameClick}>New Game</button>
                </div>
            </div>
        ) : (
            <div>
                Loading
            </div>
        );
}

export default SPGamePage;
