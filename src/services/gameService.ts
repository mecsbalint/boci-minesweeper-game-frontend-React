import { GameStatus, PlayerMove, Match } from "../types/Game";
import { apiRequest, ApiResponse } from "./apiRequest";


export async function checkActiveGameStatus() : Promise<ApiResponse<GameStatus>> {
    const responseObj = await apiRequest<GameStatus>({url: "api/game/sp/active"});
    return responseObj;
}

export async function createGame() : Promise<ApiResponse<void>> {
    const responseObj = await apiRequest({url: "api/game/sp", method: "POST"});
    return responseObj;
}

export async function getCurrentGame() : Promise<ApiResponse<Match>> {
    const responseObj = await apiRequest<Match>({url: "api/game/sp"})
    if (responseObj.status === 200) {
        return {status: responseObj.status, body: responseObj.body as Match};
    } else {
        return responseObj as unknown as ApiResponse<Match>
    }
}

export async function makePlayerMove(playerMove: PlayerMove) : Promise<ApiResponse<Match>> {
    const responseObj = await apiRequest<Match>({url: "api/game/sp", method: "PATCH", headers: {"Content-Type": "application/json"}, body: JSON.stringify(playerMove)});
    if (responseObj.status === 200) {
        return {status: responseObj.status, body: responseObj.body as Match};
    } else {
        return responseObj as unknown as ApiResponse<Match>
    }
}
