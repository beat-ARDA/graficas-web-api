const { ScoreOnePlayer } = require('../models/scoresOnePlayer');

exports.InsertScoreOnePlayer = async (req, res) => {
    const { user_name, score } = req.body;

    const scoreOnePlayer = new ScoreOnePlayer(user_name, score);

    try {
        let response = await scoreOnePlayer.InsertScoreOnePlayer();
        res.json(response);
    } catch (error) { console.log(error) }
};

exports.GetScoreOnePlayer = async (req, res) => {
    const scoreOnePlayer = new ScoreOnePlayer('', '');

    try {
        let response = await scoreOnePlayer.GetScoreOnePlayer();
        res.json(response);
    } catch (error) { console.log(error) }
};