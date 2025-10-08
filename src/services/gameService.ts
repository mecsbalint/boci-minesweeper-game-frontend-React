import { GameStatus, PlayerMove, Match } from "../types/Game";
import { apiRequest, ApiResponse } from "./apiRequest";


export async function checkActiveSPGameStatus(jwt: string) : Promise<ApiResponse<GameStatus>> {
    const responseObj = await apiRequest<GameStatus>({url: "api/game/sp/active", jwt});
    return responseObj;
}

export async function createSPGame(jwt: string) : Promise<ApiResponse<void>> {
    const responseObj = await apiRequest({url: "api/game/sp", method: "POST", jwt});
    return responseObj;
}

export async function checkActiveMPGameStatus(jwt: string) : Promise<ApiResponse<GameStatus>> {
    const responseObj = await apiRequest<GameStatus>({url: "api/game/mp/active", jwt});
    return responseObj;
}

export async function createMPGame(jwt: string) : Promise<ApiResponse<void>> {
    const responseObj = await apiRequest({url: "api/game/mp", method: "POST", jwt});
    return responseObj;
}

export async function getCurrentGame(jwt: string) : Promise<ApiResponse<Match>> {
    const responseObj = await apiRequest<Match>({url: "api/game/sp", jwt})
    if (responseObj.status === 200) {
        return {status: responseObj.status, body: responseObj.body as Match};
    } else {
        return responseObj as unknown as ApiResponse<Match>
    }
}

export async function makePlayerMove(jwt: string, playerMove: PlayerMove) : Promise<ApiResponse<Match>> {
    const responseObj = await apiRequest<Match>({url: "api/game/sp", method: "PATCH", headers: {"Content-Type": "application/json"}, body: JSON.stringify(playerMove), jwt});
    if (responseObj.status === 200) {
        return {status: responseObj.status, body: responseObj.body as Match};
    } else {
        return responseObj as unknown as ApiResponse<Match>
    }
}
