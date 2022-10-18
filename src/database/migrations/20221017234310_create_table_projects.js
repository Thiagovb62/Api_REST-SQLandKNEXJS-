/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable(`projects`, function(table) {
        table.increments('id')
        table.text('title')

        // relacionamento
        table.integer('user_id')
            .references('users.id')
            .notNullable()
            .onDelete('CASCADE')

        table.timestamps(true, true)

    });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('projects')
}