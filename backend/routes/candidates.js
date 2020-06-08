var express = require("express");
const multer = require("multer");

const Candidate = require("../models/candidate");

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
   console.log("post-url");
   console.log(url);
    const candidate = new Candidate({
      title: req.body.title,
      content: req.body.content,
      
      //id: req.body.id,
      
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
      area:req.body.area,
      female:req.body.female,
      colorEye: req.body.colorEye,
      colorHair: req.body.colorHair,
      colorSkin: req.body.colorSkin, 
      eda: req.body.eda,
      hobies: req.body.hobies,
      street:req.body.street,
      sector:req.body.sector
    });
  
    candidate.save().then(createdCandidate => {
     // console.log(createdCandidate);
      res.status(201).json({
        message: "Candidate added successfully",
        candidate: {
          ...createdCandidate,
          id: createdCandidate._id
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
      
      console.log("update-url");
      console.log(url);

      imagePath = url + "/images/" + req.file.filename;
    }
    const candidate = new Candidate({
      _id: req.body.id,
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
      area:req.body.area,
      female:req.body.female,
      colorEye: req.body.colorEye,
      colorHair: req.body.colorHair,
      colorSkin: req.body.colorSkin, 
      eda: req.body.eda,
      hobies: req.body.hobies,
      street:req.body.street,
      sector:req.body.sector
    });
    console.log(candidate);
    
    Candidate.updateOne({ _id: req.params.id }, candidate).then(result => {
      res.status(200).json({ message: "Update successful!" });
    });
  }
);

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const candidateQuery = Candidate.find();
  let fetchedCandidates;
  if (pageSize && currentPage) {
    candidateQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  candidateQuery
    .then(documents => {
      fetchedCandidates = documents;
      return Candidate.count();//.count
    })
    //l
    .then(count => {
      res.status(200).json({
        message: "Candidates fetched successfully!",
        candidates: fetchedCandidates,
        maxCandidates: count
      });
    });
});

router.get("/:id", (req, res, next) => {
  Candidate.findById(req.params.id).then(candidate => {
    if (candidate) {
      res.status(200).json(candidate);
    } else {
      res.status(404).json({ message: "Candidate not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Candidate.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Candidate deleted!" });
  });
});

module.exports = router;
