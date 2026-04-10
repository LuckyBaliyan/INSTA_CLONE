const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes");
const userRouter  = require("./routes/user.routes");

const app = express();
app.use(cookieParser());
app.use(express.json());

//have to pass these details to store cookies at frontend side
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173"
}));

app.use("/api/auth",authRouter);
app.use("/api/posts",postRouter);
app.use("/api/users", userRouter);

module.exports = app;