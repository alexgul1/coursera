var friends = [
  {
    name: 'Сэм',
    gender: 'Мужской',
    email: 'luisazamora@example.com',
    favoriteFruit: 'Картофель'
  },
  {
    name: 'Эмили',
    gender: 'Женский',
    email: 'example@example.com',
    favoriteFruit: 'Яблоко'
  },
  {
    name: 'Мэт',
    gender: 'Мужской',
    email: 'danamcgee@example.com',
    favoriteFruit: 'Яблоко'
  },
  {
    name: 'Брэд',
    gender: 'Мужской',
    email: 'newtonwilliams@example.com',
    favoriteFruit: 'Банан'
  },
  {
    name: 'Шерри',
    gender: 'Женский',
    email: 'danamcgee@example.com',
    favoriteFruit: 'Картофель'
  },
  {
    name: 'Керри',
    gender: 'Женский',
    email: 'danamcgee@example.com',
    favoriteFruit: 'Апельсин'
  },
  {
    name: 'Стелла',
    gender: 'Женский',
    email: 'waltersguzman@example.com',
    favoriteFruit: 'Картофель'
  }
];

function query(collection) {
  var clonedCollection = [...collection]

  var operations = [].slice.call(arguments)
  operations = operations.slice(1).sort()
  for(var operation of operations ){
    clonedCollection = operation(clonedCollection)

  }
  return clonedCollection;
}

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

function filterIn() {
  var fieldName = arguments[0];
  var acceptedValues = arguments[1];

  return function filterIn (collection) {
    var filteredCollection = []
    for(var i = 0; i < collection.length; i++) {
      if(collection[i].hasOwnProperty(fieldName)) {
        if(acceptedValues.some(value => collection[i][fieldName] === value))
        {
          filteredCollection.push(collection[i])
        }
      }
    }
    return filteredCollection;
  }
}

query(friends,
    select('name', 'gender', 'email'),
    select('name', 'gender'),
    filterIn('favoriteFruit', ['Яблоко', 'Картофель'])
)