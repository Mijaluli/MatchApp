var express = require("express");
const multer = require("multer");

const City = require("../models/city");

const router = express.Router();

//--------------
router.post(
//nnn
  "",//""hhgg
  //multer({ storage: storage }).single("image"),
  (req, res, next) => {
    console.log("post");
  
    const city = new City({
      cityName: req.body.cityName
    });
  
    city.save().then(createdCity => {
     
      res.status(201).json({
        message: "City added successfully",
        city: {
          ...createdCity,
          id: createdCity._id
        }
      });
    });
  }
);
//update where...
router.put(
  "/:id",
  //multer({ storage: storage }).single("image"),
  (req, res, next) => {

    
    const city = new City({
      _id: req.body.id,
      cityName: req.body.cityName
     
    });
    console.log(city);
    City.updateOne({ _id: req.params.id }, city).then(result => {
      res.status(200).json({ message: "Update successful!" });
    });
  }
);

router.get("", (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const cityQuery = City.find();
  let fetchedCities;
  if (pageSize && currentPage) {
    cityQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  cityQuery
    .then(documents => {
      fetchedCities = documents;
      return City.count();//.count
    })
    //l
    .then(count => {
      res.status(200).json({
        message: "City fetched successfully!",
        cities: fetchedCities,
        maxCities: count
      });
    });
});

router.get("/:id", (req, res, next) => {
  City.findById(req.params.id).then(city => {
    if (city) {
      res.status(200).json(city);
    } else {
      res.status(404).json({ message: "City not found!" });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  City.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "City deleted!" });
  });
});

module.exports = router;
