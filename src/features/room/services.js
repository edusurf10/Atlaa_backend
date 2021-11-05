const db = require('../../_db/models')

module.exports = {
    createroom: payload => db.Room.create(payload),
    addfav: payload => db.Room_Fav.create(payload),
    delfav: payload => db.Room_Fav.destroy({where: {id: payload.id}}),
    getroom: () => db.Room.findAll(),
    getmyroom: payload => db.Room.findAll({where: {owner: payload.username}}),
    getfavroom: payload => db.Room_Fav.findAll({where: {userID: payload.id}}),
    getplayroom: payload => db.Room.findOne({where: {id: payload.id}})
}