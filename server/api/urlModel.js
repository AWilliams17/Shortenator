let mongoose = require('mongoose');

const urlSchema = mongoose.Schema({
    original_url:   { type: String, required: true, unique: false },
    shortcode:      { type: String, required: true, unique: true },
    createdAt:      { type: Date, expires: '30m', default: Date.now }
});

let Url = module.exports = mongoose.model('url', urlSchema);

module.exports.get = function (callback, limit) {
    Url.find(callback).limit(limit);
};
