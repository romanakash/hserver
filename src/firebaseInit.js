const firebaseAdmin = require('firebase-admin');

firebaseAdmin.initializeApp({
	credential: firebaseAdmin.credential.cert({
		projectId: process.env.GCS_PROJECT_ID,
		clientEmail: process.env.GCS_CLIENT_EMAIL,
		privateKey: process.env.GCS_PRIVATE_KEY
	}),
	databaseURL: 'https://created-2020.firebaseio.com'
});

const db = firebaseAdmin.firestore();

exports.db = db;
