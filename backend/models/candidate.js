const mongoose = require('mongoose')
const candidateSchema = mongoose.Schema({
title: {type: String, required: true},
content: {type: String, required: true},
//id: {type: String, required: true},
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
area:{type: String},
female:{type: String},
colorEye:{type: String},
colorHair: {type: String},
colorSkin:{type: String},
eda:{type: String},
hobies:{type: String},
street:{type: String},
sector:{type: String}
//cityIdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'City'},

//comments: [{body:"string", by: mongoose.Schema.Types.ObjectId}],

});
module.exports = mongoose.model('Candidate', candidateSchema);