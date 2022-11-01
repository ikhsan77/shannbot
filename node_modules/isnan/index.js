
/**
 * Expose `isNaN`.
 */

module.exports = isNaN;

/**
 * Test whether `value` is NaN.
 *
 * @param {*} value
 * @returns {boolean}
 */

function isNaN(value) {
  return value !== value;
}
