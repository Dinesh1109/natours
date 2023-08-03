/* eslint-disable no-undef */ /* eslint-disable prettier/prettier */

const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log('UnCaught Exeption! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

// eslint-disable-next-line import/extensions
const app = require('./app.js');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    //(  { process.env.DATABASE_LOCAL    //this is to use local database inside laptop by just removing db in upper line
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection successful!');
  });

// console.log(process.env);
const port = 3000 || process.env.PORT;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err);
  console.log('Unhandled rejection! Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
