const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect(
  'mongodb://localhost:27017/TodoApp',
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log('Unable to coonect to MongoDB server');
    }
    console.log('Connected to Server');
    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne(
    //   {
    //     text: 'Something to do',
    //     completed: false
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log('Unable to insert todo', error);
    //     }
    //
    //     console.log(JSON.stringify(result.ops, null, 2));
    //   }
    // );
    //
    // db.collection('Users').insertOne(
    //   {
    //     name: 'Lukasz',
    //     age: 27,
    //     location: 'Poland'
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log('Unable to reach the server', error);
    //     }
    //
    //     console.log(JSON.stringify(result, null, 2));
    //   }
    // );

    client.close();
  }
);
