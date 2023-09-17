import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./security/AuthContext";
export default function LoginComponent() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const navigate = useNavigate();
    const authenticationContext = useAuth();

    function handelUserNameChange(event) {
        setUsername(event.target.value);
    }

    function handelPasswordChange(event) {
        setPassword(event.target.value);
    }

    async function handeleSubmit(event) {
        if (await authenticationContext.loginControl(username, password)) {
            console.log("authenticated");
            navigate(`/welcome/${username}`);
        }
        else {
            setShowErrorMessage(true);
        }
    }

    return (
        <div className="loginComponent">
            <h1>Authenticate your identity !!</h1>
            {showErrorMessage && <div className="errorMessage">Authentication Failed !!</div>}
            <div className="loginForm">
                <div>
                    <label>Username</label>
                    <input type="text" name="username" placeholder="username" value={username} onChange={handelUserNameChange} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" placeholder="password" value={password} onChange={handelPasswordChange} />
                </div>
                <div>
                    <button type="submit" name="signin" onClick={handeleSubmit}>LOG IN</button>
                </div>
            </div>
        </div>
    );
}