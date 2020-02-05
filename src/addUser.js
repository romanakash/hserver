const { db } = require('./firebaseInit');

async function addUser(userData) {
	try {
		const userRef = db.collection('users').doc(userData.id);
		let user = await userRef.get();

		if (!user.exists) {
			let newUser = await db.collection('users').add(userData);
			return newUser;
		} else {
			let updatedUser = user.update({
				formData: userData.formData
			});
		}
	} catch (e) {
		console.log(e);
	}
}

exports.addUser = addUser;
