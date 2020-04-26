const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

require('./config/database');

app.use(express.json());

app.use('/users', require('./routes/user'));
app.use('/tasks', require('./routes/task'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
