const scoreTwoPlayerController = require('../controllers/scoresTwoPlayer');
const express = require('express');
const router = express.Router();

router.post('/scoreTwoPlayer', scoreTwoPlayerController.InsertScoreTwoPlayer);
router.get('/scoreTwoPlayer', scoreTwoPlayerController.GetScoreTwoPlayer);

module.exports = router;