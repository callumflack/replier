exports.up = async (knex) => {
	await knex.schema.createTable('users', (table) => {
		table.increments('id').primary();
		table.string('email').notNullable();
		table.string('password').notNullable();

		table.timestamps(true, true);
	});
};

exports.down = async (knex) => {
	await knex.schema.dropTable('users');
};
