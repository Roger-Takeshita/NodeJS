const myObj = {
    name: 'Roger',
    age: 32,
    address: 'Williamsport Dr'
};

console.log(myObj.name, myObj.age, myObj.address);
console.log();

const { name, age, address } = myObj;
console.log(name, age, address);
console.log();

const { name: rogerName, age: rogerAge, address: rogerAddress, apt: rogerApt = 11 } = myObj;
console.log(rogerName, rogerAge, rogerAddress, rogerApt);
console.log();

const info = ({ name, age, address, apt = 11 }) => {
    console.log(name, age, address, apt);
};

info(myObj);
console.log();

const info2 = ({ name: rogerName, age: rogerAge, address: rogerAddress, apt: rogerApt = 11 }) => {
    console.log(rogerName, rogerAge, rogerAddress, rogerApt);
};

info2(myObj);
console.log();
