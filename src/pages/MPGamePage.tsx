import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client"
import { useAuthContext } from "../hooks/useAuthContext";
import { Match, PlayerMove } from "../types/Game";
import GameField from "../components/GameField/GameField";
import { useErrorContext } from "../hooks/useErrorContext";
import { ExceptionResponseBody } from "../types/Exception";

function MPGamePage() {
    const {id} = useParams();
    const {isLoggedIn, user} = useAuthContext();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [match, setMatch] = useState<Match | null>(null);
    const navigate = useNavigate();
    const {dispatch} = useErrorContext();

    useEffect(() => {
        if (isLoggedIn === false) {
            navigate("/login");
        }
    }, [isLoggedIn])

    useEffect(() => {
        if (!user?.jwt || id === undefined) return;

        const socket = io("/", {auth: {jwt: user.jwt}});
        setSocket(socket);
        
        socket.on("current_game_state", data => setMatch(data));

        socket.on("error", (excBody: ExceptionResponseBody) => {
            if (!excBody.map(exc => exc.code).includes("CACHE_CONCURRENCY_ERROR")) {
                dispatch(excBody);
            }
        });

        if (id === "0") {
            socket.emit("rejoin_game");
        } else {
            socket.emit("join_game", {id: id});
        }

        return () => {
            socket.close();
        }
    }, [user?.jwt, id]);


    async function clickHandler(playerMove: PlayerMove) {
        socket?.emit("make_player_move", playerMove);
    }

    function handleLeaveGameClick() {
        socket?.emit("leave_game");
        socket?.close();
        navigate("/");
    }

    return match !== null ? (
            <>
            <div className="text-center">
                <p className={match?.state === "WAITING" ? "" : "hidden"}>Waiting for players</p>
                <GameField
                    match={match}
                    clickHandler={clickHandler}
                />
            </div>
            <div className={`text-center ${match.state === "FINISHED" ? "" : "hidden"}`}>
                <p className="text-white p-5 text-xl">
                    {match.winnerId === user?.id ? "You Won" : "You Lost"}
                </p>
                <button type="button" className="btn btn-primary" onClick={handleLeaveGameClick}>Leave Game</button>
            </div>
            </>
        ) : (
            <div>
                Loading
            </div>
        );
}

export default MPGamePage;
