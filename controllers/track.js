const express = require("express");
const router = express.Router();
var cloudinary = require("cloudinary");
var multer = require("multer");
const Parcel = require("../models/parcel");
var storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
var imageFilter = function (req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter });

var cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "avwunufe",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.get("/", async (req, res) => {
  try {
    const { parcelId } = req.query;
    const parcel = await Parcel.findOne({ parcelId });
    return res.render("trackingpage", { parcel });
  } catch (error) {
    res.sendStatus(500);
  }
});

router.get("/findAll", async (req, res) => {
  try {
    const parcels = await Parcel.find();
    return res.status(200).send(parcels);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    let {
      clientName,
      clientEmail,
      clientLocation,
      senderName,
      senderEmail,
      senderLocation,
      weight,
      location,
      movementDate,
      arrivalDate,
      status,
      comment,
    } = req.body;

    const data = {
      clientName,
      clientEmail,
      clientLocation,
      senderName,
      senderEmail,
      senderLocation,
      weight,
      location,
      movementDate,
      arrivalDate,
      status,
      comment,
    };

    const parcelId = `LA${Math.floor(Math.random() * 100000000)}`;
    const parcels = await Parcel.find({}, { parcelId: 1 });

    let allParcelId = parcels.map((parcel) => parcel.parcelId);

    while (allParcelId.includes(parcelId)) {
      parcelId = `LA${Math.floor(Math.random() * 100000000)}`;
    }
    // let { public_id, secure_url } = await cloudinary.uploader.upload(
    //   tempFilePath
    // );

    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.file.path
    );

    await new Parcel({
      ...data,
      parcelId,
      parcelRecipt: { public_id, secure_url },
    }).save();

    // await sendDeliveryMail({ parcelId, clientEmail: data.clientEmail, clientName: data.clientName });
    return res.status(200).send("success");
  } catch (error) {
    res.sendStatus(500);
    console.log(error);
  }
});

module.exports = router;
