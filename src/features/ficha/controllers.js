const Boom = require('boom')
const Validator = require('fastest-validator')
const services = require('./services')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../../_db/models')

const v = new Validator()

module.exports = {
    create: async ctx => {
        const { request: { body }, response } = ctx

        const check = await services.checkFichaInRoom(body)
        if (check) {
            response.status = 409
            return response.body = Boom.conflict('Usuario já tem ficha nessa sala')
        }
        await services.create(body)
        response.status = 200
        response.body = {message: 'success'}

    },
    getFicha: async ctx => {
        const {request: { body }, response } = ctx

        try {
            const ficha = await services.getFicha(body)
            if (ficha) {
                response.status = 200
                return response.body = ficha
            } else {
                response.status = 200
                return response.body = { message: 'Ficha não encontrada' }
            }

        } catch (err) {
            
        }
    }
}