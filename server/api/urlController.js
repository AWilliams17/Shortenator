/* eslint-disable no-unused-vars,no-console */
const Url = require('./urlModel');
const validUrl = require('valid-url');
const moment = require('moment');

module.exports.create_url = function (req, res) {
    const url = req.body.url;
    if (!url) return res.status(400).json({
        'error': 'A url is required.'
    });

    if (!validUrl.isUri(url)) return res.status(400).json({
        'error': 'A valid url is required.'
    });

    let urlEntry = new Url();
    urlEntry.url = url;
    Url.create(urlEntry, function (err) {
        if (err) return res.status(500).json({
            'error': err.message
        });

        return res.status(201).json({
            'url_shortcode': urlEntry.shortcode
        });
    });
};

module.exports.get_url = function (req, res) {
    const shortcode = req.params.url_shortcode;
    if (!shortcode) return res.status(400).json({
        'error': 'A shortcode is required.'
    });

    Url.findOne({'shortcode': shortcode}, function (err, urlEntry) {
        if (err || !urlEntry) return res.status(401).json({
            'error': 'No matching entries with that shortcode found.'
        });

        const expirationDate = moment(urlEntry.createdAt).add(30, 'minutes');
        return res.status(200).json({
            'url': urlEntry.url,
            'expiration_date': expirationDate
        });
    });
};