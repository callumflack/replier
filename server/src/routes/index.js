const authRouter = require('./auth/index');

module.exports = function setupRoutes(app) {
	app.use('/api/auth', authRouter);
};
