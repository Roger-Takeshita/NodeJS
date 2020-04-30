const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

//! Create a new ObjectID
//+ With the id is possible to retrive the date and time that this Id was created
const id = new ObjectID();
console.log(id);
console.log(id.getTimestamp());

MongoClient.connect(
    connectionURL,
    {
        useNewUrlParser: true
    },
    (error, client) => {
        if (error) return console.log('Something went wrong', error);
        console.log('Connected to mongoDB');
        const db = client.db(databaseName);

        //! Insert one - Callback
        db.collection('users').insertOne(
            {
                name: 'Roger Takeshita',
                age: 32
            },
            (error, result) => {
                if (error) return console.log('Something went wrong', error);
                console.log(result.ops);
            }
        );

        //! Insert many - Callback
        db.collection('users').insertMany(
            [
                {
                    name: 'Thaisa Sakima',
                    age: 31
                },
                {
                    name: 'Yumi Sakima',
                    age: 3
                }
            ],
            (error, result) => {
                if (error) return console.log('Something went wrong', error);
                console.log(result.ops);
            }
        );

        //! Insert many different collection - Callback
        db.collection('tasks').insertMany(
            [
                {
                    description: 'Clean the house',
                    completed: true
                },
                {
                    description: 'Renew inspection',
                    completed: false
                },
                {
                    description: 'Pot plants',
                    completed: true
                }
            ],
            (error, result) => {
                if (error) return console.log('Unable to insert tasks');
                console.log(result.ops);
            }
        );

        //! Find one - Callback
        db.collection('users').findOne({ name: 'Roger Takeshita' }, (error, user) => {
            if (error) return console.log('Unable to fetch');
            console.log(user);
        });

        //! Find by id - Callback
        db.collection('users').findOne({ _id: ObjectID('5ea4831272754d5be676e8e7') }, (error, user) => {
            if (error) return console.log('Unable to fetch');
            console.log(user);
        });

        //! Find age greater than 20 - Callback
        db.collection('users')
            .find({ age: { $gt: 20 } })
            .toArray((error, users) => {
                if (error) return console.log(error);
                console.log(users);
            });

        //! Count documents - Callback
        db.collection('users')
            .find({ age: { $gt: 20 } })
            .count((error, count) => {
                if (error) return console.log(error);
                console.log(`Total documents: ${count}`);
            });

        //! Find the last saved document - Callback
        db.collection('users')
            .find({})
            .sort({ _id: -1 })
            .limit(1)
            .toArray((error, user) => {
                if (error) return console.log(error);
                console.log(user);
            });

        //! Find all not completed tasks - Callback
        db.collection('tasks')
            .find({ completed: false })
            .toArray((error, tasks) => {
                if (error) return console.log(error);
                console.log(tasks);
            });

        //! Update a document - Promise
        db.collection('users')
            .updateOne(
                { _id: ObjectID('5ea4900760bba763fa155b7f') },
                {
                    $set: {
                        name: 'Mike'
                    }
                }
            )
            .then((doc) => console.log(doc))
            .catch((error) => console.log(error));

        //! Update many tasks - Promise
        db.collection('tasks')
            .updateMany(
                { completed: false },
                {
                    $set: {
                        completed: true
                    }
                }
            )
            .then((docs) => console.log(docs.result.nModified))
            .catch((error) => console.log(error));

        //! Delete many task - Promise
        db.collection('tasks')
            .deleteMany({ description: 'Pot plants' })
            .then((docs) => console.log(docs.deletedCount))
            .catch((error) => console.log(error));

        //! Delete one task - Promise
        db.collection('tasks')
            .deleteOne({ description: 'Renew inspection' })
            .then((doc) => console.log(doc.deletedCount))
            .catch((error) => console.log(error));
    }
);
