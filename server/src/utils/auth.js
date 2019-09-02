const bcrypt = require('bcryptjs');

/**
 * @param {string} password - Raw password string
 * @param {string} hash - Bcrypt hash
 * @returns {boolean} Do the password and hash match
 */
function comparePasswords(password, hash) {
	return bcrypt.compare(password, hash);
}

/**
 * Remove sensetive fields from the user object
 * for sending to the client
 *
 * @param {object} user
 * @returns {object}
 */
function sanitizeUser(user) {
	user.password = undefined;
	return user;
}

module.exports = {
	comparePasswords,
	sanitizeUser,
};
