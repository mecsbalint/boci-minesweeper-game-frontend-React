import { CellColors, palletteNeutral, palletteCurrentPlayer, palletteOpponent } from "../../constants/colorPallettes";
import { CellState, GameState } from "../../types/Game";
import SPGameFieldCellIcon from "../SPGameFieldCellIcon/SPGameFieldCellIcon";

type GameFieldCellProps = {
    gameState: GameState,
    coorX: number,
    coorY: number,
    cellState: CellState
    processClickEvent: (event: React.MouseEvent) => void
};

function GameFieldCell({gameState, coorX, coorY, cellState, processClickEvent}: GameFieldCellProps) {

    const color = getColor();

    function getColor() : CellColors {
        const index = (coorX + coorY) % 2 as 0 | 1
        if (["mine", "mine_activated", "hidden"].includes(cellState)) {
            return palletteNeutral.get(index) as CellColors;
        } else if (cellState.includes("neutral")) {
            return palletteNeutral.get(index) as CellColors;
        } else if (cellState.includes("opponent")) {
            return palletteOpponent.get(index) as CellColors
        } else {
            return palletteCurrentPlayer.get(index) as CellColors
        }
    }

    return (
        <td 
            key={`field-row-${coorY}-cell-${coorX}`} 
            data-x={coorX} 
            data-y={coorY} 
            data-state={cellState}
            className={`w-10 h-10 ${color.base} ${["hidden", "flagged"].includes(cellState) && ["READY", "ACTIVE"].includes(gameState) ? "cursor-pointer " + color.hover : ""}`}
            onClick={processClickEvent}
            onContextMenu={processClickEvent}
        >
            <SPGameFieldCellIcon cellState={cellState}/>
        </td>
    )
}


export default GameFieldCell;
