const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.sendStatus(200);
});

app.post("/file-upload", (req, res) => {
    res.sendStatus(200);
});

app.listen(3000);