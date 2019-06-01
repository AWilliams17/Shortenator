const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.status(200).send({
        'Routes': {
            '/api/create_url': 'Methods: (Post) Parameters: (url) Description: Creates & returns a shortcode for a url',
            '/api/url/:shortcode': 'Methods: (Get) Description: Generates redirect for given shortcode'
        }
    });
});


const urlController = require('./urlController');
router.route('/url')
    .post(urlController.create_url);

//router.route('/url/:url_shortcode')
router.route(['/url/:url_shortcode', '/url'])
    .get(urlController.get_url);


module.exports = router;
