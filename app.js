const express = require('express');
const morgan = require('morgan');

const routes = require('./routes');
const { environment } = require('./config')

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
  if (environment === 'development') {
    
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
  const isProduction = environment === 'production';
  res.status( err.status || 500).render('error', { 
    title: 'Server Error',
    message: isProduction ? null : err.message,
    stack: isProduction ? null : err.stack,

  })
});



module.exports = app;