import { apiClient } from "./ApiClient";

export function executeBasicAuthentication(token) {
    return (
        apiClient.get("/basic-auth", {
            headers: {
                Authorization: token
            }
        })
    );
}

export function executeJwtAuthentication(username, password) {
    return (
        apiClient.post("/authenticate", { username, password })
    );
}