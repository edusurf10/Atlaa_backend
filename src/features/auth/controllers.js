require('dotenv/config')
const Boom = require('boom')
const Validator = require('fastest-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const services = require('./services')

const v = new Validator()

module.exports = {
    auth: async ctx => {
        const { request: { body }, response } = ctx

        const schema = {
            username: { max: 255, min: 4, type: 'string' },
            password: { max: 255, min: 8, type: 'string' }
        }
        const errors = v.validate(body, schema)

        if (Array.isArray(errors) && errors.length) {
            response.status = 400
            return response.body = Boom.badRequest(null, errors)
        }

        const user = await services.auth(body)

        if (user) {
            if (bcrypt.compareSync(body.password, user.password)) {
                response.body =
                    jwt.sign({
                        id: user.id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        type: user.type,
                        atlaaCoins: user.atlaaCoins,
                        avatar: user.avatar,
                        createdAt: user.createdAt,

                    }, process.env.SECRET_KEY, {
                        expiresIn: '48h'
                    })
            } else {
                response.status = 401
                response.body = { result: Boom.unauthorized() }
            }

        } else {
            response.status = 401
            response.body = {result: Boom.unauthorized()}
        }
    }
}