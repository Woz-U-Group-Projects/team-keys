const functions = require('firebase-functions');
// adds express and init it.
const express = require('express');
const app = express();

const FBAuth = require('./util/fbAuth');

const { getAllShouts } = require('./handlers/shouts');
const { signup, login } = require('./handlers/users');


const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);


// shout Routes
app.get('/shouts', getAllShouts);
app.post('/shouts', FBAuth, postOneShout);
// user Routes
app.post('/signup', signup);
app.post('/login', login);



// Post a shout




// Signup route
// adds user info to database


exports.api = functions.https.onRequest(app);