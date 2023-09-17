import { createContext, useContext } from "react";
import { useState } from "react";
import { executeBasicAuthentication, executeJwtAuthentication } from "../api/AuthenticationApiService";
import { apiClient } from "../api/ApiClient";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {

    const [isAuthenticated, setAuthenticated] = useState(false);
    const [username, setUsername] = useState("");
    const [token, setToken] = useState("");

    async function loginControl(username, password) {

        var response = "";
        var token = "";
        var flag = false;
        try {
            response = await executeJwtAuthentication(username, password);
            flag = true;
        } catch (error) {
            flag = false;
        }
        if (flag === true && response.status === 200) {
            token = "Bearer " + response.data.token;
            setAuthenticated(true);
            setUsername(username);
            setToken(token);
            apiClient.interceptors.request.use(
                (config) => {
                    console.log("interceping and adding authorization header");
                    config.headers.Authorization = token;
                    return config;
                }
            );
            return true;
        } else {
            logoutControl();
            return false;
        }
    }

    function logoutControl() {
        setAuthenticated(false);
        setToken(null);
        setUsername(null);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, loginControl, logoutControl, username, token }}>
            {children}
        </AuthContext.Provider>
    );
}