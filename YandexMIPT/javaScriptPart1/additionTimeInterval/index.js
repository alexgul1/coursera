/**
 * @param {Number} hours
 * @param {Number} minutes
 * @param {Number} interval
 * @returns {String}
 */
module.exports = function (hours, minutes, interval) {
  hours += Math.floor(interval / 60);
  minutes += interval % 60;
  if (minutes > 59) {
    hours++;
    minutes -= 60;
  }
  if (hours > 23) {
    hours -= 24 * Math.floor(hours / 24);
  }
  return (hours > 9 ? `${hours}` : `0${hours}`) +  `:` + (minutes > 9 ? `${minutes}` : `0${minutes}`);
};
