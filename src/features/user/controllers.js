require('dotenv/config')
const Boom = require('boom')
const Validator = require('fastest-validator')
const services = require('./services')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../../_db/models')
const azure = require('azure-storage')

const v = new Validator()
const blob = new azure.createBlobService()

module.exports = {
    create: async ctx => {
        const { request: { body }, response } = ctx

        const schema = {
            username: { max: 16, min: 4, type: 'string' },
            name: { max: 60, min: 5, type: 'string' },
            email: { max: 255, min: 5, type: 'string' },
            password: { max: 255, min: 8, type: 'string' }
        }
        const errors = v.validate(body, schema)

        if (Array.isArray(errors) && errors.length) {
            response.status = 400
            return response.body = Boom.badRequest(null, errors)
        }

        const check = await services.checkUser(body)
        if (check) {
            response.status = 409
            return response.body = Boom.conflict('usuario ja cadastrado')
        }
        
        const newBody = {
            username: body.username,
            name: body.name,
            email: body.email,
            password: bcrypt.hashSync(body.password, 15)
        }

        const user = await services.create(newBody)
        response.body = user
    },
    cat: async ctx => {
        const { request: {body}, response } = ctx
        try {

            const userInf = jwt.verify(body.token, process.env.SECRET_KEY)
            response.body = userInf
            
        } catch (error) {
            response.body = Boom.unauthorized('Token invalido, faça login novamente')
        }        
    },
    upavatar: async ctx => {
        const { request, response } = ctx
        try {
            
            const username = request.body.username
            
            const userData = await db.User.findOne({where: {username: username}})

            const url = JSON.stringify(userData.avatar)
            
            const name = url.split('/')
            
            const deleteFile = name[4].split('\"')[0]

            if (deleteFile !== 'noimg.png'){
                await blob.deleteBlob('avatar', deleteFile, async (error, resp) => {
                    if (error) {
                        console.log(error)
                        response.status = 400
                        return response.body = Boom.badRequest(`${error}`)
                    }
                })
            }
            
            await db.User.update({avatar: request.file.url}, {where: {username: username}})
            
            const user = await db.User.findOne({where: {username: username}})

            response.status = 200
            response.body = jwt.sign({
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

        } catch (error) {
            response.body = error
        }
        
    }
}