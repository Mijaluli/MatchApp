const mongoose = require('mongoose')
const matchmakerSchema = mongoose.Schema({
title: {type: String, required: true},
content: {type: String, required: true},
imagePath: {type: String, required: true},
cityName:{type: String},
firstName:{type: String},
lastName:{type: String},
mainPhone:{type: String},
secondPhone:{type: String},
ageRange:{type: String},
age:{type: String},
academy:{type: String},
remark:{type: String},
areaToSale:{type: String},
//IdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'Candidate'},

//comments: [{body:"string", by: mongoose.Schema.Types.ObjectId}],

});
module.exports = mongoose.model('Matchmaker', matchmakerSchema);