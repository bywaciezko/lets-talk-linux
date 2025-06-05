import { useState } from "react";

export default function PostForm({ user, onPost, categories }) {
    const [text, setText] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!category) return;

        const formData = new FormData();
        formData.append("nick", user);
        formData.append("content", text);
        formData.append("category", category);
        if (image) formData.append("image", image);

        await fetch("http://localhost:5000/api/message", {
            method: "POST",
            body: formData,
        });

        setText("");
        setImage(null);
        onPost();
    };

    return (
        <form onSubmit={handleSubmit}>
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            >
                <option disabled hidden value="">
                    Choose category...
                </option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>

            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your post..."
                required
            />

            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
            />

            <button>Send</button>
        </form>
    );
}
