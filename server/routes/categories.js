const express = require("express");
const { load, save } = require("../utils/fileStorage");
const router = express.Router();

router.get("/", (req, res) => {
    const posts = load("categories.json");
    res.json({ status: "ok", posts });
});

router.post("/", (req, res) => {
    const { category } = req.body;
    if (!category)
        return res
            .status(400)
            .json({ status: "error", msg: "Please fill the required fields" });

    const categories = load("categories.json");
    const cat = categories.find((c) => c.category === category);

    if (cat) {
        return res
            .status(409)
            .json({ status: "error", msg: "This category already exists" });
    }
    categories.push({
        category,
    });
    save("categories.json", categories);
    res.json({ status: "ok", category: category });
});
module.exports = router;
