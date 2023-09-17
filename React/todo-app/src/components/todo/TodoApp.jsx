import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./TodoApp.css";
import LogoutComponent from "./LogoutComponent";
import HeaderComponent from "./HeaderComponent";
import WelcomeComponent from "./WelcomeComponent";
import ErrorComponent from "./ErrorComponent";
import ListTodosComponent from "./ListTodosComponent";
import LoginComponent from "./LoginComponent";
import AuthProvider, { useAuth } from "./security/AuthContext";
import TodoUpdateComponent from "./TodoServiceComponent";

function AuthenticatedRoute({ children }) {
    const authenticationContext = useAuth();
    if (authenticationContext.isAuthenticated) {
        return children;
    }
    else {
        return <Navigate to="/" />
    }
}

export default function TodoApp() {
    return (
        <div className="todoApp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent />
                    <Routes>
                        <Route path="/" element={<LoginComponent />} />
                        <Route path="/login" element={<LoginComponent />} />
                        <Route path="/welcome/:username" element={<AuthenticatedRoute> <WelcomeComponent /> </AuthenticatedRoute>} />
                        <Route path="/todos" element={<AuthenticatedRoute> <ListTodosComponent /> </AuthenticatedRoute>} />
                        <Route path="/todo/:id" element={<AuthenticatedRoute> <TodoUpdateComponent /> </AuthenticatedRoute>} />
                        <Route path="/logout" element={<LogoutComponent />} />
                        <Route path="*" element={<ErrorComponent />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}