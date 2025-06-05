const express = require("express");
const cors = require("cors");
const path = require("path");

const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/register");
const postRoutes = require("./routes/posts");
const categoriesRoutes = require("./routes/categories");
const commentsRoutes = require("./routes/comments");

const app = express();
const PORT = 5000;

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(express.json());

app.use("/api/login", loginRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/message", postRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/comments", commentsRoutes);

app.listen(PORT, () => {
    console.log(`Backend działa na http://localhost:${PORT}`);
});
