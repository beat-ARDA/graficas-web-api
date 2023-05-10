const { ScoreTwoPlayer } = require('../models/scoresTwoPlayer');

exports.InsertScoreTwoPlayer = async (req, res) => {
    const { user_name_one, user_name_two, winner } = req.body;
    const scoreTwoPlayer = new ScoreTwoPlayer(user_name_one, user_name_two, winner);

    try {
        let response = await scoreTwoPlayer.InsertScoreTwoPlayer();
        res.json(response);
    } catch (error) { console.log(error) }
};

exports.GetScoreTwoPlayer = async (req, res) => {
    const scoreTwoPlayer = new ScoreTwoPlayer('', '', 0);

    try {
        let response = await scoreTwoPlayer.GetScoreTwoPlayer();
        res.json(response);

    } catch (error) { console.log(error) }
};