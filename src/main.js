const express = require('express');
const app = express();
const multer = require('multer');
const port = 3000;
const fs = require("fs");
const Unzipper = require("decompress-zip");

const cors = require("cors");
app.use(cors()); // allowing all users to make call

const path = require('path');
const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image') || file.mimetype.startsWith('application/zip')) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};
// Make file names readable
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'./public/uploads'))
    },
    filename: function (req, file, cb) {
      // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);

      // Use timestamp to keep image names unique and allow for same image uploads
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
const upload = multer({ storage: storage, fileFilter: imageFilter });

// Define the static file path
app.use(express.static(__dirname+'/public'));

// local model
const fileHandler = require('./fileHandler');

app.get("/", (req, res) => {
    res.sendStatus(200);
});

app.get("/file-list", async (req, res) => {
  const results = await fileHandler.fileList();
  res.json(results);
});

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

app.post("/zip-upload", upload.single("file"), (req, res) => {
  if (req.file){

    var filepath = path.join(req.file.destination, req.file.filename);
    var unzipper = new Unzipper(filepath);

    unzipper.on("extract", function () {
      console.log("Finished extracting");
      fs.unlink(filepath, function (e) {
        if (e) throw e;
        console.log('successfully deleted '+filepath);
      });
    });

    unzipper.extract({ path: 'uploads'});
  }

  res.json({ status: "ok" })
});

app.listen(port, () => console.log('The server running on Port '+port));