const { db } = require('./firebaseInit');

async function getFormData(mlh_id) {
	const usersRef = db.collection('users');
	const snapshot = await usersRef
		.where('mlh_data.id', '==', mlh_id)
		.limit(1)
		.get();

	if (snapshot.empty) {
		return { submitted: false };
	} else {
		let storedForm;
		snapshot.forEach(doc => (storedForm = doc.data().form_data));
		return storedForm;
	}
}

exports.getFormData = getFormData;
