import { ExceptionResponseBody } from "../types/Exception";
import { User } from "../types/User";

type ApiRequestParams = {
  url: string,
  method?: "GET" | "POST" | "DELETE" | "PUT" | "PATCH" | "HEAD",
  body?: string | FormData,
  headers?: {[key: string]: string}
};

export type ApiResponse<T = any> = {
  status: number,
  body: T | ExceptionResponseBody | null
};

export async function apiRequest<T = void>({
  url, 
  method = "GET", 
  body,
  headers = {}
} : ApiRequestParams) : Promise<ApiResponse<T>> {

  let jwt : string | null;
  const localStorageItem : string | null = localStorage.getItem("bmgUser");
  
  jwt = localStorageItem === null || localStorageItem === "null" ? null : (JSON.parse(localStorageItem) as User).jwt;

  const response = await fetch(url, {
    method,
    headers: {
      Authorization: !jwt ? "" : "Bearer " + jwt,
      ...headers,
    },
    ...(method !== "GET" && body ? {body} : {})
  });

  let responseBody = await response.json().catch(() => null);

  if (response.status >= 400 && response.status <= 599) {
    return {status: response.status, body: responseBody as ExceptionResponseBody};
  }

  return {status: response.status, body: responseBody as T};
}
