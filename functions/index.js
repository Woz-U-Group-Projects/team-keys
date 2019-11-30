const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const express = require('express');
const app = express();

app.get('/shouts', (req, res) => {
    admin
    .firestore()
    .collection('shouts')
    .get()
    .then((data) => {
        let shouts = [];
        data.forEach((doc) => {
            shouts.push(doc.data());
        });
        return res.json(shouts);
    })
    .catch((err) => console.error(err));
})



app.post('/shouts', (req, res) => {
    
    const newShouts = {
        body: req.body.body,
        userHandle: req.body.userHandle,
        createdAt: admin.firestore.Timestamp.fromDate(new Date())
    };

    admin.firestore()
    .collection('shouts')
    .add(newShouts)
    .then((doc) => {
        res.json({ message: `document ${doc.id} created successfully`});
    })
    .catch((err) => {
        res.status(500).json({ error: 'something not working right'});
        console.error(err);
    })
});

exports.api = functions.https.onRequest(app);