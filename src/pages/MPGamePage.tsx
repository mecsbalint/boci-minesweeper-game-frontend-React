import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client"
import { useAuthContext } from "../hooks/useAuthContext";
import { Match, PlayerMove } from "../types/Game";
import GameField from "../components/GameField/GameField";
import { ExceptionResponseBody } from "../types/Exception";
import useAddErrors from "../hooks/useAddErrors";
import ChatBox from "../components/ChatBox/ChatBox";

function MPGamePage() {
    const {id} = useParams();
    const {isLoggedIn, user} = useAuthContext();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [match, setMatch] = useState<Match | null>(null);
    const [chat, setChat] = useState<[string, string][]>([]);
    const navigate = useNavigate();
    const {addErrors} = useAddErrors();

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
        socket.on("chat", data => setChat(data))

        socket.on("error", (excBody: ExceptionResponseBody) => {
            if (!excBody.map(exc => exc.code).includes("CACHE_CONCURRENCY_ERROR")) {
                addErrors(excBody);
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


    async function gameFieldClickHandler(playerMove: PlayerMove) {
        socket?.emit("make_player_move", playerMove);
    }

    function handleLeaveGameClick() {
        socket?.emit("leave_game");
        socket?.close();
        navigate("/");
    }

    function handleChatInput(message: string) {
        socket?.emit("add_message", message)
    }

    return match !== null ? (
            <div className="grid grid-cols-3 grid-rows-15 gap-5">
                <div className="col-span-2 text-center">
                    <p className={`${match?.state === "WAITING" ? "" : "hidden"}`}>Waiting for players</p>
                </div>
                <div></div>
                <div className="col-span-2 row-span-14">
                    <div className="text-center">
                        <GameField
                            match={match}
                            clickHandler={gameFieldClickHandler}
                        />
                    </div>
                    <div className={`text-center ${match.state === "FINISHED" ? "" : "hidden"}`}>
                        <p className="text-white p-5 text-xl">
                            {match.winnerId === user?.id ? "You Won" : "You Lost"}
                        </p>
                        <button type="button" className="btn btn-primary" onClick={handleLeaveGameClick}>Leave Game</button>
                    </div>
                </div>
            <div className="row-span-8">
                <ChatBox onSendMessage={handleChatInput} chat={chat}/>
            </div>
            </div>
        ) : (
            <div>
                Loading
            </div>
        );
}

export default MPGamePage;
