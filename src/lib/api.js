/**
 * Base functions for interacting with other apis
 * @module api
 */

const urlBase = `${process.env.VUE_APP_AUTH_SERVER_URL || ''}/api`;

/**
 * Parse api response
 *
 * @private
 * @async
 *
 * @param {object} response
 * @returns {object|null} - JSON data or null
 */
async function parseAPIResponse(response) {
  if (response.status === 500) {
    return {
      error: 'An unknown error occured. Please try again.',
    };
  }

  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');

  if (isJson) {
    return response.json();
  }

  return null;
}

/**
 * Generic request template
 *
 * @private
 * @async
 *
 * @param {string} url
 * @param {object} data
 * @param {object} options
 * @param {string} options.method
 * @param {string} options.bearerToken
 * @returns {object}
 */
async function basicRequest(url, data, { method = 'POST' } = {}) {
  const requestOptions = {
    method,
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  };

  if (method !== 'GET') {
    requestOptions.body = JSON.stringify(data);
  }

  const response = await fetch(`${urlBase}${url}`, requestOptions);

  return parseAPIResponse(response);
}

export default Object.freeze({
  get: (url, data, options) => basicRequest(url, data, { ...options, method: 'GET' }),
  post: (url, data, options) => basicRequest(url, data, { ...options, method: 'POST' }),
  put: (url, data, options) => basicRequest(url, data, { ...options, method: 'PUT' }),
  delete: (url, data, options) => basicRequest(url, data, { ...options, method: 'DELETE' }),
});
