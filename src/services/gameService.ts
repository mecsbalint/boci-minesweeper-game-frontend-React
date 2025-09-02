import { GameModel, GameResponse, GameStatus, PlayerMove } from "../types/Game";
import { apiRequest, ApiResponse } from "./apiRequest";

export async function checkActiveGameStatus() : Promise<ApiResponse<GameStatus>> {
    const responseObj = await apiRequest<GameStatus>({url: "api/game/active"});
    return responseObj;
}

export async function createGame() : Promise<number> {
    const responseObj = await apiRequest({url: "api/game", method: "POST"});
    return responseObj.status;
}

export async function getCurrentGame() : Promise<ApiResponse<GameModel>> {
    const responseObj = await apiRequest<GameResponse>({url: "api/game"})
    if (responseObj.body === null) {
        return responseObj as unknown as ApiResponse<GameModel>;
    }
    return {status: responseObj.status, body: createGameModelFromGameResponse(responseObj.body)};
}

export async function makePlayerMove(playerMove: PlayerMove) : Promise<ApiResponse<GameModel>> {
    const responseObj = await apiRequest<GameResponse>({url: "api/game", method: "PATCH", headers: {"Content-Type": "application/json"}, body: JSON.stringify(playerMove)});
    if (responseObj.body === null) {
        return responseObj as unknown as ApiResponse<GameModel>;
    }
    return {status: responseObj.status, body: createGameModelFromGameResponse(responseObj.body)};
}

function createGameModelFromGameResponse(gameResponse: GameResponse) : GameModel {
    const gameModel: GameModel = {
        state: gameResponse.state,
        rows: gameResponse.rows,
        columns: gameResponse.columns,
        cells: new Map()
    }
    for (const [key, value] of Object.entries(gameResponse.cells)) {
        const [x, y] = key.split(",").map(coor => parseInt(coor));
        gameModel.cells.set({x, y}, value)
    }
    return gameModel;
}
