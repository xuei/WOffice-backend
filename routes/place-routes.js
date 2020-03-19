const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const place = require('../models/place-model');
const admin = require('firebase-admin');
const serviceAccount = require("../configs/fbServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://eduardo-6c247.firebaseio.com"
});




// POST route => to create a new place (with JWT authentication)
router.post('/places', (req, res, next) => {
  // console.log("running")
  if (req.headers.authorization) {
    admin.auth().verifyIdToken(req.headers.authorization)
      .then((decodedToken) => {
        // console.log('decoded token', decodedToken);
        const { title, description, country, city, address, bedrooms, sleeps, features, dates, imgUrl} = req.body;
        place.create({
          title,
          description,
          country,
          city,
          address,
          bedrooms,
          sleeps,
          features,
          dates,
          imgUrl,
          owner: decodedToken.uid
        })
          .then(response => {
            res.json(response);
          })
          .catch(err => {
            res.json(err);
          });
      }).catch(() => {
        res.status(403).json({message: 'Unauthorized'});
      });
  } else {
    res.status(403).json({message: 'Unauthorized'});
  }
});

// POST route => to create a new place
router.post('/places', (req, res, next) => {
  // console.log("runninggggg")
  // console.log("imageurl backend", req.body.imgUrl)

  const { title, description, country, city, address, bedrooms, sleeps, features, dates, imgUrl } = req.body;
  place.create({
    title,
    description,
    country,
    city,
    address,
    bedrooms,
    sleeps,
    features,
    dates,
    imgUrl,
    owner: decodedToken.uid
   
  })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
});






// GET route => to get all the places
router.get('/places', (req, res, next) => {
  place.find()
     .then(allTheplaces => {
      res.json(allTheplaces);
    })
    .catch(err => {
      res.json(err);
    });
});

router.get('/search', (req, res, next) => {
 //  api/search?keyword={o que eu escrevi na caixa de texo}
  const keyword = req.query.keyword;
  place.find({ title: keyword })
     .then(searchedPlaces => {
      res.json(searchedPlaces);
    })
    .catch(err => {
      res.json(err);
    });
});

// GET route => to get a specific place/detailed view
router.get('/places/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  // Our places have array of tasks' ids and
  // we can use .populate() method to get the whole task objects
  place.findById(req.params.id)
    
    .then(place => {
      res.status(200).json(place);
    })
    .catch(error => {
      res.json(error);
    });
});

// PUT route => to update a specific place
router.put('/places/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  place.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({ message: `place with ${req.params.id} is updated successfully.` });
    })
    .catch(error => {
      res.json(error);
    });
});

// DELETE route => to delete a specific place
router.delete('/places/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  place.findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({ message: `place with ${req.params.id} is removed successfully.` });
    })
    .catch(error => {
      res.json(error);
    });
});

module.exports = router;
