const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');

let DB = '';
if (process.env.NODE_ENV === 'testing') {
  DB = process.env.DATABASE_TEST.replace(
      '<password>', 
      process.env.DATABASE_PASSWORD
    );
} else if (
  process.env.NODE_ENV === 'development' ||
  process.env.NODE_ENV === 'production'
) {
  DB = process.env.DATABASE.replace(
      '<password>',
      process.env.DATABASE_PASSWORD
    );
}

mongoose.set('strictQuery', false);

mongoose
.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});

// // Heroku shuts down apps every 24 hr by sending a 'SIGTERM'. The code below allows the app to shut down gracefully when receiving a SIGTERM.
// process.on('SIGTERM', () => {
//   console.log('👋 SIGTERM RECEIVED. Shutting down gracefully.');
//   server.close(() => {
//     console.log('💥 Process terminated!');
//   });
// });