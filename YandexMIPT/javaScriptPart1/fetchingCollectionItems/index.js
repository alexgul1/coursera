/**
 * @param {Array} collection
 * @params {Function[]} – Функции для запроса
 * @returns {Array}
 */
function query(collection) {
    var clonedCollection = [...collection]

    var operations = [].slice.call(arguments)
    operations = operations.slice(1).sort()
    for(var operation of operations ){
        clonedCollection = operation(clonedCollection)

    }
    return clonedCollection;
}

/**
 * @params {String[]}
 */
function select() {
    var fields = [].slice.call(arguments);

    return function select (collection) {
        var selectedCollection = [];

        collection.forEach(obj => {
            var newObj = {};
            for(var key in obj) {


                if(fields.some(value => key === value)){
                    newObj[key] = obj[key]
                }
            }
            selectedCollection.push(newObj)
        })

        return selectedCollection
    }
}

/**
 * @param {String} property – Свойство для фильтрации
 * @param {Array} values – Массив разрешённых значений
 */
function filterIn(property, values) {

    return function filterIn (collection) {
        var filteredCollection = []
        for(var i = 0; i < collection.length; i++) {
            if(collection[i].hasOwnProperty(property)) {
                if(values.some(value => collection[i][property] === value))
                {
                    filteredCollection.push(collection[i])
                }
            }
        }
        return filteredCollection;
    }
}
module.exports = {
    query: query,
    select: select,
    filterIn: filterIn
};
