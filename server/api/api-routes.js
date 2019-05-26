const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.json({ message: 'Test' });
});


const urlController = require('./urlController');
router.route('/url')
    .get(urlController.index)
    .post(urlController.create);

router.route('/url/:url_shortcode')
    .get(urlController.read)
    .delete(urlController.update);


module.exports = router;
