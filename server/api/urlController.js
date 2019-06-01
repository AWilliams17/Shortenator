/* eslint-disable no-unused-vars,no-console */
const Url = require('./urlModel');
const validUrl = require('valid-url');

module.exports.create_url = function (req, res) {
    const url_to_shorten = req.body.url;
    if (!url_to_shorten) {
        return res.status(400).json({
            'error': 'A url is required.'
        });
    }

    if (!validUrl.isUri(url_to_shorten)) {
        return res.status(400).json({
            'error': 'A valid url is required.'
        });
    }

    let url = new Url();
    url.original_url = url_to_shorten;
    Url.create(url, function (err) {
        if (err) return res.status(500).json({
            'error': err.message
        });

        return res.status(201).json({
            'url_shortcode': url.shortcode
        });
    });
};

module.exports.get_url = function (req, res) {

};