const express = require("express");
const { load, save } = require("../utils/fileStorage");
const router = express.Router();

router.post("/", (req, res) => {
    const { postId, author, content } = req.body;
    if (!postId || !author || !content)
        return res.status(400).json({ status: "error", msg: "Missing fields" });

    const comments = load("comments.json");

    comments.push({ postId, author, content, timestamp: Date.now() });
    save("comments.json", comments);
    res.json({ status: "ok" });
});

router.get("/:postId", (req, res) => {
    const comments = load("comments.json");
    const filtered = comments.filter((c) => c.postId === req.params.postId);
    res.json({ status: "ok", comments: filtered });
});

module.exports = router;
