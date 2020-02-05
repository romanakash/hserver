const firebaseAdmin = require('firebase-admin');

firebaseAdmin.initializeApp({
	credential: firebaseAdmin.credential.applicationDefault(),
	databaseURL: 'https://created-2020.firebaseio.com'
});

const db = firebaseAdmin.firestore();

exports.db = db;
