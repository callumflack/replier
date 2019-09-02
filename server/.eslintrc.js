module.exports = {
	root: true,
	env: {
    'jest': true,
		'node': true,
	},
	extends: [
		'airbnb-base',
	],
	rules: {
		'indent': ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		'no-tabs': 'off',
		'no-underscore-dangle': 'off',
		'no-plusplus': 'off',
		'no-param-reassign': 'off',
		'prefer-destructuring': 'off',
	},
};
