import { GameModel, GameResponse, GameStatus, PlayerMove } from "../types/Game";
import { apiRequest, ApiResponse } from "./apiRequest";
import { ExceptionResponseBody } from "../types/Exception";


export async function checkActiveGameStatus() : Promise<ApiResponse<GameStatus>> {
    const responseObj = await apiRequest<GameStatus>({url: "api/game/active"});
    return responseObj;
}

export async function createGame() : Promise<ApiResponse<void>> {
    const responseObj = await apiRequest({url: "api/game", method: "POST"});
    return responseObj;
}

export async function getCurrentGame() : Promise<ApiResponse<GameModel>> {
    const responseObj = await apiRequest<GameResponse>({url: "api/game"})
    
    if (responseObj.status === 200) {
        return {status: responseObj.status, body: createGameModelFromGameResponse(responseObj.body as GameResponse)};
    } else {
        return responseObj as unknown as ApiResponse<GameModel>
    }
}

export async function makePlayerMove(playerMove: PlayerMove) : Promise<ApiResponse<GameModel>> {
    const responseObj = await apiRequest<GameResponse>({url: "api/game", method: "PATCH", headers: {"Content-Type": "application/json"}, body: JSON.stringify(playerMove)});
    if (responseObj.status === 200) {
        return {status: responseObj.status, body: createGameModelFromGameResponse(responseObj.body as GameResponse)};
    } else {
        return responseObj as unknown as ApiResponse<GameModel>
    }
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
