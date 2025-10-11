
export type CellColors = {
    base: string,
    hover: string
};

type CellColorScheme = Map<0 | 1, CellColors>

export const palletteNeutral: CellColorScheme = new Map([
    [0, {base: "bg-neutral-400", hover: "hover:bg-neutral-300"}],
    [1, {base: "bg-neutral-200", hover: "hover:bg-neutral-100"}]
]);
export const palletteCurrentPlayer: CellColorScheme = new Map([
    [0, {base: "bg-amber-400", hover: "hover:bg-amber-300"}],
    [1, {base: "bg-amber-200", hover: "hover:bg-amber-100"}]
]);
export const palletteOpponent: CellColorScheme = new Map([
    [0, {base: "bg-red-400", hover: "hover:bg-red-300"}],
    [1, {base: "bg-red-200", hover: "hover:bg-red-100"}]
]);