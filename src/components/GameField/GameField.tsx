import React from "react";
import { CellState, Coordinates, Match } from "../../types/Game";
import GameFieldCell from "../GameFieldCell/GameFieldCell";

type GameFieldProps = {
    match: Match,
    clickHandler: (actionCellState: CellState, coordinates: Coordinates, mouseButton: 0 | 2) => Promise<void>
};

function GameField({match, clickHandler} : GameFieldProps) {
    const board = match.board

    function processClickEvent(event: React.MouseEvent) {
        event.preventDefault();

        if (event.button === 0 || event.button === 2) {
            const target = event.target as HTMLElement;
            const x = parseInt(target.dataset.x ?? "");
            const y = parseInt(target.dataset.y ?? "");
            const state = target.dataset.state ?? "";

            if (x && y && state) {
                clickHandler(state as CellState, {x, y}, event.button)
            }
        }
    }
    
    return (
        <div className="place-items-center">
           <table onClick={processClickEvent} onContextMenu={processClickEvent}>
                {
                    board.map((row, i) => <tr key={"field-row-" + i}>{row.map((cellState, j) => <GameFieldCell gameState={match.state} coorX={j} coorY={i} cellState={cellState}/>)}</tr>)
                }
           </table>
        </div>
    )
}

export default GameField;
