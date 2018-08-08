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

    // db
    //   .collection('Todos')
    //   .find({
    //     _id: new ObjectID('5b6ab5d505b0d60702f9b12c')
    //   })
    //   .toArray()
    //   .then(
    //     docs => {
    //       console.log(docs);
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );
    // db
    //   .collection('Todos')
    //   .find()
    //   .count()
    //   .then(
    //     count => {
    //       console.log(`Total Count: ${count}`);
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );
    db
      .collection('Users')
      .find({
        name: 'pawel'
      })
      .toArray()
      .then(
        docs => {
          console.log(`Total Count: ${JSON.stringify(docs, null, 2)}`);
        },
        err => {
          console.log(err);
        }
      );

    // client.close();
  }
);
