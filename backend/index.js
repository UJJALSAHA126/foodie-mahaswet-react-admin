const express = require("express");
const multer = require("multer")
const ImageKit = require("imagekit")
const cors = require('cors')
const dotenv = require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const upload = multer({ limits: { fileSize: 1000000000000 } })

const imageKit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_API,
  privateKey: process.env.IMAGEKIT_PRIVATE_API,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
})


app.post("/", (req, res) => {
  res.send("Hello I am active");
})


app.listen(PORT, (error) => {
  if (!error) console.log(`Backend listening on port ${PORT}`);
  else console.log("Error occurred, server can't start", error);
});


app.post("/uploads", upload.single("file"), async (req, res) => {
  if (!req.file) {
    console.log("No files Selected");
    res.send("No files Selected");
    return;
  }

  console.log('File = ', req.file);
  // res.send({ stats: "This is in demo mode" });

  try {
    await uploadFileToImageKit(req.file, req, res)

  } catch (error) {
    const success = false;
    return res.status(500).json({
      success,
      message: "An error occured during file upload. Please try again.",
      error
    })
  }

})

const uploadFileToImageKit = async (file, req, res) => {
  let success = true;

  await imageKit.upload({
    file: file.buffer.toString('base64'), //required
    fileName: file.originalname,   //required
    folder: "backend_demo/images/",
    extensions: [
      {
        name: "google-auto-tagging",
        maxTags: 5,
        minConfidence: 95
      }
    ]
  })
    .then(async (response) => {
      await res.json({ success, message: "Successfully uploaded files", url: response.url, response });
    })
    .catch((error) => {
      success = false;
      res.status(500).json({
        success,
        message: "An error occured during file upload. Please try again.",
        error
      })
    })
}