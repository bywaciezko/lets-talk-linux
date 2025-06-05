import "../styles/Home.css";
import { useEffect, useState } from "react";
import PostForm from "./PostForm";
import PostList from "./PostList";

function CategoryManager({
    categories,
    setCategories,
    selectedCategory,
    setSelectedCategory,
}) {
    const [error, setError] = useState("");
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = inputValue.trim();
        if (!name) return;

        const res = await fetch("http://localhost:5000/api/categories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ category: name }),
        });

        const data = await res.json();

        if (data.status === "ok") {
            setCategories([...categories, name]);
            setInputValue("");
            setError("");
        } else {
            setError(data.msg);
        }
    };

    return (
        <div>
            <h2>Categories</h2>
            <ul>
                <li
                    style={{
                        fontWeight:
                            selectedCategory === "all" ? "bold" : "normal",
                        cursor: "pointer",
                    }}
                    onClick={() => setSelectedCategory("all")}
                >
                    All
                </li>
                {categories.map((cat) => (
                    <li
                        key={cat}
                        style={{
                            fontWeight:
                                selectedCategory === cat ? "bold" : "normal",
                            cursor: "pointer",
                        }}
                        onClick={() => setSelectedCategory(cat)}
                    >
                        {cat}
                    </li>
                ))}
            </ul>

            <form onSubmit={handleSubmit}>
                <input
                    name="catName"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="New category"
                />
                <button>Add</button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default function Home({ user, onLogout }) {
    const [refreshKey, setRefreshKey] = useState(0);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");

    useEffect(() => {
        fetch("http://localhost:5000/api/categories")
            .then((res) => res.json())
            .then((data) => {
                if (data.status === "ok") {
                    const catNames = data.posts.map((c) => c.category);
                    setCategories(catNames);
                }
            });
    }, []);

    return (
        <div className="home-container">
            <div className="sidebar">
                <p>Logged as: {user}</p>
                <button onClick={onLogout}>Log out</button>
                <CategoryManager
                    categories={categories}
                    setCategories={setCategories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
            </div>

            <div className="main">
                <div className="topbar">
                    <h1>Hello {user}!</h1>
                </div>

                <PostForm
                    user={user}
                    onPost={() => setRefreshKey((k) => k + 1)}
                    categories={categories}
                />
                <PostList
                    refresh={refreshKey}
                    selectedCategory={selectedCategory}
                    user={user}
                />
            </div>
        </div>
    );
}
