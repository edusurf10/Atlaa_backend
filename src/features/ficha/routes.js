const controllers = require('./controllers')

module.exports = router => {
    router.post('/v1/api/createficha', controllers.create),
    router.post('/v1/api/getficha', controllers.getFicha)
}