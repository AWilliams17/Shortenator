let mongoose = require('mongoose');
const shortID = require('shortid');

const urlSchema = mongoose.Schema({
    shortcode:            { type: String, default: shortID.generate, unique: true },
    original_url:   { type: String, required: true },
    createdAt:      { type: Date, expires: '30m', default: Date.now }
});

let Url = module.exports = mongoose.model('url', urlSchema);

module.exports.get = function (callback, limit) {
    Url.find(callback).limit(limit);
};
