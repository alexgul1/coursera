/**
 * @param {String[]} hashtags
 * @returns {String}
 */
module.exports = function (hashtags) {
  var uniqueHashtags = [];
  hashtags.forEach(hashtag => {
    var lowerHashtag = hashtag.toLowerCase();
    if(!uniqueHashtags.includes(lowerHashtag)) {
      uniqueHashtags.push(lowerHashtag);
    }
  })
  return uniqueHashtags.join(', ');
};
