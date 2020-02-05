const { db } = require('./firebaseInit');

async function modifyUser(userData) {
	try {
		const usersRef = db.collection('users');
		const snapshot = await usersRef
			.where('mlh_data.id', '==', userData.mlh_data.id)
			.limit(1)
			.get();

		if (snapshot.empty) {
			const newUser = await db.collection('users').add(userData);
			return newUser;
		} else {
			// IF IT AIN'T BROKE DON'T FIX IT
			let userId;
			snapshot.forEach(doc => {
				userId = doc.id;
			});
			const userRef = usersRef.doc(userId);
			const updatedUser = await userRef.update({
				form_data: userData.form_data
			});
			return updatedUser;
		}
	} catch (e) {
		console.log(e);
	}
}

exports.modifyUser = modifyUser;
