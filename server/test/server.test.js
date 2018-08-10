const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server');
const { Todo } = require('../models/todo');

const todos = [
  { text: 'first todos', _id: new ObjectID() },
  { text: 'secomd todo', _id: new ObjectID() }
];

beforeEach(done => {
  Todo.remove({})
    .then(() => {
      return Todo.insertMany(todos);
    })
    .then(() => done());
});

describe('POST /TODOS', () => {
  it('Should create a new todo', done => {
    const text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({ text })
          .then(todos => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
          .catch(e => done(e));
      });
  });

  it('Should not be created with invalid data', done => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find()
          .then(todos => {
            expect(todos.length).toBe(2);
            done();
          })
          .catch(e => done(e));
      });
  });
});

describe('GET /TODOS', () => {
  it('should get an array', done => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect(res => {
        expect(res.body).toHaveProperty('todos');
      })
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        done();
      });
  });
});

describe('GET /TODOS:ID', () => {
  it('should return an individual todo Item', done => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todoItem.text).toBe(todos[0].text);
      })
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        done();
      });
  });

  it('should return 404 if todo not found', done => {
    const newId = new ObjectID();

    request(app)
      .get(`/todos/${newId.toHexString()}`)
      .expect(404)
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        done();
      });
  });

  it('should return 404 for none object ids', done => {
    const invalidId = '1234';
    request(app)
      .get(`/todos/${invalidId}`)
      .expect(400)
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        done();
      });
  });
});

describe('DELETED /ID', () => {
  it('Should delete an demanded item', done => {
    request(app)
      .delete(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(result => {
        expect(result.body.status).toBe('deleted');
      })
      .end((error, res) => {
        if (error) {
          return done(error);
        }

        const _id = res.body.todo._id;

        Todo.find({ _id })
          .then(todoItem => {
            expect(todoItem._id).toBeUndefined();
            done();
          })
          .catch(error => {
            done(error);
          });
      });
  });

  it('should return 404 if todo not found', done => {
    const newId = new ObjectID();

    request(app)
      .delete(`/todos/${newId.toHexString()}`)
      .expect(404)
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        done();
      });
  });

  it('should return 404 for none object ids', done => {
    const invalidId = '1234';
    request(app)
      .delete(`/todos/${invalidId}`)
      .expect(400)
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        done();
      });
  });
});

describe('PATCH /ID', () => {
  it('Should update typed todo', done => {
    const sendID = todos[0]._id.toHexString();
    const sendBody = {
      text: 'UPDATED TEXT',
      completed: true
    };

    request(app)
      .patch(`/todos/${sendID}`)
      .send(sendBody)
      .expect(200)
      .expect(todo => {
        const body = todo.body.todo;
        expect(body.completed).toBeTruthy();
        expect(typeof body.completedAt).toBe('number');
      })
      .end((error, res) => {
        if (error) {
          return done(error);
        }
        done();
      });
  });
});
