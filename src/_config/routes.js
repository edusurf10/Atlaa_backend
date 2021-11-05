const authRoutes = require('../features/auth/routes')
const userRoutes = require('../features/user/routes')
const roomRoutes = require('../features/room/routes')
const fichaRoutes = require('../features/ficha/routes')

module.exports = router => {
    authRoutes(router)
    userRoutes(router)
    roomRoutes(router)
    fichaRoutes(router)
}