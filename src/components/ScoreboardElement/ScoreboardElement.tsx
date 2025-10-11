import { palletteCurrentPlayer, palletteOpponent } from "../../constants/colorPallettes";
import { useAuthContext } from "../../hooks/useAuthContext";

type ScoreboardEllementProps = {
    scoreboardElement: [string, number]
}

function ScoreboardElement({scoreboardElement}: ScoreboardEllementProps) {
    const {user} = useAuthContext();
    const colorPallette = user?.name === scoreboardElement[0] ? palletteCurrentPlayer.get(0)! : palletteOpponent.get(0)!;
    
    return (
        <div className={"stat " + colorPallette.base}>
            <div className="stat-title text-black">{scoreboardElement[0]}</div>
            <div className="stat-value">{scoreboardElement[1]}</div>
        </div>
    )
}

export default ScoreboardElement;
