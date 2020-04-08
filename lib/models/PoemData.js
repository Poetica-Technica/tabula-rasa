const mongoose = require('mongoose');
const request = require('superagent');
const { Router } = require('express');


const schema = new mongoose.Schema({
});
module.exports = mongoose.model('PoemData', schema);
