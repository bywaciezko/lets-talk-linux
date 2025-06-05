const express = require("express");
const { load, save } = require("../utils/fileStorage");
const router = express.Router();

router.post("/", (req, res) => {
    const { nick, password } = req.body;
    if (!nick || !password)
        return res
            .status(400)
            .json({ status: "error", msg: "Please fill the required fields" });

    const users = load("users.json");
    const user = users.find((u) => u.nick === nick);

    if (user) {
        if (user.password === password) {
            return res.json({ status: "ok", user: nick });
        } else {
            return res
                .status(401)
                .json({ status: "error", msg: "Incorrect password" });
        }
    } else {
        return res.status(404).json({ status: "error", msg: "User not found" });
    }
});

module.exports = router;
