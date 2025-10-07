
export type GameStatus = {
    status: boolean
};

export type MatchLobbyDto = {
    id: string,
    emptySeats: number,
    maxNumOfPlayers: number,
    ownerName: string,
    mapType: string,
    gameType: string
}

export type PlayerMove = {
    coordinates: Coordinates
    actionType: "REVEAL" | "FLAG"
};

export type Coordinates = {
    x: number,
    y: number
};

export type Match = {
    state: GameState,
    winnerId: number | null,
    board: CellState[][]
};

export type GameState =  "CREATED" | "WAITING" | "READY" | "ACTIVE" | "FINISHED";

export type CellState = "void" | "flagged" | "hidden" | "empty" | "mine" | "mine_activated" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | `opponent_${string}`;
