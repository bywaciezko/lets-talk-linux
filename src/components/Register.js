import { useState } from "react";

export default function Register({ onRegister, onBack }) {
    const [nick, setNick] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const res = await fetch("http://localhost:5000/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nick, password }),
        });

        const data = await res.json();
        if (data.status === "ok") {
            onRegister(nick);
        } else {
            setError(data.msg);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Name"
                value={nick}
                onChange={(e) => setNick(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button>Register</button>
            {error && <div style={{ color: "red" }}>{error}</div>}

            <button type="button" onClick={onBack}>
                Go back
            </button>
        </form>
    );
}
