const fs = require('fs');

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday'
// };

// const bookJSON = JSON.stringify(book);
// fs.writeFileSync('1-json.json', bookJSON);

// const dataBuffer = fs.readFileSync('1-json.json');
// const dataJSON = JSON.parse(dataBuffer.toString());
// console.log(dataJSON);
// console.log(dataJSON.title);

const dataBuffer = fs.readFileSync('1-json.json');
const dataJSON = JSON.parse(dataBuffer.toString());
dataJSON.name = 'Roger Takeshita';
dataJSON.planet = 'Mississauga';
dataJSON.age = 32;
fs.writeFileSync('1-json.json', JSON.stringify(dataJSON));
