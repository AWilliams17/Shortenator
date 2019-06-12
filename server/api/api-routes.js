const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.status(200).send({
        'Routes': {
            '/api/create_uuid_key': 'Methods: (Post) Parameters: (url) Description: Creates & returns a uuid for a url',
            '/api/redirect/:uuid': 'Methods: (Get) Description: Returns original URL + when its entry in the DB is deleted'
        }
    });
});


const urlController = require('./urlController');
router.route('/create_uuid')
    .post(urlController.create_uuid);


router.route(['/redirect/:uuid', '/redirect'])
    .get(urlController.redirect);


module.exports = router;
