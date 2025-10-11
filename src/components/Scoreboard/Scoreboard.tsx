import ScoreboardElement from "../ScoreboardElement/ScoreboardElement";

type ScoreboardProps = {
    scoreboard: {[i: string]: number}
}

function Scoreboard({scoreboard}: ScoreboardProps) {
    const entries = Object.entries(scoreboard);
    entries.sort();
    
    return (
        <div className="stats shadow bg-white
">
            {entries.map(entry => <ScoreboardElement scoreboardElement={entry}/>)}            
        </div>
    )
}

export default Scoreboard;
