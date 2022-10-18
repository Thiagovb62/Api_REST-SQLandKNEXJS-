const knex = require('../database')

module.exports = {

    async index(req, res, next) {
        try {
            const { user_id } = req.query

            const query = knex('projects')


            if (user_id) {
                query
                    .where({ user_id })
                    .join('users', 'user_id', '=', 'projects.user_id')
                    .select('projects.*', 'users.username')

            }
            const results = await query

            return res.status(200).json(results)
        } catch (err) {
            next(err)
        }

    },
    async create(req, res, next) {
        try {

            const { title, user_id } = req.body

            await knex('projects').insert({
                user_id: user_id,
                title: title
            })

            return res.status(200).json({ sucess: "criado com sucesso" })
        } catch (err) {
            next(err);
        }
    }
}