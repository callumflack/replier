import API from './api';

test('Export API', () => {
  expect(API).toEqual(expect.objectContaining({
    get: expect.any(Function),
    post: expect.any(Function),
    put: expect.any(Function),
    delete: expect.any(Function),
  }));
});
