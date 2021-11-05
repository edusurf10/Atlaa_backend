const db = require('../../_db/models')

module.exports = {
    checkFichaInRoom: payload => db.Ficha.findOne({where: {username: payload.username, roomID: payload.roomID}}),
    create: payload => db.Ficha.create(payload),
    getFicha: payload => db.Ficha.findOne({where: {username: payload.username, roomID: payload.roomID}})
}