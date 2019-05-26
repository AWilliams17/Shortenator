let mongoose = require('mongoose');

const urlSchema = mongoose.Schema({

});

let Url = module.exports = mongoose.model('url', urlSchema);

module.exports.get = function (callback, limit) {
    Url.find(callback).limit(limit);
};