const controllers = require('./controllers')

module.exports = router => {
    router.get('/v1/api/room', controllers.getroom),
    router.post('/v1/api/playroom', controllers.getplayroom),
    router.post('/v1/api/myroom', controllers.getmyroom),
    router.post('/v1/api/favroom', controllers.getfavroom),
    router.post('/v1/api/createroom', controllers.createroom),
    router.post('/v1/api/addfav', controllers.addfav),
    router.post('/v1/api/delfav', controllers.delfav)
}