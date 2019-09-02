/**
 * Ensure request is authenticated
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
function ensureAuthed(req, res, next) {
	// Confirm request is authed and session is valid
	if (!req.user) {
		res.status(401).json({
			error: {
				message: 'Authentication is required',
			},
		});
		return;
	}

	next();
}

/**
 * Ensure request is not authenticated
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
function ensureNotAuthed(req, res, next) {
	// Confirm request is not authed
	if (req.user) {
		res.status(403).json({
			error: {
				message: 'Already authenticated',
			},
		});
		return;
	}

	next();
}

module.exports = {
	ensureAuthed,
	ensureNotAuthed,
};
