const onFinished = require('on-finished');

const requestLogger = (req, res, next) => {
    const start = process.hrtime();
    const log = () => {
        const diff = process.hrtime(start);
        const ms = (diff[0] * 1e3) + (diff[1] * 1e-6);
        console.log(`${req.method} ${req.originalUrl} → ${res.statusCode} (${ms.toFixed(3)}ms)`);
    };
    onFinished(res, log);
    next();
};

module.exports = requestLogger;
