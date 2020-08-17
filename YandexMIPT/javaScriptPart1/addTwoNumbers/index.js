/**
 * @param {Number} a Первое слагаемое
 * @param {Number} b Второе слагаемое
 * @returns {Number}
 */
module.exports = function (a, b) {
  if (isNaN(a) || isNaN(b)) {
    return NaN;
  }
  return Number(a) + Number(b)
};
