import API from './api';

test('Creates an api instance', () => {
  const api = API({
    store: {},
    RACHIO_URL: '',
    RACHIO_AUTH_URL: '',
    RACHIO_AUTH_CLIENT_ID: '',
    RACHIO_AUTH_CLIENT_SECRET: '',
  });

  expect(api).toEqual(expect.objectContaining({
    basicGet: expect.any(Function),
    basicPost: expect.any(Function),
    basicPut: expect.any(Function),
    basicDelete: expect.any(Function),
    authedGet: expect.any(Function),
    authedPost: expect.any(Function),
    authedPut: expect.any(Function),
    authedDelete: expect.any(Function),
    oAuthPost: expect.any(Function),
  }));
});
