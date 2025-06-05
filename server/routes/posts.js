const express = require("express");
const { load, save } = require("../utils/fileStorage");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Multer setup
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    },
});
const upload = multer({ storage });

// GET posts
router.get("/", (req, res) => {
    const posts = load("posts.json");
    res.json({ status: "ok", posts });
});

// POST with optional image
router.post("/", upload.single("image"), (req, res) => {
    const { nick, content, category } = req.body;
    if (!nick || !content || !category)
        return res.status(400).json({ status: "error", msg: "Missing fields" });

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const posts = load("posts.json");
    posts.push({
        id: Date.now().toString(),
        nick,
        content,
        time: Date.now(),
        category,
        image: imageUrl,
    });

    save("posts.json", posts);
    res.json({ status: "ok" });
});

module.exports = router;
