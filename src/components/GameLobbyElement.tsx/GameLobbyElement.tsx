import { MatchLobbyDto } from "../../types/Game";

type GameLobbyElementProps = {
    matchLobbyElement: MatchLobbyDto,
    clickHandler: (event: React.MouseEvent) => void,
    isLast: boolean
}

function GameLobbyElement({matchLobbyElement, clickHandler, isLast}: GameLobbyElementProps) {

    return (
        <>
        <tr key={matchLobbyElement.id} className="hover:bg-blue-100">
            <td className={`py-4 ${isLast ? "rounded-b-lg" : ""}`}>
                <button type="button" className="btn btn-accent btn-xs" data-id={matchLobbyElement.id} onClick={clickHandler}>JOIN</button>
            </td>
            <td className="py-4">{matchLobbyElement.ownerName}</td>
            <td className="py-4">{matchLobbyElement.gameType}</td>
            <td className="py-4">{matchLobbyElement.mapType}</td>
            <td className="py-4">{matchLobbyElement.maxNumOfPlayers}</td>
            <td className={`py-4 ${isLast ? "rounded-b-lg" : ""}`}>{matchLobbyElement.emptySeats}</td>
        </tr>
        </>
    )
}

export default GameLobbyElement;
