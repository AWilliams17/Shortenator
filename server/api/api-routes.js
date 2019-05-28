const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.json({ message: 'Test' });
});


const urlController = require('./urlController');
router.route('/url')
    .post(urlController.create_url);

router.route('/url/:url_shortcode')
    .get(urlController.get_url);


module.exports = router;
