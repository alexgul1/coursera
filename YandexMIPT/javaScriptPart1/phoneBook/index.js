// Телефонная книга
var phoneList = [];

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {

  var commandArr = command.split(/[, ]/);
  //return commandArr;
  commandName = commandArr[0];
  switch (commandName) {
    case 'ADD' : {
      var arrayOfNumbers = [];
      for (let i = 2; i < commandArr.length; i++) {
        arrayOfNumbers.push(commandArr[i])
      }

      var isUserExist = false;
      for (let i = 0; i < phoneList.length; i++) {
        if(phoneList[i].name === commandArr[1]) {
          isUserExist = true;
          phoneList[i].numbers = phoneList[i].numbers.concat(arrayOfNumbers);
          break;
        }
      }

      if(!isUserExist) {
        var user = {
          name: commandArr[1],
          numbers: arrayOfNumbers
        }

        phoneList.push(user)

        phoneList.sort((a,b) => {
          if(a.name > b.name) {
            return 1;
          }
          if(a.name < b.name) {
            return -1;
          }
          return 0;
        })
      }

      break;
    }
    case 'REMOVE_PHONE' : {
      var isNumberExist = false;
      var deletedNumber = commandArr[1];

      phoneList.forEach(user => {
        var searchingValue = user.numbers.indexOf(deletedNumber)
        if(searchingValue !== -1) {
          user.numbers.splice(searchingValue, 1);
          isNumberExist= true;
        }
      })

      return isNumberExist;
    }
    case 'SHOW' : {
      var showList = [];
      var index = 0;

      phoneList.forEach(user => {
        if(user.numbers.length !== 0) {
          showList[index] = `${user.name}: ${user.numbers.join(', ')}`
          index++;
        }
      })
      return showList;
    }
  }

};
