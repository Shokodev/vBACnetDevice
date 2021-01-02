const app = require('./app');
require('dotenv').config();
const logger = require('./serverlog/logger');
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const httpPort = process.env.HTTP_PORT || 8077
const httpsPort = process.env.HTTPS_PORT || 2443

try {
    // Certificate
    const privateKey = fs.readFileSync(path.join(__dirname, './cert/privkey.pem'), 'utf8');
    const certificate = fs.readFileSync(path.join(__dirname, './cert/cert.pem'), 'utf8');
    const ca = fs.readFileSync(path.join(__dirname, './cert/chain.pem'), 'utf8');
    const credentials = {
        key: privateKey,
        cert: certificate,
        ca: ca
    };
    const httpsServer = https.createServer(credentials, app);
    httpsServer.listen(httpsPort, () => {
        /* eslint-disable no-console */
        logger.info(`Listening: https://localhost:${httpsPort}`);
        /* eslint-enable no-console */
    });
} catch (e) {
    logger.error('can not load certificate: ' + e.message);
    logger.warn('Https was not started!');
}

const httpServer = http.createServer(app);
httpServer.listen(httpPort, () => {
    /* eslint-disable no-console */
    logger.info(`Listening: http://localhost:${httpPort}`);
    /* eslint-enable no-console */
});