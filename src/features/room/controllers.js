require('dotenv/config')
const Boom = require('boom')
const services = require('./services')
const jwt = require('jsonwebtoken')
const Validator = require('fastest-validator')

const v = new Validator()
// const blob = new azure.createBlobService()

module.exports = {
    createroom: async ctx => {
        const { request: { body }, response } = ctx
        try {
            const userInf = jwt.verify(body.token, process.env.SECRET_KEY)
            const schema = {
                name: { max: 60, min: 5, type: 'string' },
                descrition: { max: 255, min: 5, type: 'string' },
                systemType: { max: 60, min: 5, type: 'string' },
                maxUser: { type: 'number' },
            }
            const errors = v.validate(body, schema)
            
            if (Array.isArray(errors) && errors.length) {
                response.status = 400
                return response.body = Boom.badRequest('Erro nas validações', errors)
            }

            const room = await services.createroom({...body, owner:userInf.username})
            response.status = 200
            response.body = await services.getroom()
        } catch (error) {
            response.body = Boom.badRequest(error)
        }
    },
    getroom: async ctx => {
        const { response } = ctx
        try {
            const room = await services.getroom()
            response.body = room
        } catch (error) {
            response.body = Boom.badRequest('Erro na listagem das salas, tente novamente', error)
        }
    },
    getmyroom: async ctx => {
        const { request: {body}, response } = ctx
        try {
            const userInf = jwt.verify(body.token, process.env.SECRET_KEY)
            const myRoom = await services.getmyroom(userInf)
            response.status = 200
            response.body = myRoom
        } catch (error) {
            response.body = Boom.unauthorized('Token invalido, faça login novamente', error)
        }        
    },
    getfavroom: async ctx => {
        const { request: {body}, response } = ctx
        try {
            const userInf = jwt.verify(body.token, process.env.SECRET_KEY)
            const myRoom = await services.getfavroom(userInf)
            response.status = 200
            response.body = myRoom
        } catch (error) {
            response.body = Boom.unauthorized('Erro na listagem das salas favoritas, tente novamente', error)
        }
    },
    addfav: async ctx =>{
        const { request: {body}, response } = ctx
        try {
            const userInf = jwt.verify(body.token, process.env.SECRET_KEY)
            const favRoom = await services.addfav({userID: userInf.id, roomID: body.roomID})
            response.status = 200
            response.body = favRoom
        } catch (error) {
            response.body = Boom.badRequest('Erro ao adicionar sala aos favoritos, tente novamente', error)            
        }
    },
    delfav: async ctx =>{
        const { request: {body}, response } = ctx
        try {
            await services.delfav(body)
            response.status = 200
            response.body = true
        } catch (error) {
            response.body = Boom.badRequest('Erro ao remover sala dos favoritos, tente novamente', error)            
        }        
    },
    getplayroom: async ctx => {
        const { request: { body }, response } = ctx
        try {
            const room = await services.getplayroom(body)
            response.body = room
        } catch (error) {
            response.body = Boom.badRequest('Erro na listagem das salas, tente novamente', error)
        }
    },
}