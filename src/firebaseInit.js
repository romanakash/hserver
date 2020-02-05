const firebaseAdmin = require('firebase-admin');

const serviceAccount = require('../created-2020-firebase-adminsdk-6g0i7-c6309784cc.json');

firebaseAdmin.initializeApp({
	credential: firebaseAdmin.credential.cert(serviceAccount),
	databaseURL: 'https://created-2020.firebaseio.com'
});

const db = firebaseAdmin.firestore();

exports.db = db;
