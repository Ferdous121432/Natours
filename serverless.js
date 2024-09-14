import serverless from 'serverless-http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  process.exit(1);
});

dotenv.config({ path: './config.env' });

// Atlas connection string
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

//DB connection
mongoose
  // .connect(process.env.DATABASE_local)
  .connect(DB)

  .then(() => {
    // console.log(con.connections);
    console.log('DB connection successful!');
  });

const port = process.env.PORT || 3000;

app.use('/.netlify', app);

module.exports.handler = serverless(app);
