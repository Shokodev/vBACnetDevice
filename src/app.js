  const express = require('express');
  const morgan = require('morgan');
  const helmet = require('helmet');
  const cors = require('cors');
  const logger = require('./serverlog/logger');
  const { bacnetDevice } = require('./bacnet')
  require('dotenv').config();

  const middlewares = require('./middlewares');
  const app = express();
  bacnetDevice.whoIs();
  app.use(morgan('dev'));
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  console.log("Start BACnet client");

  app.get('/', (req, res) => {
      logger.info("GET /")
      res.json({
          message: 'Server is running 💩'
      });
  });

  require('dotenv').config();

  app.use(middlewares.notFound);
  app.use(middlewares.errorHandler);

  module.exports = app;