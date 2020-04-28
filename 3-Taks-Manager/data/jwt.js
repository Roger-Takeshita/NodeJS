//> JWT - JSON Web Token
//>     - npm i jsonwebtokne
//>     - we user the jwt.sing({}, secretKey, expiration) method
//>         - 1st argument is the data embedded in token '{ _id: 'abcd123' }'
//>         - 2nd argument is the secret key
//>         - 3rd argument is the expiration '{ expiresIn: '1 day' }'
//>     - token '1stpart.2ndpart.3rdpart'
//>         - 1st part - is the base64 encoded JSON string (header) - that contains the type of algorithm used to generate
//>         - 2nd part - is the payload/body - the data that we provided
//>         - 3rd part - is the signature - used to verify the token
//>     - jwt.verify()

const jwt = require('jsonwebtoken');

const myFunction = () => {
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ _id: 'abcd123' }, secretKey, { expiresIn: '1 day' });
    console.log(token);
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhYmNkMTIzIiwiaWF0IjoxNTg4MDAyOTk5LCJleHAiOjE1ODgwODkzOTl9.GRwUY-B_NeQPBK43hquyvYT7pq2_SvPKoGLzmEc4qJI
    const data = jwt.verify(token, secretKey);
    console.log(data);
    // { _id: 'abcd123', iat: 1588002999, exp: 1588089399 }
};

myFunction();
