import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client"

function MPGamePage() {
    const [list, setList] = useState<string[]>([]);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [room, setRoom] = useState<"room1" | "room2" | null>(null)

    useEffect(() => {
        const socket = io("http://localhost:5000");
        setSocket(socket)

        socket.on("connect", () => console.log("connected"));
        socket.on("mp_game_event", data => setList(prev => [...prev, data]));
        socket.on("disconnect", () => console.log("disconnected"));

        return () => {
            socket.disconnect();
        };
    }, []);

    function sendButtonInput() {
        if (socket && room) {
            socket.emit("mp_game_event", {msg: `Button pressed: ${Date.now()}`, room: room})
        }
    }

    return (
        <div className="place-items-center">
            Multiplayer Game Page
            <ul>
                {list.map(element => <li key={element}>{element}</li>)}
            </ul>
            <button type="button" className="btn btn-primary" onClick={sendButtonInput}>Add to the list</button>
            <button type="button" className="btn btn-primary" onClick={() => setRoom("room1")}>Join room1</button>
            <button type="button" className="btn btn-primary" onClick={() => setRoom("room2")}>Join room2</button>
        </div>
    )
}

export default MPGamePage;
