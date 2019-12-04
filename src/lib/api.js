/**
 * Base functions for interacting with other apis
 * @module api
 */

import axios from 'axios';

const axiosAuth = axios.create({
  baseURL: `${process.env.VUE_APP_AUTH_SERVER_URL || ''}/api`,
  withCredentials: true,
});

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
 * @returns {object}
 */
async function basicRequest(url, data, { method = 'POST' } = {}) {
  let response;

  try {
    response = await axiosAuth(url, {
      method,
      url,
      data,
    });
  } catch (error) {
    response = error.response;

    if (response.status === 500) {
      console.log('Error during request:', error);
      return {
        error: 'An unknown error occured. Please try again.',
      };
    }
  }

  return response.data || null;
}

export default Object.freeze({
  get: (url, data, options) => basicRequest(url, data, { ...options, method: 'GET' }),
  post: (url, data, options) => basicRequest(url, data, { ...options, method: 'POST' }),
  put: (url, data, options) => basicRequest(url, data, { ...options, method: 'PUT' }),
  delete: (url, data, options) => basicRequest(url, data, { ...options, method: 'DELETE' }),
});
