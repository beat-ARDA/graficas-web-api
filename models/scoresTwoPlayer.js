const dbConnect = require('../dbConnect');
const conection = new dbConnect();

class ScoreTwoPlayer {
    constructor(user_name_one, user_name_two, winner) {
        this.user_name_one = user_name_one;
        this.user_name_two = user_name_two;
        this.winner = winner;
    }

    async InsertScoreTwoPlayer() {
        let response = { "message": "No se pudo ejecutar la accion", "status": 500 };
        try {
            conection.Connect();

            await conection.sp_call(`call sp_insert_scores_two_players('${this.user_name_one}', '${this.user_name_two}', ${this.winner})`);
            response = { "message": "score guardado!", "status": 200 };
        } catch (error) {
            console.log(error);
        }

        return response;
    }

    async GetScoreTwoPlayer() {
        let response = { "message": "No se pudo ejecutar la accion", "status": 500 };
        try {
            conection.Connect();
            const data = await conection.sp_call(`call sp_get_scores_two_players()`);
            response = { "data": data[0][0] };
        } catch (error) {
            console.log(error);
        }

        return response;
    }
}

module.exports = { ScoreTwoPlayer };