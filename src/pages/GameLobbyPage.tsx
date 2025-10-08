import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { MatchLobbyDto } from "../types/Game";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { ExceptionResponseBody } from "../types/Exception";
import GameLobbyElement from "../components/GameLobbyElement.tsx/GameLobbyElement";
import useAddErrors from "../hooks/useAddErrors";

function GameLobbyPage() {
    const navigate = useNavigate();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [matches, setMatches] = useState<MatchLobbyDto[]>([]);
    const {isLoggedIn, user} = useAuthContext();
    const {addErrors} = useAddErrors();

    useEffect(() => {
        if (isLoggedIn === false) {
            navigate("/login");
        }

        const socket = io("/", {auth: {jwt: user?.jwt}});
        setSocket(socket);

        socket.on("lobby_update", data => setMatches(data));

        socket.on("error", data => addErrors(data));

        socket.emit("join_lobby");

        return () => {
            socket.close();
        }
    }, []);

    function handleClickEvent(event: React.MouseEvent) {
        event.preventDefault();

        const id = (event.currentTarget as HTMLElement).dataset.id ?? "";

        navigate(`/mp-game/${id}`);
    }

    return (
        <div className={"grid justify-center gap-5"}>
            <table className="table table-zebra bg-base-300">
                <thead className="tracking-wide">
                    <th></th>
                    <th>Creator</th> 
                    <th>Game type</th> 
                    <th>Map type</th> 
                    <th>Players</th> 
                    <th>Available seats</th> 
                </thead>
                <tbody>
                    {matches.map((match, i) => <GameLobbyElement matchLobbyElement={match} clickHandler={handleClickEvent} isLast={matches.length -1 === i}/>)}
                </tbody>
            </table>
        </div>
    )
}

export default GameLobbyPage;
