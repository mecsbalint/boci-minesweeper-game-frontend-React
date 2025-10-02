import { CellState, GameState } from "../../types/Game";
import SPGameFieldCellIcon from "../SPGameFieldCellIcon/SPGameFieldCellIcon";

type GameFieldCellProps = {
    gameState: GameState,
    coorX: number,
    coorY: number,
    cellState: CellState
    processClickEvent: (event: React.MouseEvent) => void
};

type CellColors = {
    base: string,
    hover: string
};

type CellColorScheme = Map<0 | 1, CellColors>

function GameFieldCell({gameState, coorX, coorY, cellState, processClickEvent}: GameFieldCellProps) {
    const palletteNeutral: CellColorScheme = new Map([
        [0, {base: "bg-neutral-400", hover: "hover:bg-neutral-300"}],
        [1, {base: "bg-neutral-200", hover: "hover:bg-neutral-100"}]
    ]);
    const palletteCurrentPlayer: CellColorScheme = new Map([
        [0, {base: "bg-amber-400", hover: "hover:bg-amber-300"}],
        [1, {base: "bg-amber-200", hover: "hover:bg-amber-100"}]
    ]);
    const palletteOpponent: CellColorScheme = new Map([
        [0, {base: "bg-red-400", hover: "hover:bg-red-300"}],
        [1, {base: "bg-red-200", hover: "hover:bg-red-100"}]
    ]);

    const color: CellColors = getColor();

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
