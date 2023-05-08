const scoreOnePlayerController = require('../controllers/scoresOnePlayer');
const express = require('express');
const router = express.Router();

router.post('/scoreOnePlayer', scoreOnePlayerController.InsertScoreOnePlayer);
router.get('/scoreOnePlayer', scoreOnePlayerController.GetScoreOnePlayer);

module.exports = router;