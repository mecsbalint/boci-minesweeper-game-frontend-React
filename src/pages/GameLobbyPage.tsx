import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { MatchLobbyDto } from "../types/Game";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

function GameLobbyPage() {
    const navigate = useNavigate();
    const [socket, setSocket] = useState<Socket | null>(null);
    const [matches, setMatches] = useState<MatchLobbyDto[]>([]);
    const {isLoggedIn, user} = useAuthContext();

    useEffect(() => {
        if (isLoggedIn === false) {
            navigate("/login");
        }

        const socket = io("http://localhost:5000", {auth: {jwt: user?.jwt}});
        setSocket(socket);

        socket.on("lobby_update", data => setMatches(data));

        socket.emit("join_lobby");
    }, []);

    function handleClickEvent(event: React.MouseEvent) {
        event.preventDefault();

        const id = (event.target as HTMLElement).dataset.id ?? "";

        navigate(`/mp-game/${id}`);
    }

    return (
        <div className={"grid justify-center gap-5"}>
            <h1>Available Matches</h1>
            <ul onClick={handleClickEvent}>
                {matches.map(match => <li key={match.id} data-id={match.id}>Available seats: {match.emptySeats}</li>)}
            </ul>
        </div>
    )
}

export default GameLobbyPage;
