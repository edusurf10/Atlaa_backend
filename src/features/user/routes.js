const controllers = require('./controllers')
const multer = require('@koa/multer')
const multerConfig = require('../../_config/multer')

module.exports = router => {
    router.post('/v1/api/user', controllers.create)
    router.post('/v1/api/userinf', controllers.cat)
    router.post('/v1/api/uploadAvatar', multer(multerConfig).single('avatar'), controllers.upavatar)
}