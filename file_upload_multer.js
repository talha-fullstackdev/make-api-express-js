import express from "express";
import multer from "multer";
import connectiondb from "./db/connectiondb.js";
import file from "./model/fileModel.js";
connectiondb();
const app = express();
const fileUpload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callBack) {
      callBack(null, "uploads");
    }, // here we have to pass three parameters req,file and a callback function
    filename: function (req, file, callBack) {
      const uniqueName = file.fieldname + "-" + Date.now() + ".jpg";
      callBack(null, uniqueName);
    },
  }),
}).single("my_file");
app.post("/fileupload",fileUpload, (req, res) => {
  if (!req.file) {
    return res.status(400).send("no file uploaded");
  }
  const newFile = new file({
    filepath: req.file.path
  });
  newFile.save()
    .then(() => res.send("file uploaded"))
    .catch((err) => res.send("error while uploading file", err));
});
app.listen(3000, () => {
  console.log("server started http://localhost:3000");
});
