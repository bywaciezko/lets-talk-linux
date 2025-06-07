import { useEffect, useState } from "react";

export default function Comments({ postId, user }) {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        fetch(`http://localhost:5000/api/comments/${postId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "ok") setComments(data.comments);
            });
    }, [postId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        await fetch("http://localhost:5000/api/comments", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                postId,
                author: user,
                content: text.trim(),
            }),
        });

        setComments([...comments, { postId, author: user, content: text }]);
        setText("");
    };

    return (
        <div className="comments-box">
            <h4>Comments</h4>
            <ul className="comments-list">
                {comments.map((c, i) => (
                    <li key={i}>
                        <strong>{c.author}:</strong> {c.content}
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit} className="comments-form">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Join a conversation"
                    className="comment-input"
                />
                <button className="comment-button">Add</button>
            </form>
        </div>
    );
}
