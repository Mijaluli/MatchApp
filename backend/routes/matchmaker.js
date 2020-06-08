var express = require("express");
const multer = require("multer");

const Matchmaker = require("../models/matchmaker");

const router = express.Router();

//
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});
//--------------
router.post(
  "",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    console.log("post");
   const url = req.protocol + "://" + req.get("host");
    const matchmaker = new Matchmaker({
      title: req.body.title,
      content: req.body.content,
      imagePath: url + "/images/" + req.file.filename,
      cityName:req.body.cityName,
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      mainPhone: req.body.mainPhone,
      secondPhone:req.body.secondPhone,
      ageRange:req.body.ageRange,
      age:req.body.age,
      academy:req.body.academy,
      remark:req.body.remark,
      areaToSale:req.body.areaToSale,
    });
  
    matchmaker.save().then(createdMatchmaker => {
      res.status(201).json({
        message: "matchmaker added successfully",
        matchmaker: {
          ...createdMatchmaker,
          id: createdMatchmaker._id
        }
      });
    });
  }
);
//update where...
router.put(
  "/:id",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }
    const matchmaker = new Matchmaker({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      //id: req.body.id,//
      imagePath: url + "/images/" + req.file.filename,
      cityName:req.body.cityName,
      firstName:req.body.firstName,
      lastName:req.body.lastName,
      mainPhone: req.body.mainPhone,
      secondPhone:req.body.secondPhone,
      ageRange:req.body.ageRange,
      age:req.body.age,
      academy:req.body.academy,
      remark:req.body.remark,
      areaToSale:req.body.areaToSale
    });
    console.log(matchmaker);
    Matchmaker.updateOne({ _id: req.params.id }, matchmaker).then(result => {
      res.status(200).json({ message: "Update successful!" });
    });
  }
);

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const matchmakerQuery = Matchmaker.find();
  let fetchedMatchmakers;
  if (pageSize && currentPage) {
    matchmakerQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  matchmakerQuery
    .then(documents => {
      fetchedMatchmakers = documents;
      return Matchmaker.count();//.count
    })
    //l
    .then(count => {
      res.status(200).json({
        message: "Matchmakers fetched successfully!",
        matchmakers: fetchedMatchmakers,
        maxMatchmakers: count
      });
    });
});

router.get("/:id", (req, res, next) => {
  Matchmaker.findById(req.params.id).then(matchmaker => {
    if (matchmaker) {
      res.status(200).json(matchmaker);
    } else {
      res.status(404).json({ message: "Matchmaker not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Matchmaker.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Matchmaker deleted!" });
  });
});

module.exports = router;
