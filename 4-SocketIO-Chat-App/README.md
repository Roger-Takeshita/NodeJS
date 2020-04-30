<h1 id='summary'>Summary</h1>

[Go Back to Summary](#summary)

* [Links](#links)
* [Base Server](#baseserver)
  * [Installation](#installation)
  * [package.json](#packagejson)
  * [index.html](#indexhtml)
  * [index.js](#indexjs)
* [Socket.io](#socketio)
* [      ](#xxxxxxxxxx)
* [      ](#xxxxxxxxxx)
* [      ](#xxxxxxxxxx)
* [      ](#xxxxxxxxxx)
* [      ](#xxxxxxxxxx)
* [      ](#xxxxxxxxxx)

<h1 id='links'>Links</h1>

[Go Back to Summary](#summary)

* [Socket.io - Website](https://socket.io/)
* [Socket.io - npm](https://www.npmjs.com/package/socket.io)

<h1 id='baseserver'>Base Server</h1>

[Go Back to Summary](#summary)

```Bash
  .
  ├── env
  │   └── dev.env
  ├── node_modules
  ├── public
  │   └── index.html
  ├── src
  │   ├── templates
  │   │   ├── partials
  │   │   └── views
  │   └── index.js
  ├── package-lock.json
  └── package.json
```
<h2 id='installation'>Installation</h2>

[Go Back to Summary](#summary)

```Bash
  npm init
  npm i express
  npm i hbs
  npm i socket.io
```

<h2 id='packagejson'>package.json</h2>

[Go Back to Summary](#summary)

```JavaScript
  "scripts": {
    "start": "node src/index.js",
    "dev": "env-cmd -f ./env/dev.env nodemon src/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

<h2 id='indexhtml'>index.html</h2>

[Go Back to Summary](#summary)

```HTML
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=100vw, initial-scale=1.0">
      <title>Socket.io Chat</title>
  </head>
  <body>
      <h1>Index.html Socket.io Chat</h1>
  </body>
  </html>
```

<h2 id='indexjs'>index.js</h2>

[Go Back to Summary](#summary)

```JavaScript
  const express = require('express');
  const path = require('path');
  const hbs = require('hbs');
  const port = process.env.PORT;

  const app = express();

  const publicDirPath = path.join(__dirname, '../public');
  const viewsPath = path.join(__dirname, './templates/views');
  const partialsPath = path.join(__dirname, './templates/partials');

  app.set('view engine', 'hbs');
  app.set('views', viewsPath);
  hbs.registerPartials(partialsPath);
  app.use(express.static(publicDirPath));

  app.listen(port, () => {
      console.log(`Server running on port ${port}`);
  });
```

<h1 id='socketio'>Socket.io</h1>

[Go Back to Summary](#summary)

<h2 id='updateindexsocket'>Update index.js to use socket.io</h2>

[Go Back to Summary](#summary)

* in `src/index.js`:

  * import the `http` pacakge
    * `const http = require('http');`
  * then create a new server and pass our express app
    * `const server = http.createServer(app);`
  * then change the `app.listen` to `server.listen`

  ```
      server.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
  ```

  ```JavaScript
      const express = require('express');
      const path = require('path');
      const hbs = require('hbs');
      const http = require('http');
      const port = process.env.PORT;

      const app = express();
      const server = http.createServer(app);

      const publicDirPath = path.join(__dirname, '../public');
      const viewsPath = path.join(__dirname, './templates/views');
      const partialsPath = path.join(__dirname, './templates/partials');

      app.set('view engine', 'hbs');
      app.set('views', viewsPath);
      hbs.registerPartials(partialsPath);
      app.use(express.static(publicDirPath));

      server.listen(port, () => {
          console.log(`Server running on port ${port}`);
      });
  ```

  * then we load the socket.io
    * `const sockeio = require('socket.io');`
  * then we create a new instace of the socketio to configure websocket to our server
    * `const io = socketio(server);`
    * Socket.io expects to be called with raw HTTP server

<h2 id='testconnection'>Test Connection</h2>

[Go Back to Summary](#summary)

* to test if everything went all right, we can create an event listener to listen for user
* in `src/index.js` 
  * add the event listener before the `server.listen`

  ```JavaScript
      //! Listening for users to connect
      io.on('connection', () => {
          console.log('New Wesocket Connection');
      });
  ```
* in `public/index.html`
  * Load the client side of the socket.io library
    * `<script defer src="/socket.io/socket.io.js"></script>`

  ```HTML
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=100vw, initial-scale=1.0">
          <script defer src="/sorcket.io/socket.io.js"></script>
          <title>Socket.io Chat</title>
      </head>
      <body>
          <h1>Index.html Socket.io Chat</h1>
      </body>
      </html>
  ```

<h3 id='chatjs'>Chat.js</h3>

[Go Back to Summary](#summary)

* then we need to create a new file `chat.js` in our public js folder

  ```Bash
    .
    └── public
        └── js
            └── chat.js
  ```

* then we load in our `index.html` to run our script
  * `<script defer src="/js/chat.js"></script>`
* in `index.html`

  ```HTML
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=100vw, initial-scale=1.0">
        <script defer src="/socket.io/socket.io.js"></script>
        <script defer src="/js/chat.js"></script>
        <title>Socket.io Chat</title>
    </head>
    <body>
        <h1>Index.html Socket.io Chat</h1>
    </body>
    </html>
  ```

* in `public/js/chat.js`
  * Now that we loaded in the `chat.js`, now we have access to some socket.io methods
  * One of those is a function called `io`, we call `io` to connect the server

  ```JavaScript
      io();
  ```

<h3 id='countusers'>Count The Users</h3>

[Go Back to Summary](#summary)

<h4 id='sendeventserver'>Send an Event From the Server</h4>

* in `src/indexjs`
  * Create a new variable `let count = 0`
  * Then create an argument to `io.on(socket)`
  * Then we user a socket.io method `emit` to send data/event to our clients (users).
    * `socket.emit('the_name_of_the_event', data)`
    * the first argument is the name of the event
    * the secont argument is the data

  ```JavaScript
      let count = 0;
      //! Listening for users to connect
      io.on('connection', (socket) => {
          console.log('New Wesocket Connection');
          socket.emit('countUpdate', count);
      });
  ```

<h4 id='receiveeventclient'>Receive an Event From the Server</h4>

* in `public/js/chat.js`
  * We have to listen for the server event
  * first we have to hold the return valeu of `io()` into a variable. So we can send events an receive events from the client
    * `const socket = io();`

  * To receive an event from the server, we use `on` 
    * `socket.on('the_name_of_the_event', ()=>{})`
    * the first argument is the name of the event
    * the second argrument is the function that we want to run

  ```JavaScript
      socket.on('countUpdate', (count) => {
          console.log('The count has been updated', count);
      });
  ```

<h4 id='emitfromclient'>Emit Data Fom Client to the Server</h4>

* First we need to create a button and an ID so we can target
* in `public/index.html`
  * add to the `<body>`

  ```HTML
    <body>
        <h1>Index.html Socket.io Chat</h1>
        <button id="increment">+1</button>
    </body>
  ``` 
* in `public/js/chat.j`
  * Add and event listener to the button

  ```JavaScript
      document.querySelector('#increment').addEventListener('click', () => {
          console.log('Clicked');
          socket.emit('increment');
      });
  ```

* in `src/index.js`
  * add and event listen to listen the clients
  * inside the `io.on()` function, add

  ```JavaScript
    socket.on('increment', () => {
        count++;
        socket.emit('countUpdate', count);
    });
  ```
  * `socket.emit` only emits to one client
  * We need to change to `io.emit` to emit to all clients

  ```JavaScript
    io.on('connection', (socket) => {
        console.log('New Wesocket Connection');
        socket.emit('countUpdate', count);
        socket.on('increment', () => {
            count++;
            io.emit('countUpdate', count);
        });
    });
  ```
