const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../services/database');
const auth = require('../utils/auth');

passport.use(new LocalStrategy(
	{
		usernameField: 'email',
	},
	async (email, password, done) => {
		const user = await db.userGetByEmail(email);

		if (!user) {
			done(null, false, { message: 'Invalid email or password' });
			return;
		}

		const passwordsMatch = await auth.comparePasswords(password, user.password);

		if (!passwordsMatch) {
			done(null, false, { message: 'Invalid email or password' });
			return;
		}

		done(null, user);
	},
));

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
	const user = await db.userGet(id);
	done(null, user);
});
