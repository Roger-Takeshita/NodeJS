//! On user Schema
//+ Virtual relationship
//- 1st argument is the name (this could be any name)
//- 2nd argument is an object, which we need to configure each field

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id', //? local field on User schema
    foreignField: 'user' //? foreign field on  Task schema
});

const User = require('../models/user');

const main = async () => {
    const user = await User.findById('5ea75cb6717e83bfa75f17b4').populate('tasks');
    console.log(user.tasks);
};

main();
