//= Callback Pattern

const doWorkCallback = (callback) => {
    setTimeout(() => {
        //!error
        // callback('This is my error', undefined);
        // !success
        callback(undefined, [1, 4, 7]);
    }, 1500);
};

doWorkCallback((error, result) => {
    if (error) return console.log(error);
    console.log(result);
});

//= Promise Pattern
const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        //!error
        // reject('This is my error');
        // !success
        resolve([1, 4, 7]);
    }, 1500);
});

doWorkPromise.then((docs) => console.log(docs)).catch((error) => console.log(error));

//_ Promisses Chaining
new Promise((resolve, reject) => {
    setTimeout(() => {
        //!error
        // reject('This is my error');
        // !success
        resolve([1, 4, 7]);
    }, 1500);
})
    .then((docs) => console.log(docs))
    .catch((error) => console.log(error));
