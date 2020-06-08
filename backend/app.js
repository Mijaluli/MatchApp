const express=require('express');

const mongoose = require('mongoose');
const Candidate = require('./models/candidate');
const Matchmaker = require('./models/matchmaker');
const User = require('./models/user');
const config = require('./config');

var bodyParser = require('body-parser')
var path = require("path");
 const app = express();
app.use(express.json());
////
const candidatesRoutes = require("./routes/candidates");
const matchmakersRoutes = require("./routes/matchmaker");
const citiesRoutes = require("./routes/cities");
const userRoutes = require('./routes/account');

var items =[{}];
mongoose.connect("mongodb://localhost:27017/testCandidates", function(err, db) {
    if(err) { console.log('Connected failed to database!'); return console.dir(err); } //handling errors
else{

    console.log('Connected to database!');
  
}
});

// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


//app.use("/images", express.static(path.join("backend/images")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/", express.static(path.join(__dirname, "angular")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"// Access-Control-Max-Age,
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});



app.use("/api/candidates", candidatesRoutes);

app.use("/api/matchmaker", matchmakersRoutes);
app.use("/api/cities", citiesRoutes);
app.use("/api/accounts", userRoutes);

app.use((req,res,next) => {
	res.sendFile(path.join(__dirname,"angular",index.html));
});
//------------


module.exports = app;
