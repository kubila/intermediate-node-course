/* eslint-disable no-unused-vars */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 8000;
const app = express();
const User = require('./models/User');

mongoose.connect('mongodb://localhost/userData', {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`server is listening on port:${port}`);
});

function sendResponse(res, err, data) {
  if (err) {
    res.json({ success: false, message: err });
  } else if (!data) {
    res.json({ success: false, message: 'Not found' });
  } else {
    res.json({ success: true, data: data });
  }
}

// CREATE
app.post('/users', (req, res) => {
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

app
  .route('/users/:id')
  // READ
  .get((req, res) => {
    User.findById(req.params.id, (err, data) => {
      sendResponse(res, err, data);
    });
  })
  // UPDATE
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
  // DELETE
  .delete((req, res) => {
    User.findByIdAndDelete(req.params.id, (err, data) => {
      sendResponse(res, err, data);
    });
  });
