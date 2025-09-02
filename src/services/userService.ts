import { User, UserLogin, UserRegistration } from "../types/User";
import { apiRequest, ApiResponse } from "./apiRequest";

export async function loginUser(loginObj : UserLogin) : Promise<ApiResponse<User>> {
    const responseObj = await apiRequest<User>({url: "api/login", method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(loginObj)});

    return responseObj;
}

export async function signUpUser(registrationObj : UserRegistration) : Promise<number> {
    const responseObj = await apiRequest({url: "api/registration", method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(registrationObj)});

    return responseObj.status;
}
