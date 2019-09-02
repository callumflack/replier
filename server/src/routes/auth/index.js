const express = require('express');

const router = express.Router();

/**
 * API Auth routes.
 */

/**
 * @api {post} /api/login
 * @api AuthLogin
 * @apiParam {string} email
 * @apiParam {string} password
 *
 * Create new user session
 */
router.post(
	'/login',
	async (req, res) => {
		const { email, password } = req.query;

		res.json({
			email,
			password,
		});
	},
);

/**
 * @api {get} /api/logout
 * @api AuthLogout
 *
 * Terminate current user session
 */
router.get('/logout', async (req, res) => {
	const { token } = req.query;

	res.json({
		token,
	});
});

module.exports = router;
