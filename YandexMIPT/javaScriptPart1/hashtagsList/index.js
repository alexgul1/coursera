/**
 * @param {String} tweet
 * @returns {String[]}
 */
module.exports = function (tweet) {
    var arrayOfWords = tweet.split(' ');
    var arrayOfHashtag = [];
    arrayOfWords.forEach( (word) => {
      if(word.startsWith('#')) {
        arrayOfHashtag.push(word.substring(1))
      }
    })
  return arrayOfHashtag;
};