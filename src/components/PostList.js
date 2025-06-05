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
        <div>
            {filteredPosts.map((p) => (
                <div key={p.id}>
                    <strong>{p.nick}</strong> (
                    {new Date(p.time).toLocaleString()}) [{p.category}]
                    <p>{p.content}</p>
                    {p.image && (
                        <img
                            src={`http://localhost:5000${p.image}`}
                            alt="Post image"
                            style={{ maxWidth: "100%" }}
                        />
                    )}
                    <Comments postId={p.id} user={user} />
                </div>
            ))}
        </div>
    );
}
