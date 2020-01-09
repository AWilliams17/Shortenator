const Url = require('./urlModel');
const validUrl = require('valid-url');

module.exports.create_uuid = function (req, res) {
    const url = req.body.url;
    if (!url) return res.status(400).json({
        'Error': 'A url is required.'
    });

    if (!validUrl.isUri(url)) return res.status(400).json({
        'Error': 'A valid url is required.'
    });

    let urlEntry = new Url();
    urlEntry.url = url;
    Url.create(urlEntry, function (error) {
        if (error) return res.status(500).json({
            'Error': error.message
        });

        return res.status(201).json({
            'UUID': urlEntry.uuid
        });
    });
};

module.exports.redirect = function (req, res) {
    const uuid = req.params.uuid;
    if (!uuid) return res.status(400).json({
        'Error': 'A uuid is required.'
    });

    Url.findOne({'uuid': uuid}, function (error, urlEntry) {
        if (error || !urlEntry) return res.status(404).json({
            'Error': 'No matching entries with that uuid found.'
        });

        return res.status(200).json({
            'URL': urlEntry.url,
            'CreatedAt': urlEntry.createdAt
        });
    });
};
