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
    //   .deleteMany({ text: 'Pick up a girl' })
    //   .then(result => {
    //     console.log(result);
    //   });

    // db
    //   .collection('Todos')
    //   .deleteOne({
    //     text: 'get a job!'
    //   })
    //   .then(result => {
    //     console.log(result.result);
    //   });
    //
    // db
    //   .collection('Todos')
    //   .findOneAndDelete({
    //     text: 'Something NEW!'
    //   })
    //   .then(result => {
    //     console.log(result);
    //   });
    //
    // db
    //   .collection('Users')
    //   .deleteMany({
    //     name: 'pawel'
    //   })
    //   .then(result => {
    //     console.log(result.result);
    //   });

    db
      .collection('Users')
      .findOneAndDelete({
        _id: new ObjectID('5b6ac717bb83c01b981da96a')
      })
      .then(result => {
        console.log(result);
      });
    // client.close();
  }
);
