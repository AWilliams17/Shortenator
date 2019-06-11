const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.status(200).send({
        'Routes': {
            '/api/create_redirect_key': 'Methods: (Post) Parameters: (url) Description: Creates & returns a key for a url',
            '/api/redirect/:redirect_key': 'Methods: (Get) Description: Generates redirect for given key'
        }
    });
});


const urlController = require('./urlController');
router.route('/create_redirect_key')
    .post(urlController.create_redirect_key);


router.route(['/redirect/:redirect_key', '/redirect'])
    .get(urlController.redirect);


module.exports = router;
