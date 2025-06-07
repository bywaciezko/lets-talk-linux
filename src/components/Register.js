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
        <form onSubmit={handleSubmit} className="login-container">
            <div className="login-box">
                <h2 className="element">Sign up</h2>

                <input
                    className="login-input"
                    placeholder="Name"
                    value={nick}
                    onChange={(e) => setNick(e.target.value)}
                    required
                />

                <input
                    className="login-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button className="login-button" type="submit">
                    Register
                </button>

                {error && <div className="login-error">{error}</div>}

                <button className="back-button" type="button" onClick={onBack}>
                    Go back
                </button>
            </div>
        </form>
    );
}
