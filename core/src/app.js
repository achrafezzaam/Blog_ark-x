const express = require('express');
const postRouter = require('./routes/post-routes');
const requestLogger = require('./middleware/request-logger');
const errorHandler = require('./middleware/error-handler');
const notFoundHandler = require('./middleware/not-found');

const app = express();

// Core Middleware
app.use(express.json());
app.use(requestLogger);

// Home Route
app.get('/', (req, res) => {
    res.send('Welcome to the Blog API!');
});

// API Routes
app.use('/api/posts', postRouter);

// Error Handling Middleware
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
