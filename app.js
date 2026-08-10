const express = require("express");
const basicAuth = require("express-basic-auth");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

// Public route
app.get("/", (req, res) => {
    res.send("Hello, world!");
});

// Protected route
app.use(
    "/secret",
    basicAuth({
        users: {
            [process.env.USERNAME]: process.env.PASSWORD
        },
        challenge: true
    })
);

app.get("/secret", (req, res) => {
    res.send(process.env.SECRET_MESSAGE);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
