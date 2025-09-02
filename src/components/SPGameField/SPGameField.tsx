import React from "react";
import { Cell, Coordinates, GameModel } from "../../types/Game";
import SPGameFieldCell from "../SPGameFieldCell/SPGameFieldCell";

type SPGameFieldProps = {
    game: GameModel,
    clickHandler: (coordinates: Coordinates, mouseButton: 0 | 2) => Promise<void>
};

function SPGameField({game, clickHandler} : SPGameFieldProps) {
    const field = createField(game.cells);

    function processClickEvent(event: React.MouseEvent) {
        event.preventDefault();

        if (event.button === 0 || event.button === 2) {
            const target = event.target as HTMLElement;
            const x = parseInt(target.dataset.x ?? "");
            const y = parseInt(target.dataset.y ?? "");

            clickHandler({x, y}, event.button)
        }
    }
    
    return (
        <div className="place-items-center">
           <table onClick={processClickEvent} onContextMenu={processClickEvent}>
                {
                    field.map((row, i) => <tr key={"field-row-" + i}>{row.map(([coor, cell]) => <SPGameFieldCell gameState={game.state} coordinates={coor} cell={cell}/>)}</tr>)
                }
           </table>
        </div>
    )
}

function createField(cells: Map<Coordinates, Cell>) : [Coordinates, Cell][][] {
    const field: [Coordinates, Cell][][] = Array.from(Map.groupBy(cells.entries(), ([coor, cell]) => coor.x).values());

    field.forEach(row => row.sort((a, b) => a[0].y - b[0].y));

    return field;
}

export default SPGameField;
