const db = require('../../_db/models/')

module.exports = {
    auth: payload => db.User.findOne({where: {username: payload.username}})
}