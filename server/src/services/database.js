/**
 * Database Service file
 *
 * All results should be transformed to camelCase using humps before returning
 */

const humps = require('humps');
const db = require('../../knex/knex');

/**
 * Get a user
 *
 * @param {string} id
 * @returns {object} user
 */
async function userGet(id) {
	const user = await db('users')
		.where('id', id)
		.first();

	return humps.camelizeKeys(user);
}

/**
 * Create new user
 *
 * @param {string} email
 * @param {string} password (hash)
 * @returns {object} user
 */
async function userCreate(email, password) {
	const result = await db.raw(
		`INSERT INTO users
      (email, password)
      values (?, ?)
      RETURNING *;
    `,
		[email, password],
	);

	return humps.camelizeKeys(result.rows[0]);
}

/**
 * Update user
 *
 * @param {string} id
 * @param {object} updates
 * @param {string} updates.email
 * @param {string} updates.password
 * @returns {object} user
 */
async function userUpdate(
	id,
	{
		email = null,
		password = null,
	},
) {
	const result = await db.raw(
		`UPDATE users
      SET
        email = COALESCE(?, email),
        password = COALESCE(?, password)
      WHERE id = ?
      RETURNING *;
    `,
		[email, password, id],
	);

	return humps.camelizeKeys(result.rows[0]);
}

module.exports = {
	userGet,
	userCreate,
	userUpdate,
};
