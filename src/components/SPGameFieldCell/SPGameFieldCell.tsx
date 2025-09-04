import { Cell, Coordinates, GameStatus } from "../../types/Game";
import SPGameFieldCellIcon from "../SPGameFieldCellIcon/SPGameFieldCellIcon";

type SPGameFieldCellProps = {
    gameState: string,
    coordinates: Coordinates,
    cell: Cell
};

type CellColors = {
    base: string,
    hover: string
};

type CellColorScheme = Map<0 | 1, CellColors>

function SPGameFieldCell({gameState, coordinates, cell}: SPGameFieldCellProps) {
    const palletteHidden: CellColorScheme = new Map([
        [0, {base: "bg-neutral-400", hover: "hover:bg-neutral-300"}],
        [1, {base: "bg-neutral-200", hover: "hover:bg-neutral-100"}]
    ]);
    const palletteRevealed: CellColorScheme = new Map([
        [0, {base: "bg-amber-400", hover: "hover:bg-amber-300"}],
        [1, {base: "bg-amber-200", hover: "hover:bg-amber-100"}]
    ]);

    const color: CellColors = getColor();

    function getColor() : CellColors {
        const index = (coordinates.x + coordinates.y) % 2 as 0 | 1
        if (cell.state === "hidden") {
            return palletteHidden.get(index) as CellColors;
        }
        return palletteRevealed.get(index) as CellColors
    }

    return (
        <td 
            key={`field-row-${coordinates.y}-cell-${coordinates.x}`} 
            data-x={coordinates.x} 
            data-y={coordinates.y} 
            className={`w-10 h-10 ${color.base} ${color.hover} ${cell.state === "hidden" && ['INITIALIZED', 'STARTED'].includes(gameState) ? "cursor-pointer" : ""}`}
        >
            <SPGameFieldCellIcon cellState={cell.state}/>
        </td>
    )
}


export default SPGameFieldCell;
