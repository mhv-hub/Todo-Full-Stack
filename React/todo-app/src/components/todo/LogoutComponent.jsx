import { useEffect } from "react";
import { useAuth } from "./security/AuthContext";

export default function LogoutComponent() {

    const authenticationContext = useAuth();

    useEffect(() => {
        authenticationContext.logoutControl();
    });

    return (
        <div className="logoutComponent">
            <h1>You have been logged out !!</h1>
            <div>
                Thank you for using the app, please come back again.
            </div>
        </div>
    );
}