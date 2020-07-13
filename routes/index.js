const express = require('express');
const router = express.Router();
const User = require('../models/User');

function sendResponse(res, err, data) {
  if (err) {
    res.json({ success: false, message: err });
  } else if (!data) {
    res.json({ success: false, message: 'Not found' });
  } else {
    res.json({ success: true, data: data });
  }
}

router.post('/users', (req, res) => {
  console.log(req.body);
  User.create(
    {
      ...req.body.newData,
    },
    (err, data) => {
      sendResponse(res, err, data);
    }
  );
});

router
  .route('/users/:id')

  .get((req, res) => {
    User.findById(req.params.id, (err, data) => {
      sendResponse(res, err, data);
    });
  })

  .put((req, res) => {
    User.findByIdAndUpdate(
      req.params.id,
      { ...req.body.newData },
      { new: true },
      (err, data) => {
        sendResponse(res, err, data);
      }
    );
  })

  .delete((req, res) => {
    User.findByIdAndDelete(req.params.id, (err, data) => {
      sendResponse(res, err, data);
    });
  });

module.exports = router;
