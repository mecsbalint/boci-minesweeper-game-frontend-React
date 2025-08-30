import { GameCreatedResponse, GameStatus } from "../types/Game";
import { apiRequest, ApiResponse } from "./apiRequest";

export async function checkActiveGameStatus() : Promise<ApiResponse<GameStatus>> {
    const responseObj = await apiRequest<GameStatus>({url: "api/game/active"});
    return responseObj;
}

export async function createGame() : Promise<ApiResponse<GameCreatedResponse>> {
    const responseObj = await apiRequest<GameCreatedResponse>({url: "api/game", method: "POST"})
    return responseObj;
}
