const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const app = express();

// For heroku
app.enable('trust proxy');

// Front end view rendering
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Global Middlewares
app.use(cors());

app.options('*', cors()); // allows complex requests (patch, delete, etc., anything beyond get & post)
// app.options('/api/v1/tours/:id', cors());  // to allow for specific routes

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(helmet());

// Development logging
if(process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Limit requests from same IP
const limiter = rateLimit({
  max: 100,
  windowsMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP. Please try again in an hour.',
});

// Body parser, read data from body into req.body, cookie parser
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use(hpp({
  whitelist: [
    // TODO: when query parameters are known
  ],
}));

app.use(compression());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
// TODO: add routes

// Catch all uncaught routes
app.all('*', (req, res, next) => {
  // TODO: add app error
});

// app.use(globalErrorHandler);

module.exports = app;