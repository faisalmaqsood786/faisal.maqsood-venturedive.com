// require mongoose module
const mongoose = require('mongoose');

// require chalk module to give colors to console text
const chalk = require('chalk');

// require database URL
const dbURL = process.env.MONGODB_URI;

const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;

// export this function and imported by server.js
const mongooseInit = () => {
  mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
  mongoose.connection.on('connected', () => {
    // eslint-disable-next-line no-console
    console.log(connected('Mongoose default connection is open to ', dbURL));
  });

  mongoose.connection.on('error', err => {
    // eslint-disable-next-line no-console
    console.log(error(`Mongoose default connection has occured ${err} error`));
  });

  mongoose.connection.on('disconnected', () => {
    // eslint-disable-next-line no-console
    console.log(disconnected('Mongoose default connection is disconnected'));
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      // eslint-disable-next-line no-console
      console.log(
        termination('Mongoose default connection is disconnected due to application termination'),
      );
      process.exit(0);
    });
  });
};

export default mongooseInit;
