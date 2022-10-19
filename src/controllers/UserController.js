const knex = require('../database')

module.exports = {

    async index(req, res) {
        const results = await knex('users')
            .where('deleted_at', null)

        return res.status(200).json(results)
    },
    async create(req, res, next) {
        try {
            const { username } = req.body

            const results = await knex('users').insert({
                username
            })

            return res.status(201).json({ message: "criado com sucesso" })

        } catch (err) {
            next(err)

        }
    },
    async update(req, res, next) {
        try {
            const { username } = req.body
            const { id } = req.params

            await knex('users').update({
                username
            }).where({ id })

            return res.send()

        } catch (err) {
            next(err)

        }
    },
    async delete(req, res, next) {
        try {
            const { id } = req.params


            await knex('users').where({ id }).update('deleted_at', new Date());

            return res.status(200).json({ sucess: "deletado com sucesso" })

        } catch (err) {
            next(err)

        }
    }
}