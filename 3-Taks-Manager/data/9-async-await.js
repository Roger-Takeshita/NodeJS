// const doWork = async () => {
//     throw new Error('Something went wrong');
//     return 'Roger';
// };

// doWork()
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// const add = (a, b) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (a < 0 || b < 0) return reject('Numbers must be non negative');
//             resolve(a + b);
//         }, 2000);
//     });
// };

// const doWork = async () => {
//     const sum = await add(1, 99);
//     console.log(sum);
//     const sum2 = await add(sum, 50);
//     console.log(sum2);
//     const sum3 = await add(sum2, -3);
//     return sum3;
// };

// doWork()
//     .then((result) => {
//         console.log(result);
//     })
//     .catch((error) => console.log(error));

require('../src/config/database');
const User = require('../src/models/user');
const Task = require('../src/models/task');

// User.findByIdAndUpdate('5ea5f9242d7cd58fc7965fce', { age: 3 })
//     .then((user) => {
//         console.log(user);
//         return User.countDocuments({ age: 3 });
//     })
//     .then((results) => {
//         console.log(results);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// const updateAgeAndCount = async (id, age) => {
//     await User.findByIdAndUpdate(id, { age });
//     const count = await User.countDocuments({ age });
//     return count;
// };

// updateAgeAndCount('5ea5de17122dea8367f748cd', 4)
//     .then((count) => console.log(count))
//     .catch((error) => console.log(error));

const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({});
    return count;
};

deleteTaskAndCount('5ea5f9242d7cd58fc7965fce')
    .then((count) => console.log(count))
    .catch((error) => console.log(error));
