
type ScoreboardProps = {
    scoreboard: {[i: string]: number}
}

function Scoreboard({scoreboard}: ScoreboardProps) {
    const entries = Object.entries(scoreboard);
    entries.sort((a, b) => b[1] - a[1]);
    
    return (
        <table className="table bg-white">
            <thead>
                <tr>
                    <th></th>
                    <th>Player</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                {entries.map((entry, i) => <tr key={i}><td>{i + 1}</td><td>{entry[0]}</td><td>{entry[1]}</td></tr>)}
            </tbody>
        </table>
    )
}

export default Scoreboard;
