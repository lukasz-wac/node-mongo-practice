const { ObjectID } = require('mongodb');
const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

const _id = '5b6c115e2544170c67ed0aed11';

if (!ObjectID.isValid(_id)) {
  return console.log('Id not valid');
}

Todo.find({
  _id
}).then(todos => {
  console.log('Todos', todos);
});

Todo.findOne({
  _id
}).then(todo => {
  console.log('Todo', todo);
});

Todo.findById(_id)
  .then(todo => {
    console.log('Todo by id', todo);
  })
  .catch(error => {
    console.log(error);
  });

const userId = '5b6af1399b40ac0cdfe1fa78';

if (ObjectID.isValid(userId)) {
  User.findById(userId)
    .then(userData => {
      if (userData) {
        return console.log(userData);
      }
      return console.log('User not found');
    })
    .catch(error => {
      console.log(error);
    });
}
