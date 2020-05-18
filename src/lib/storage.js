/* eslint-disable max-len */
/**
 * Wrappers for browser storage methods (localStorage, sessionStorage, etc...)
 * There is a bug in chromium/chrome where having third party cookies blocked
 * may also block access to localStorage throwing an error
 *
 * Bug: https://www.chromium.org/for-testers/bug-reporting-guidelines/uncaught-securityerror-failed-to-read-the-localstorage-property-from-window-access-is-denied-for-this-document
 */
/* eslint-enable max-len */

export function localStorageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    // console.err("Error getting value from localstorage:", error);
    return null;
  }
}

export function localStorageSet(key, value) {
  try {
    return localStorage.setItem(key, value);
  } catch (error) {
    // console.err("Error setting value in localstorage:", error);
    return null;
  }
}
