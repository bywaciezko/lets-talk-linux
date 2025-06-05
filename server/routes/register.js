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
        return res
            .status(409)
            .json({ status: "error", msg: "This name is taken" });
    }

    users.push({ nick, password });
    save("users.json", users);
    return res.json({ status: "ok", user: nick });
});

module.exports = router;
