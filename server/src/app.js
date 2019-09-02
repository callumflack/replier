const express = require('express');
const compression = require('compression'); // compresses requests
const bodyParser = require('body-parser');
const lusca = require('lusca');
const dotenv = require('dotenv');
const setupRoutes = require('./routes/index');

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: '.env' });

// Log all unhandled exceptions & rejections
process
	.on('unhandledRejection', (reason, p) => {
		// eslint-disable-next-line no-console
		console.error(`${(new Date()).toUTCString()} Unhandled Rejection thrown:`, p);
		process.exit(1);
	})
	.on('uncaughtException', (err) => {
		// eslint-disable-next-line no-console
		console.error(`${(new Date()).toUTCString()} Uncaught Exception thrown: ${err.message}`);
		// eslint-disable-next-line no-console
		console.error(err.stack);
		process.exit(1);
	});

// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 5000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

setupRoutes(app);

module.exports = app;
