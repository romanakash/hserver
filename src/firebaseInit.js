const firebaseAdmin = require('firebase-admin');

firebaseAdmin.initializeApp({
	credential: firebaseAdmin.credential.cert({
		projectId: GCS_PROJECT_ID,
		clientEmail: GCS_CLIENT_EMAIL,
		privateKey: GCS_PRIVATE_KEY
	}),
	databaseURL: 'https://created-2020.firebaseio.com'
});

const db = firebaseAdmin.firestore();

exports.db = db;
