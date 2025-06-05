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
                <div>
                    <h2>Welcome to I use Arch btw</h2>
                    <button onClick={() => setMode("login")}>Log In</button>
                    <button onClick={() => setMode("register")}>Sign Up</button>
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
