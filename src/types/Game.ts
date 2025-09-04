
export type GameStatus = {
    status: boolean
};

export type PlayerMove = {
    coordinates: Coordinates
    action_type: "REVEAL" | "FLAG"
};

type Game = {
    state: 'INITIALIZED' | 'STARTED' | 'FINISHED_LOST' | 'FINISHED_WON',
    rows: number,
    columns: number
};

export type GameResponse = Game & {
    cells: Record<string, Cell>
}

export type GameModel = Game & {
    cells: Map<Coordinates, Cell>
}

export type Coordinates = {
    x: number,
    y: number
};

export type CellState = "hidden" | "empty" | "flagged" | "mine" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";

export type Cell = {
    state: CellState
};
