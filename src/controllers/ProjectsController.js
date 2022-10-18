const knex = require('../database')

module.exports = {

    async index(req, res, next) {
        try {
            const { user_id, page = 1 } = req.query

            const query = knex('projects')
                .limit(5)
                .offset((page - 1) * 5)

            const countObj = knex('projects').count()
            if (user_id) {
                query
                    .where({ user_id })
                    .join('users', 'user_id', '=', 'projects.user_id')
                    .select('projects.*', 'users.username')

                countObj
                    .where({ user_id })
            }
            const [count] = await countObj

            res.header('X-total-Count', count["count"])

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
    },
    async update(req, res, next) {
        try {
            const { user_id } = req.params
            const { title } = req.body

            await knex('projects').update({
                title: title
            }).where({ user_id: user_id })

            return res.status(200).json({ sucess: "atualizado com sucesso" })
        } catch (err) {
            next(err);
        }
    },
    async delete(req, res, next) {
        try {
            const { user_id } = req.params

            await knex('projects').where({ user_id }).del()

            return res.status(200).json({ sucess: "deletado com sucesso" })
        } catch (err) {
            next(err);
        }
    }
}