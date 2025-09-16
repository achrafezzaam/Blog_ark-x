const express = require('express');
const postRouter = require('./routes/post-routes');
const authRouter = require('./routes/auth-routes');
const adminRouter = require('./routes/admin-routes');
const requestLogger = require('./middleware/request-logger');
const errorHandler = require('./middleware/error-handler');
const notFoundHandler = require('./middleware/not-found');

const app = express();

// Core Middleware
app.use(express.json());
app.use(requestLogger);

// Home Route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Blog API!',
        endpoints: {
            auth: '/api/auth',
            posts: '/api/posts',
            admin: '/api/admin'
        }
    });
});

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/admin', adminRouter);

// Error Handling Middleware
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
