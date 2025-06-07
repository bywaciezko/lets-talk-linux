import { useEffect, useState } from "react";
import Comments from "./Comments";

export default function PostList({ refresh, selectedCategory, user }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/message")
            .then((res) => res.json())
            .then((data) => setPosts(data.posts.reverse()));
    }, [refresh]);

    const filteredPosts =
        selectedCategory === "all"
            ? posts
            : posts.filter((p) => p.category === selectedCategory);

    return (
        <div className="post-list">
            {filteredPosts.map((p) => (
                <div className="post-box" key={p.id}>
                    <div className="post-meta">
                        <strong>{p.nick}</strong> (
                        {new Date(p.time).toLocaleString()}) [{p.category}]
                    </div>
                    <p className="post-content">{p.content}</p>
                    {p.image && (
                        <img
                            src={`http://localhost:5000${p.image}`}
                            alt=""
                            className="post-image"
                        />
                    )}
                    <Comments postId={p.id} user={user} />
                </div>
            ))}
        </div>
    );
}
