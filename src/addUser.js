const { db } = require('./firebaseInit');

async function addUser(userData) {
	try {
		let newUser = await db.collection('users').add(userData);
		return newUser;
	} catch (e) {
		console.log(e);
	}
}

exports.addUser = addUser;
