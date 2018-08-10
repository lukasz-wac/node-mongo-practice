const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const { ObjectID } = require('mongodb');
const { mongoose } = require('./db/mongoose');
const { User } = require('./models/user');
const { Todo } = require('./models/todo');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  const newTodo = new Todo({
    text: req.body.text
  });

  newTodo.save().then(
    doc => {
      res.send(doc);
    },
    error => {
      res.status(400).send(error);
    }
  );
});

app.get('/todos', (req, res) => {
  Todo.find().then(
    todos => {
      res.send({ todos });
    },
    error => {
      res.status(400).send(e);
    }
  );
});

app.get('/todos/:id', (req, res) => {
  const id = req.params.id;

  if (ObjectID.isValid(id)) {
    Todo.findById(id)
      .then(todoItem => {
        if (todoItem) {
          res.status(200).send({
            todoItem
          });
        } else {
          res.status(404).send({
            errorName: 'Item not found'
          });
        }
      })
      .catch(error => {
        res.status(400).send(error);
      });
  } else {
    res.status(400).send({
      errorName: 'Todo ID is not valid'
    });
  }
});

app.delete('/todos/:id', (req, res) => {
  const todoId = req.params.id;

  if (!ObjectID.isValid(todoId)) {
    return res.status(400).send({
      error: 'Invalid todo ID'
    });
  }

  Todo.findByIdAndRemove(todoId)
    .then(result => {
      if (result) {
        res.status(200).send({
          status: 'deleted',
          todo: result
        });
      } else {
        res.status(404).send({
          status: 'Todo not found'
        });
      }
    })
    .catch(error => {
      res.status(400).send({
        error
      });
    });
});

app.patch('/todos/:id', (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(400).send({
      error: 'Invalid todo ID'
    });
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
    .then(todo => {
      if (!todo) {
        return res.status(404).send({
          error: 'Not found'
        });
      }
      res.status(200).send({
        todo
      });
    })
    .catch(error => {
      res.status(404).send({
        error
      });
    });
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {
  app
};
