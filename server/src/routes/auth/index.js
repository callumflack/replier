const express = require('express');
const passport = require('passport');
const promisify = require('util').promisify;
const middleware = require('../middleware');
const db = require('../../services/database');
const auth = require('../../utils/auth');

const router = express.Router();

/**
 * API Auth routes.
 */

/**
 * @api {post} /api/register
 * @api AuthRegister
 * @apiParam {string} email
 * @apiParam {string} password
 *
 * Create new user session
 */
router.post(
	'/register',
	middleware.ensureNotAuthed,
	async (req, res) => {
		const { email, password } = req.body;

		const user = await db.userCreate(email, password);

		if (user instanceof Error) {
			const error = user;
			switch (error.code) {
			case 'EMAIL_TAKEN':
				return res.status(400).json({
					error: 'An account already exists with this email',
				});
			default:
				return res.status(500).json({
					error: 'There was an error registering your account',
				});
			}
		}

		// Bind req to this so login method can use internal passport functions
		const login = promisify(req.login.bind(req));

		try {
			await login(user);
		} catch (err) {
			return res.status(500).json({
				error: 'There was an error registering your account',
			});
		}

		return res.json({
			user: auth.sanitizeUser(req.user),
		});
	},
);

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
	middleware.ensureNotAuthed,
	passport.authenticate('local'),
	async (req, res) => {
		res.json({
			user: auth.sanitizeUse(req.user),
		});
	},
);

/**
 * @api {get} /api/logout
 * @api AuthLogout
 *
 * Terminate current user session
 */
router.get(
	'/logout',
	middleware.ensureAuthed,
	async (req, res) => {
		req.logout();
		res.sendStatus(200);
	},
);

/**
 * @api {get} /api/user
 * @api AuthUser
 *
 * Return data of currently authed user
 * Useful for populating client side & testing
 */
router.get(
	'/user',
	middleware.ensureAuthed,
	async (req, res) => {
		res.json({
			user: auth.sanitizeUser(req.user),
		});
	},
);


module.exports = router;
