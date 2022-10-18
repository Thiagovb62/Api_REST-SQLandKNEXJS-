/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable(`addresses`, function(table) {
        7
        table.increments('id').primary()
        table.integer('user_id').unsigned()
        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE')
        table.text('street').notNullable()
        table.integer('zipcode').notNullable()

        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('addresses')
};