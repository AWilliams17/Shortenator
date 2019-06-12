/* eslint-disable no-unused-vars,no-console */
const Url = require('./urlModel');
const validUrl = require('valid-url');
const moment = require('moment');

module.exports.create_uuid = function (req, res) {
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
            'uuid': urlEntry.uuid
        });
    });
};

module.exports.redirect = function (req, res) {
    const uuid = req.params.uuid;
    if (!uuid) return res.status(400).json({
        'error': 'A uuid is required.'
    });

    Url.findOne({'uuid': uuid}, function (err, urlEntry) {
        if (err || !urlEntry) return res.status(404).json({
            'error': 'No matching entries with that uuid found.'
        });
        console.log(urlEntry.createdAt);
        return res.status(200).json({
            'url': urlEntry.url,
            'submission_date': urlEntry.createdAt
        });
    });
};
