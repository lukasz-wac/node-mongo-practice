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
    //   .findOneAndUpdate(
    //     {
    //       _id: new ObjectID('5b6ab5d505b0d60702f9b12c')
    //     },
    //     {
    //       $set: {
    //         completed: true,
    //         text: 'New Milioner!'
    //       }
    //     },
    //     {
    //       returnOriginal: false
    //     }
    //   )
    //   .then(result => {
    //     console.log(result);
    //   });
    db
      .collection('Users')
      .findOneAndUpdate(
        {
          _id: new ObjectID('5b6ab881e140c30764969eda')
        },
        {
          $set: {
            name: 'Brilka'
          },
          $inc: {
            age: 2
          }
        },
        {
          returnOriginal: false
        }
      )
      .then(result => {
        console.log(result);
      });

    // client.close();
  }
);
