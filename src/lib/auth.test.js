import auth from './auth';

test('Exports auth', () => {
  expect(auth).toEqual(expect.objectContaining({
    login: expect.any(Function),
    register: expect.any(Function),
    logout: expect.any(Function),
    getUser: expect.any(Function),
  }));
});
