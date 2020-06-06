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
  const park = db.Park.build();
  
  res.render('park-add', { title: 'Add Park', park, csrfToken: req.csrfToken() });
});

router.post('/park/add', csrfProtection, asyncHandler( async(req, res) => {
  const { parkName, city, provinceState, country, opened, size, description } = req.body;

  const park = db.Park.build({
    parkName, city, provinceState, country, opened, size, description
  });

  try {
    await park.save();
    res.redirect('/');
  } catch(e) {
    if (e.name === 'SequelizeValidationError') {
      console.log('**************', e.errors.message)
      const err = e.errors.map(error => error.message);
      res.render('park-add', {
        title: 'Add Park',
        park,
        err,
        csrfToken: req.csrfToken()
      })
    } else next(e);
  }
}));

router.get('/park/edit/:id(\\d+)', csrfProtection, asyncHandler( async (req, res) => {
  const parkId = parseInt(req.params.id, 10);
  const park = await db.Park.findByPk(parkId);

  res.render('park-edit', {
    title: 'Edit Park',
    park,
    csrfToken: req.csrfToken()
  });
}));

router.post('/park/edit/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
  const parkId = parseInt(req.params.id, 10);
  const parkToUpdate = await db.Park.findByPk(parkId);
  const { parkName, city, provinceState, country, opened, size, description } = req.body;
  const park = {
    parkName, city, provinceState, country, opened, size, description
  };

  try {
    await parkToUpdate.update(park);
    res.redirect(`/park/${parkId}`);
  } catch (e) {
    if (e.name === 'SequelizeValidationError') {
      const err = e.errors.map(error => error.message);
      res.render('park-edit', {
        title: 'Edit Park',
        park: {...park, id: parkId },
        err,
        csrfToken: req.csrfToken()
      })
    } else next(e);
  }

}));

router.get('/park/delete/:id(\\d+)', csrfProtection, asyncHandler( async (req, res) => {
  const parkId = parseInt(req.params.id, 10);
  const parkToDelete = await db.Park.findByPk(parkId);

  res.render('park-delete', {
    title: 'Delete Park',
    parkToDelete,
    csrfToken: req.csrfToken()
  })
}));

router.post('/park/delete/:id(\\d+)', csrfProtection, asyncHandler( async (req, res) => {
  const parkId = parseInt(req.params.id, 10);
  const parkToDelete = await db.Park.findByPk(parkId);

  await parkToDelete.destroy();
  res.redirect('/parks');
}));


if (environment !== "production") {
  router.get("/error-test", () => {
    throw new Error("This is a test error.");
  });
}


module.exports = router;