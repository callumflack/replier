const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

module.exports = {
	development: {
		client: 'postgresql',
		connection: process.env.POSTGRESQL_URL,
		migrations: {
			directory: `${__dirname}/knex/migrations`,
		},
		seeds: {
			directory: `${__dirname}/knex/seeds`,
		},
	},

	production: {
		client: 'postgresql',
		connection: process.env.POSTGRESQL_URL,
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: 'knex_migrations',
		},
	},
};
