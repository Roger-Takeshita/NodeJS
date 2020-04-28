//! We use bcryptjs to  hash the password
//! Hash algorithms are not reversables (one way algorithm)

const bcrypt = require('bcrypt');
const myFunction = async (password1, password2) => {
    const hashedPassword = await bcrypt.hash(password1, 8);
    console.log('Hashed Pasword', hashedPassword);
    const isMatch = await bcrypt.compare(password2, hashedPassword);
    console.log(isMatch);
};

myFunction('Roger12345!', 'Roger12345!');
