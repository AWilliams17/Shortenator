/* eslint-disable no-unused-vars,no-console */
const Url = require('./urlModel');
const validUrl = require('valid-url');
const moment = require('moment');

module.exports.create_redirect_key = function (req, res) {
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
            'redirect_key': urlEntry.redirect_key
        });
    });
};

module.exports.redirect = function (req, res) {
    const redirect_key = req.params.redirect_key;
    if (!redirect_key) return res.status(400).json({
        'error': 'A redirect key is required.'
    });

    Url.findOne({'redirect_key': redirect_key}, function (err, urlEntry) {
        if (err || !urlEntry) return res.status(404).json({
            'error': 'No matching entries with that redirect key found.'
        });

        const expirationDate = moment(urlEntry.createdAt).add(30, 'minutes');
        return res.status(200).json({
            'url': urlEntry.url,
            'expiration_date': expirationDate
        });
    });
};
