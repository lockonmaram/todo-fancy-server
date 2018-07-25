var express = require('express');
var router = express.Router();
var ApiController = require('../controllers/apiController')

/* GET users listing. */
router.get('/', ApiController.getOauth);
router.get('/timeline', ApiController.getTimeline);
router.post('/search', ApiController.searchTweet);
router.post('/tweet', ApiController.tweet);

module.exports = router;
