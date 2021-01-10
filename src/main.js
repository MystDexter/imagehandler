const express = require('express');
const app = express();

const multer = require('multer');
const upload = multer({dest: 'uploads'});

app.get("/", (req, res) => {
    res.sendStatus(200);
});

app.post("/file-upload", upload.single('file'), (req, res) => {
    res.sendStatus(200);
});

app.listen(3000);