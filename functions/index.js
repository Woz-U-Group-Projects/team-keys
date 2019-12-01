const functions = require('firebase-functions');
const admin = require('firebase-admin');
// adds express and init it.
const express = require('express');
const app = express();
admin.initializeApp();

const firebaseConfig = {
    apiKey: "AIzaSyAFIGF6ufIsEIIsOOlbP-DozcT8-Qahkb0",
    authDomain: "halfent-3c9ee.firebaseapp.com",
    databaseURL: "https://halfent-3c9ee.firebaseio.com",
    projectId: "halfent-3c9ee",
    storageBucket: "halfent-3c9ee.appspot.com",
    messagingSenderId: "1071828114862",
    appId: "1:1071828114862:web:1c1ad0718b4f83e43ffc3f",
    measurementId: "G-FJZR3PES0N"
  };





const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);

app.get('/shouts', (req, res) => {
    admin
    .firestore()
    .collection('shouts')
    .orderBy('createdAt', 'desc')
    .get()
    .then((data) => {
        let shouts = [];
        data.forEach((doc) => {
            shouts.push({
                shoutId: doc.id,
                body: doc.data().body,
                userHandle: doc.data().userHandle,
                createdAt: doc.data().createdAt
            });
        });
        return res.json(shouts);
    })
    .catch((err) => console.error(err));
})



app.post('/shouts', (req, res) => {
    
    const newShouts = {
        body: req.body.body,
        userHandle: req.body.userHandle,
        createdAt: new Date().toISOString()
    };

    admin.firestore()
    .collection('shouts')
    .add(newShouts)
    .then((doc) => {
        res.json({ message: 'document ${doc.id} created successfully'});
    })
    .catch((err) => {
        res.status(500).json({ error: 'something not working right'});
        console.error(err);
    })
});

// Signup route
app.post('/signup', (req, res) => {
  const newUser = { 
    email: req.body.email,
    password: req.body.email,
    confirmPassword: req.body.email,
    handle: req.body.email,
  };

  // TODO: validate data


  firebase
  .auth()
  .createUserWithEmailAndPassword(newUser.email, newUser.password)
  .then((data) => {
      return res
      .status(201)
      .json({ message: `user ${data.user.uid} signed up successfully`});
  })
  .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code});
  });
  

});

exports.api = functions.https.onRequest(app);