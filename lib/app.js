const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

// Built in middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  require('cors')({
    origin: [
      'http://localhost:7891',
      'https://staged-thetealab.netlify.app',
      'https://the-tea-lab.netlify.app',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  })
);
// App routes
app.use('/api/v1/users', require('./controllers/users'));
app.use('/api/v1/ingredients', require('./controllers/ingredients'));
app.use('/api/v1/recipes', require('./controllers/recipes'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
