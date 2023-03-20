const express = require("express");
const multer = require("multer")
const ImageKit = require("imagekit")
const cors = require('cors')

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

const upload = multer({ limits: { fileSize: 1000000000000 } })


app.post("/", (req, res) => {
  // console.log(typeof req);
  // console.log(req.body);
  // console.log(req.body.files);
  res.send("Hello I am active");
  // res.json(req);
})


app.listen(PORT, (error) => {
  if (!error) console.log(`Backend listening on port ${PORT}`);
  else console.log("Error occurred, server can't start", error);
});


const imageKit = new ImageKit({
  publicKey: "public_tKlquotKsQW+zbuYSLf7/FUaSSA=",
  privateKey: "private_VuxRBmFUjYO2aXq8OCtGkMjJGUY=",
  urlEndpoint: "https://ik.imagekit.io/hbl5agpen",
})

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
  }).then(async (response) => {
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