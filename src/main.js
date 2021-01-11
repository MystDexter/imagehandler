const express = require('express');
const app = express();

const cors = require("cors");
app.use(cors()); // allowing all users to make call

const multer = require('multer');
const path = require('path');
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};
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
const upload = multer({ storage: storage, fileFilter: imageFilter });

// Middleware service to make the uploads folder public
app.use(express.static('uploads'));

// local module
const fileHandler = require('./fileHandler');

app.get("/", (req, res) => {
    res.sendStatus(200);
});

app.get("/file-list", async (req, res) => {
  const results = await fileHandler.fileList();

  res.json(results); 
})

app.post("/file-upload", upload.single("file"), async (req, res) => {
    // Read file information
    const file = req.file;
    const input = req.body;

    await fileHandler.processSingleFile(file);

    // res.sendStatus(200);
    res.json({ status: "ok" })
});

// API to allow multiple file upload
app.post("/multi-upload", upload.array("file"), async (req, res) => {
    const fileList = req.files;
    const input = req.body;

    await fileHandler.processMultiFile(fileList);

    // res.sendStatus(200);
    res.json({ status: "ok" })
});

app.listen(3000);