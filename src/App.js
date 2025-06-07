import "./App.css";
import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

export default function App() {
    const [user, setUser] = useState(null);
    const [mode, setMode] = useState("choose");

    if (!user) {
        if (mode === "choose") {
            return (
                <div className="login-container">
                    <div className="login-box">
                        <h2 className="element">Let's talk Linux together!</h2>
                        <button onClick={() => setMode("login")}>Log In</button>
                        <button onClick={() => setMode("register")}>
                            Sign Up
                        </button>
                    </div>
                </div>
            );
        }

        if (mode === "login") {
            return <Login onLogin={setUser} onBack={() => setMode("choose")} />;
        }
        if (mode === "register") {
            return (
                <Register
                    onRegister={setUser}
                    onBack={() => setMode("choose")}
                />
            );
        }
    }
    return (
        <Home
            user={user}
            onLogout={() => {
                setUser(null);
                setMode("choose");
            }}
        />
    );
}
