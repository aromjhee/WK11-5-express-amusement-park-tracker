const express = require('express');
const csrf = require('csurf');

const { environment } = require('./config');

const db = require('./db/models');

const router = express.Router();
const csrfProtection = csrf({cookie: true});

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

router.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});

router.get('/parks', asyncHandler( async (req, res) => {
  const parks = await db.Park.findAll({order: [['parkName', 'ASC']]})

  res.render('park-list', {
    title: 'Parks',
    parks,
  });
}));

router.get('/park/:id(\\d+)', asyncHandler( async(req, res) => {
  const parkId = parseInt(req.params.id, 10);

  const park = await db.Park.findByPk(parkId);

  res.render('park-detail', { title: 'Park Detail', park });
}));

router.get('/park/add', csrfProtection, async(req, res) => {
  const newPark = db.Park.build();
  
  res.render('park-add', { title: 'Add Park', newPark, csrfToken: req.csrfToken() });
});

router.post('/park/add', csrfProtection, asyncHandler( async(req, res) => {
  const { parkName, city, provinceState, country, opened, size, description } = req.body;

  const newPark = db.Park.build({
    parkName, city, provinceState, country, opened, size, description
  });

  try {
    await newPark.save();
    res.redirect('/');
  } catch(e) {
    if (e.name === 'SequelizeValidationError') {
      console.log('**************', e.errors.message)
      const err = e.errors.map(error => error.message);
      res.render('park-add', {
        title: 'Add Park',
        newPark,
        err,
        csrfToken: req.csrfToken()
      })
    } else next(e);
  }
}));


if (environment !== "production") {
  router.get("/error-test", () => {
    throw new Error("This is a test error.");
  });
}


module.exports = router;