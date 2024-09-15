const serverless = require('serverless-http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('../app');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  process.exit(1);
});

// Load env variables
dotenv.config({ path: './config.env' });

// Atlas connection string
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

// DB connection
mongoose.connect(DB).then((con) => {
  console.log(con.connections);
  console.log('DB connection successful!');
});

const bb = app.use('/', (req, res) => {
  res.send('Hello World!');
});

// Export the serverless handler
module.exports.handler = serverless(app);
