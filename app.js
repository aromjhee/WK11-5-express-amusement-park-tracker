const express = require('express');
const morgan = require('morgan');

const routes = require('./routes');

const app = express();

app.set('view engine', 'pug');
app.use(morgan('dev'));
app.use(routes);

app.use((req, res, next) => {
  const err = new Error('The requests page couldn\'t be found.');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    
  } else {
    console.error(err);
  }
  next(err);
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).render('page-not-found', { title: 'Page Not Found' });
  }
  next(err);
});

app.use((err, req, res, next) => {
  const isProduction = process.env.NODE_ENV === 'production';
  res.status( err.status || 500).render('error', { 
    title: 'Server Error',
    message: isProduction ? null : err.message,
    stack: isProduction ? null : err.stack,

  })
});



module.exports = app;