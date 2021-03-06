const moment = require('moment');
let mongoose = require('mongoose');
const shortID = require('shortid');

const urlSchema = mongoose.Schema({
    uuid:           { type: String, default: shortID.generate, unique: true },
    url:            { type: String, required: true },
    createdAt:      { type: Date, expires: '30m', default: moment }
});

let Url = module.exports = mongoose.model('url', urlSchema);

module.exports.get = function (callback, limit) {
    Url.find(callback).limit(limit);
};
