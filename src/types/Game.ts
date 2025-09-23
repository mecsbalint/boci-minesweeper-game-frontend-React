
export type GameStatus = {
    status: boolean
};

export type PlayerMove = {
    coordinates: Coordinates
    action_type: "REVEAL" | "FLAG"
};

export type Coordinates = {
    x: number,
    y: number
};

export type Match = {
    state: "CREATED" | "WAITING" | "READY" | "ACTIVE" | "FINISHED",
    winnerId: number | null,
    board: CellState[][]
};

export type CellState = "void" | "flag" | "hidden" | "empty" | "mine" | "mine_activated" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | `opponent_${string}`;
