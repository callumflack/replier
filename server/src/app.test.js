const request = require('supertest');
const app = require('../src/app');

describe('GET /invalid-url', () => {
	it('should return 404', (done) => {
		request(app).get('/invalid-url')
			.expect(404, done);
	});
});
