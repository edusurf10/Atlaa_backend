const db = require('../../_db/models')

module.exports = {
    checkUser: payload => db.User.findOne({where: {username: payload.username, email: payload.email}}),
    create: payload => db.User.create(payload)
}