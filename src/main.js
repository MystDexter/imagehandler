const express = require('express');
const app = express();

const multer = require('multer');
const path = require('path');
// Make file names readable
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

      // Use timestamp to keep image names unique and allow for same image uploads
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
const upload = multer({ storage: storage });

app.get("/", (req, res) => {
    res.sendStatus(200);
});

app.post("/file-upload", upload.single("file"), (req, res) => {
    // Read file information
    const file = req.file;
    const input = req.body;
    res.sendStatus(200);
});

app.listen(3000);