const dbConnect = require('../dbConnect');
const conection = new dbConnect();

class ScoreOnePlayer {
    constructor(user_name, score) {
        this.user_name = user_name;
        this.score = score;
    }

    async InsertScoreOnePlayer() {
        let response = { "message": "No se pudo ejecutar la accion", "status": 500 };
        try {
            conection.Connect();

            await conection.sp_call(`call sp_insert_score_one_player('${this.user_name}', ${this.score})`);
            response = { "message": "score guardado!", "status": 200 };
        } catch (error) {
            console.log(error);
        }

        return response;
    }

    async GetScoreOnePlayer() {
        let response = { "message": "No se pudo ejecutar la accion", "status": 500 };
        try {
            conection.Connect();
            const data = await conection.sp_call(`call sp_get_scores_one_player()`);
            response = { "data": data[0][0] };
        } catch (error) {
            console.log(error);
        }

        return response;
    }
}

module.exports = { ScoreOnePlayer };